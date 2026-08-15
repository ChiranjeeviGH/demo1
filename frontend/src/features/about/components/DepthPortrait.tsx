import { useEffect, useRef, useState, type RefObject } from 'react'

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform vec2 uMouse;
uniform float uTime;
uniform float uStrength;
uniform vec2 uCanvas;
uniform vec2 uImageRes;

vec2 coverUv(vec2 uv) {
  float ca = uCanvas.x / uCanvas.y;
  float ia = uImageRes.x / uImageRes.y;
  vec2 s = vec2(1.0);
  if (ca > ia) {
    s.y = ia / ca;
  } else {
    s.x = ca / ia;
  }
  return (uv - 0.5) * s + 0.5;
}

void main() {
  vec2 uv = coverUv(vUv);
  float depth = texture2D(uDepth, uv).r;
  vec2 toMouse = uMouse - vUv;
  float dist = length(toMouse * vec2(uCanvas.x / uCanvas.y, 1.0));
  float influence = smoothstep(0.6, 0.0, dist);
  float breathe = sin(uTime * 0.55) * 0.006 * depth;
  vec2 offset = toMouse * depth * influence * uStrength;
  gl_FragColor = texture2D(uImage, uv - offset + breathe);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createTexture(gl: WebGLRenderingContext, unit: number) {
  const tex = gl.createTexture()
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  return tex
}

// Pseudo depth map: blurred luminance + soft center bias, so the face
// (brighter, central) reads as foreground and edges recede.
function buildDepthData(img: HTMLImageElement, size: number) {
  const off = document.createElement('canvas')
  off.width = size
  off.height = size
  const ctx = off.getContext('2d')
  if (!ctx) return null

  const minSide = Math.min(img.naturalWidth, img.naturalHeight)
  const sx = (img.naturalWidth - minSide) / 2
  const sy = 0
  ctx.filter = 'blur(16px)'
  ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size)

  const src = ctx.getImageData(0, 0, size, size).data
  const out = new Uint8Array(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const lum = (0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2]) / 255
      const cx = x / size - 0.5
      const cy = y / size - 0.45
      const center = 1 - Math.min(1, Math.sqrt(cx * cx + cy * cy) * 1.1)
      const d = Math.max(0, Math.min(1, lum * 0.72 + center * 0.38))
      out[i] = d * 255
      out[i + 1] = d * 255
      out[i + 2] = d * 255
      out[i + 3] = 255
    }
  }
  return { data: out, size }
}

type DepthPortraitProps = {
  src: string
  alt: string
  mouseRef: RefObject<{ x: number; y: number }>
  active: boolean
}

export function DepthPortrait({ src, alt, mouseRef, active }: DepthPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFailed(true)
      return
    }

    const gl = canvas.getContext('webgl', { antialias: true, alpha: false })
    if (!gl) {
      setFailed(true)
      return
    }

    let raf = 0
    let disposed = false
    let program: WebGLProgram | null = null

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT)
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vert || !frag) {
      setFailed(true)
      return
    }

    program = gl.createProgram()
    if (!program) {
      setFailed(true)
      return
    }
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true)
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uMouse = gl.getUniformLocation(program, 'uMouse')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uStrength = gl.getUniformLocation(program, 'uStrength')
    const uCanvas = gl.getUniformLocation(program, 'uCanvas')
    const uImageRes = gl.getUniformLocation(program, 'uImageRes')
    gl.uniform1i(gl.getUniformLocation(program, 'uImage'), 0)
    gl.uniform1i(gl.getUniformLocation(program, 'uDepth'), 1)

    const image = new Image()
    image.src = src

    const start = performance.now()
    let smoothX = 0.5
    let smoothY = 0.5

    const render = () => {
      if (disposed) return

      const parent = canvas.parentElement
      const w = parent ? parent.clientWidth : canvas.clientWidth
      const h = parent ? parent.clientHeight : canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const pxW = Math.max(1, Math.round(w * dpr))
      const pxH = Math.max(1, Math.round(h * dpr))
      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW
        canvas.height = pxH
        gl.viewport(0, 0, pxW, pxH)
        gl.uniform2f(uCanvas, pxW, pxH)
      }

      const target = mouseRef.current ?? { x: 0.5, y: 0.5 }
      smoothX += (target.x - smoothX) * 0.055
      smoothY += (target.y - smoothY) * 0.055

      gl.uniform2f(uMouse, smoothX, smoothY)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform1f(uStrength, active ? 0.11 : 0.05)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    image.onload = () => {
      if (disposed || !gl) return

      createTexture(gl, 0)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

      const depth = buildDepthData(image, 256)
      createTexture(gl, 1)
      if (depth) {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          depth.size,
          depth.size,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          depth.data,
        )
      } else {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          1,
          1,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          new Uint8Array([128, 128, 128, 255]),
        )
      }

      gl.uniform2f(uImageRes, image.naturalWidth, image.naturalHeight)
      render()
    }
    image.onerror = () => setFailed(true)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
    }
  }, [src, active, mouseRef])

  if (failed) {
    return <img className="about-intro__portrait" src={src} alt={alt} />
  }

  return (
    <canvas
      ref={canvasRef}
      className="about-intro__portrait about-intro__portrait--gl"
      role="img"
      aria-label={alt}
      data-testid="about-portrait-canvas"
    />
  )
}

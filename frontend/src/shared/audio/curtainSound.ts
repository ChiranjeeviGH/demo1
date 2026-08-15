const STORAGE_KEY = 'daali-sound'

let audioCtx: AudioContext | null = null

export function isSoundEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  } catch {
    /* ignore */
  }
}

// Synthesized curtain sound: low theatre rumble + filtered-noise fabric whoosh
export function playCurtainSound() {
  if (!isSoundEnabled()) return

  try {
    audioCtx ??= new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const ctx = audioCtx
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const t = ctx.currentTime + 0.02

    // Low rumble — stage machinery
    const rumble = ctx.createOscillator()
    rumble.type = 'sine'
    rumble.frequency.setValueAtTime(52, t)
    rumble.frequency.exponentialRampToValueAtTime(34, t + 1.3)
    const rumbleGain = ctx.createGain()
    rumbleGain.gain.setValueAtTime(0, t)
    rumbleGain.gain.linearRampToValueAtTime(0.22, t + 0.18)
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, t + 1.45)
    rumble.connect(rumbleGain).connect(ctx.destination)
    rumble.start(t)
    rumble.stop(t + 1.5)

    // Fabric whoosh — swept band-passed noise
    const duration = 1.35
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < channel.length; i++) {
      channel[i] = (Math.random() * 2 - 1) * (1 - i / channel.length)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.Q.value = 0.9
    bandpass.frequency.setValueAtTime(220, t)
    bandpass.frequency.exponentialRampToValueAtTime(1500, t + 0.5)
    bandpass.frequency.exponentialRampToValueAtTime(280, t + 1.3)
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0, t)
    noiseGain.gain.linearRampToValueAtTime(0.15, t + 0.22)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 1.35)
    noise.connect(bandpass).connect(noiseGain).connect(ctx.destination)
    noise.start(t)
  } catch {
    /* audio unavailable — stay silent */
  }
}

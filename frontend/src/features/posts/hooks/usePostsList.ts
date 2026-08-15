import { useEffect, useState } from 'react'

import { fetchPosts } from '@/features/posts/api/posts.api'
import type { Post } from '@/features/posts/types/posts.types'
import type { ApiError } from '@/shared/api/types'

type PostsState = {
  posts: Post[]
  isLoading: boolean
  error: string | null
}

export function usePostsList() {
  const [state, setState] = useState<PostsState>({
    posts: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    void (async () => {
      try {
        const posts = await fetchPosts(controller.signal)
        setState({ posts, isLoading: false, error: null })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        const message = (error as ApiError).message ?? 'Failed to load posts'
        setState({ posts: [], isLoading: false, error: message })
      }
    })()

    return () => {
      controller.abort()
    }
  }, [])

  return state
}

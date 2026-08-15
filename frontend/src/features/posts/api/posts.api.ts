import { apiClient } from '@/shared/api/client'
import type { Post } from '@/features/posts/types/posts.types'

export async function fetchPosts(signal?: AbortSignal) {
  const { data } = await apiClient.get<Post[]>('/posts', {
    signal,
    params: { _limit: 8 },
  })
  return data
}

export async function fetchPostById(id: number, signal?: AbortSignal) {
  const { data } = await apiClient.get<Post>(`/posts/${id}`, { signal })
  return data
}

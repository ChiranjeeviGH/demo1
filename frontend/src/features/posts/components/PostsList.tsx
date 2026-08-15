import type { Post } from '@/features/posts/types/posts.types'
import { PostCard } from '@/features/posts/components/PostCard'

type PostsListProps = {
  posts: Post[]
  isLoading: boolean
  error: string | null
}

export function PostsList({ posts, isLoading, error }: PostsListProps) {
  if (isLoading) {
    return <p>Loading posts…</p>
  }

  if (error) {
    return <p className="state-error">{error}</p>
  }

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

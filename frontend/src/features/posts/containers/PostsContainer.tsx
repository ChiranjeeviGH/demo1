import { PostsList } from '@/features/posts/components/PostsList'
import { usePostsList } from '@/features/posts/hooks/usePostsList'

export function PostsContainer() {
  const { posts, isLoading, error } = usePostsList()

  return (
    <section className="posts-section">
      <header className="posts-section__header">
        <h1>Posts</h1>
        <p>Fetched from JSONPlaceholder via Axios.</p>
      </header>
      <PostsList posts={posts} isLoading={isLoading} error={error} />
    </section>
  )
}

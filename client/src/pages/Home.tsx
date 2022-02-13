import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useGetPostsQuery } from '../generated/graphql';
import PostCard from '../components/PostCard';

function Home() {
  const { data, loading, error } = useGetPostsQuery();

  const renderPosts = () => {
    if (loading) {
      return <h1>Loading posts...</h1>;
    } else if (data?.getPosts) {
      return data.getPosts.map((post) => (
        <Grid.Column key={post?.id} style={{ marginBottom: '1rem' }}>
          <PostCard post={post} />
        </Grid.Column>
      ));
    }
  };
  if (error) {
    return <h1>There was an error, try again</h1>;
  }
  if (data) {
    return (
      <Grid columns={3}>
        <Grid.Row className='page-title' centered>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>{renderPosts()}</Grid.Row>
      </Grid>
    );
  }
  return null;
}

export default Home;

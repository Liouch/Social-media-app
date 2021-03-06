import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { GetPostsQuery } from '../generated/graphql';

type Props = {
  post: NonNullable<GetPostsQuery['getPosts']>[number];
};

const PostCard = ({ post }: Props) => {
  if (!post) {
    return null;
  }
  const { body, createdAt, id, username, likeCount, commentCount } = post;

  const likePost = () => {
    console.log('Post liked!!');
  };

  const commentPost = () => {
    console.log('comment post');
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='teal' basic>
            <Icon name='heart' />
          </Button>
          <Label as='a' basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right' onClick={commentPost}>
          <Button color='teal' basic>
            <Icon name='comment' />
          </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;

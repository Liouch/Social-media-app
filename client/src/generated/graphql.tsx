import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Post;
  createPost: Post;
  deleteComment: Post;
  deletePost?: Maybe<Post>;
  likePost: Post;
  login: User;
  register: User;
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
  postId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput?: InputMaybe<RegisterInput>;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  commentCount: Scalars['Int'];
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  likeCount: Scalars['Int'];
  likes: Array<Maybe<Like>>;
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPost?: Maybe<Post>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
};


export type QueryGetPostArgs = {
  postId: Scalars['ID'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  token: Scalars['String'];
  username: Scalars['String'];
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: Array<{ __typename?: 'Post', id: string, body: string, createdAt: string, username: string, likeCount: number, commentCount: number, likes: Array<{ __typename?: 'Like', username: string } | null>, comments: Array<{ __typename?: 'Comment', id: string, username: string, createdAt: string, body: string } | null> } | null> | null };


export const GetPostsDocument = gql`
    query getPosts {
  getPosts {
    id
    body
    createdAt
    username
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
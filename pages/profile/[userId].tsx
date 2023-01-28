import { Container, Post } from "@/components";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      bio
      user {
        id
        name
        posts(skip: 0, take: 5) {
          id
          title
          content
          createdAt
          user {
            id
            name
            email
          }
        }
      }
    }
  }
`;

function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: userId,
    },
  });

  if (error) {
    return (
      <>
        <div>Error Page</div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div>Loading</div>
      </>
    );
  }

  return (
    <Container>
      <div className="mt-4">
        <h2 className="mb-4 text-2xl font-normal">Profile Page</h2>
        <h3 className="mb-4">{data.profile.user.name}</h3>
        <p className="mb-4">{data.profile.bio}</p>

        <div>
          {data?.profile?.user?.posts.map((post: any) => {
            return (
              <div key={post.id}>
                <Post post={post} />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default ProfilePage;

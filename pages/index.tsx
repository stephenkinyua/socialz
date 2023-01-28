import { gql, useQuery } from "@apollo/client";
import { Container, Post } from "@/components";
import { useState } from "react";

const GET_POSTS = gql`
  query {
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
`;

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const { data, error, loading } = useQuery(GET_POSTS);

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
    <>
      <main>
        <Container>
          <div className="mt-4">
            {data?.posts.map((post: any) => {
              return (
                <div key={post.id}>
                  <Post post={post} />
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center my-4">
            <button
              className="bg-rose-500 rounded-md hover:shadow-sm hover:bg-opacity-80 active:bg-opacity-90 text-white px-4 py-2"
              onClick={() => {
                setSkip(5);
                setTake(take + 5);

                console.log(skip);
                console.log(take);
              }}
            >
              Load More
            </button>
          </div>
        </Container>
      </main>
    </>
  );
}

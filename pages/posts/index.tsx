import { Container } from "@/components";
import { PostForm } from "@/components/forms";
import React from "react";

function PostCreatePage() {
  return (
    <Container>
      <div className="mt-4">
        <PostForm />
      </div>
    </Container>
  );
}

export default PostCreatePage;

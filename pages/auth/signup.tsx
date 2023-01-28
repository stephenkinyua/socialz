import { Container } from "@/components";
import { SignUpForm } from "@/components/forms";
import React from "react";

function SignUpPage() {
  return (
    <Container>
      <div className="mt-4">
        <SignUpForm />
      </div>
    </Container>
  );
}

export default SignUpPage;

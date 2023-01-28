import { Container } from "@/components";
import { SignInForm } from "@/components/forms";
import React from "react";

function SignInPage() {
  return (
    <Container>
      <div className="mt-4">
        <SignInForm />
      </div>
    </Container>
  );
}

export default SignInPage;

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import { linkBtnStyles } from "./styles";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query {
    me {
      id
      name
      email
      createdAt
    }
  }
`;

export function Navbar() {
  const router = useRouter();
  const { data, loading, error } = useQuery(ME_QUERY);

  return (
    <header className="bg-white border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-16 w-full">
          <div>
            <Link
              className="font-semibold text-xl h-10 px-4 py-2 bg-rose-500 hover:bg-opacity-80 active:bg-opacity-90 rounded-md text-white"
              href="/"
            >
              Socialz!
            </Link>
          </div>

          <div className="flex items-center justify-between gap-3">
            {data?.me ? (
              <>
                <Link href="/posts" className={linkBtnStyles}>
                  Create Post
                </Link>

                <Link
                  href={`/profile/${data?.me?.id}`}
                  className={linkBtnStyles}
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    try {
                      localStorage.clear();
                      router.replace("/");
                    } catch (e) {
                      router.replace("/");
                    }
                  }}
                  className={linkBtnStyles}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className={linkBtnStyles}>
                  Sign In
                </Link>
                <Link href="/auth/signup" className={linkBtnStyles}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

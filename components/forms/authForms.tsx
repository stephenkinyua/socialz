import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { bStyles, iStyles } from "../styles";
import { gql, useMutation, useQuery } from "@apollo/client";

// Me Query
const ME_QUERY = gql`
  query {
    me {
      name
      email
      createdAt
    }
  }
`;

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Email is a required field."),
  password: yup
    .string()
    .min(1, "Password should be a minimum of 1 character.")
    .required(),
});

type SignInFormFields = {
  email: string;
  password: string;
};

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(credentials: { email: $email, password: $password }) {
      token
      userErrors {
        message
      }
      user {
        id
        name
        email
      }
    }
  }
`;

export function SignInForm() {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const [signin, { data, loading, error }] = useMutation(SIGN_IN);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    setFormLoading(true);
    signin({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    });

    if (!loading && data?.signin?.token) {
      localStorage.setItem("token", data?.signin?.token);
      localStorage.setItem("user", JSON.stringify(data?.signin?.user));
      router.replace("/");
    }
  });

  return (
    <div className="w-full mx-auto md:w-[65%] py-2 rounded-md mb-4">
      <div>
        <div className="mb-4">
          <h3 className="text-3xl font-light">Sign In</h3>
        </div>
        <div>
          <form
            noValidate
            className={`w-full`}
            onSubmit={onSubmit}
            autoComplete="off"
          >
            <input
              {...register("email")}
              className={iStyles}
              type="email"
              name="email"
              placeholder="youremail@example.com"
            />

            {errors["email"]?.message && (
              <span className="text-rose-500 text-sm">
                {errors["email"]?.message}
              </span>
            )}

            <input
              {...register("password")}
              className={iStyles}
              type="password"
              name="password"
            />
            {errors["password"]?.message && (
              <span className="text-rose-500 text-sm">
                {errors["password"]?.message}
              </span>
            )}
            <button type="submit" className={bStyles}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field.")
    .min(2, "Name should be a minimum of 6 characters."),
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Email is a required field."),
  password: yup
    .string()
    .required("Password is a required field.")
    .min(6, "Password should be a minimum of 6 characters."),
  bio: yup
    .string()
    .required("Bio is a required field.")
    .min(3, "Bio should be a minimum of 3 characters."),
});

type SignUpFormFields = {
  name: string;
  email: string;
  password: string;
  bio: string;
};

const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $password: String!
    $bio: String!
  ) {
    signup(
      credentials: { password: $password, email: $email }
      name: $name
      bio: $bio
    ) {
      token
      userErrors {
        message
      }
      user {
        id
        name
        email
      }
    }
  }
`;

export function SignUpForm() {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    setFormLoading(true);
    console.log(formData);

    signup({
      variables: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        bio: formData.bio,
      },
    });

    if (!loading && data?.signup?.token) {
      localStorage.setItem("token", data?.signup?.token);
      localStorage.setItem("user", JSON.stringify(data?.signup?.user));
      router.replace("/");
    }
  });

  return (
    <div className="w-full mx-auto md:w-[65%] py-2 rounded-md mb-4">
      <div>
        <div className="mb-4 ">
          <h3 className="text-3xl font-light">Sign Up</h3>
        </div>
        <div>
          <form
            noValidate
            className={`w-full items-center justify-items-center gap-2`}
            onSubmit={onSubmit}
            autoComplete="off"
          >
            <div>
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                className={iStyles}
                type="text"
                name="name"
                placeholder="Your Name"
              />
              {errors["name"]?.message && (
                <span className="text-rose-500 text-sm">
                  {errors["name"]?.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="name">Email</label>

              <input
                {...register("email")}
                className={iStyles}
                type="email"
                name="email"
                placeholder="youremail@example.com"
              />
              {errors["email"]?.message && (
                <span className="text-rose-500 text-sm">
                  {errors["email"]?.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="name">Password</label>
              <input
                {...register("password")}
                className={iStyles}
                type="password"
                name="password"
              />
              {errors["password"]?.message && (
                <span className="text-rose-500 text-sm">
                  {errors["password"]?.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="name">Bio</label>
              <textarea
                {...register("bio")}
                className={iStyles}
                name="bio"
                rows={10}
                cols={20}
                placeholder="Your bio here..."
              ></textarea>
              {errors["bio"]?.message && (
                <span className="text-rose-500 text-sm">
                  {errors["bio"]?.message}
                </span>
              )}
            </div>

            <button type="submit" className={bStyles}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

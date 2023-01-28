import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { bStyles, iStyles } from "../styles";
import { gql, useMutation } from "@apollo/client";

const postSchema = yup.object().shape({
  title: yup.string().required("Title is a required field."),
  content: yup.string().required("Content is a required field."),
  publish: yup.boolean().required("Publish is a required field."),
});

type PostFormFields = {
  title: string;
  content: string;
  publish: boolean;
};

const CREATE_NEW_POST = gql`
  mutation CreateNewPost(
    $title: String!
    $content: String!
    $publish: Boolean!
  ) {
    postCreate(post: { title: $title, content: $content, publish: $publish }) {
      post {
        id
        user {
          id
        }
      }
      userErrors {
        message
      }
    }
  }
`;

export function PostForm() {
  const router = useRouter();
  const [postCreate, { data, loading }] = useMutation(CREATE_NEW_POST);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormFields>({
    resolver: yupResolver(postSchema),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = handleSubmit((formData) => {
    postCreate({
      variables: {
        title: formData.title,
        content: formData.content,
        publish: formData.publish,
      },
    });

    if (!loading && data?.postCreate?.post?.user?.id) {
      router.push(`/profile/${data?.postCreate?.post?.user?.id}`);
    }
  });

  return (
    <div className="py-2 rounded-md mb-4">
      <div>
        <div className="mb-4">
          <h3 className="text-3xl font-light">Post</h3>
        </div>
        <div>
          <form
            className={`w-full grid items-center justify-items-center gap-2`}
            onSubmit={onSubmit}
            autoComplete="off"
            noValidate
          >
            <div className="w-full">
              <label htmlFor="title">Title</label>
              <input
                {...register("title")}
                className={iStyles}
                type="text"
                name="title"
              />

              {errors["title"]?.message && (
                <span className="text-rose-500 text-sm">
                  {errors["title"]?.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="content">Content</label>
              <textarea
                {...register("content")}
                className={iStyles}
                name="content"
                rows={10}
                cols={20}
              ></textarea>

              {errors["content"]?.message && (
                <span className="text-rose-500 text-sm">
                  {errors["content"]?.message}
                </span>
              )}
            </div>

            <div className="w-full flex items-center gap-2">
              <input
                {...register("publish")}
                className="h-5 w-5"
                type="checkbox"
                name="publish"
              />
              <label htmlFor="publish">Publish Post</label>
            </div>

            <button type="submit" className={bStyles}>
              {loading ? "Loading..." : "Save Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

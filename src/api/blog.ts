import instance from "./instance.ts";
import { IBlog } from "@/interfaces/common.interfaces.ts";

const getBlogs = async () => {
  try {
    const response = await instance.get("/blogs");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const getOneBlog = async (id: string | undefined) => {
  try {
    const response = await instance.get(`/blogs/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const createBlog = async (payload: IBlog) => {
  try {
    const response = await instance.post("/blogs/create", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const updateBlog = async (id: string, payload: IBlog) => {
  try {
    const response = await instance.put(`/blogs/update/${id}`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const deleteBlog = async (id: string) => {
  try {
    const response = await instance.delete(`/blogs/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const commentBlog = async (
  id: string | undefined,
  payload: { content: string; user: string }
) => {
  try {
    const response = await instance.post(`/blogs/comment/${id}`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export {
  getBlogs,
  getOneBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  commentBlog,
};

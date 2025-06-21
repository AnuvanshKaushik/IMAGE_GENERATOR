import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-image-generator-2-by4w.onrender.com/",
});

export const GetPosts = async () => await API.get("post/");
export const CreatePost = async (data) => await API.post("post/", data);
export const GenerateAllImage = async (data) =>
  await API.post("generateImage/", data);

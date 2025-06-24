import axios from "axios";

const API = axios.create({
  baseURL: "https://image-generator-5-4yza.onrender.com/api/",
});

export const GetPosts = async () => await API.get("post/");
export const CreatePost = async (data) => await API.post("post/", data);
export const GenerateAllImage = async (data) =>
  await API.post("generateImage/", data);

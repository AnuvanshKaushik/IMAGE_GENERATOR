import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { GenerateAllImage, CreatePost } from "../apis"; // ✅ Fix: Add CreatePost import

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  margin-top: 10px;
`;

const GenerateImageForm = ({
    post,
    setPost,
    createPostLoading,
    setGenerateImageLoading,
    generateImageLoading,
    setCreatePostLoading,
}) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const generateImageFun = async () => {
        try {
            setError("");
            setGenerateImageLoading(true);

            const res = await GenerateAllImage({ prompt: post.prompt });

            console.log("Image URL from API:", res?.data?.photoUrl);
            const imageUrl = res?.data?.photoUrl;

            if (!imageUrl || typeof imageUrl !== "string") {
                throw new Error("No valid image URL received");
            }

            setPost({
                ...post,
                photo: imageUrl,
            });
        } catch (error) {
            console.error("Error generating image:", error);
            setError(
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setGenerateImageLoading(false);
        }
    };

    const CreateImageFun = async () => {
        try {
            setCreatePostLoading(true);
            console.log("Posting data:", post);
            const response = await CreatePost(post);
            console.log("Post response:", response);
            setCreatePostLoading(false);
            navigate("/");
        } catch (error) {
            console.error("CreatePost error:", error);
            setError(error?.response?.data?.message || "Failed to post image");
            setCreatePostLoading(false);
        }
    };


    return (
        <Form>
            <Top>
                <Title>Generate Image</Title>
                <Desc>Write a prompt according to image you want</Desc>
            </Top>
            <Body>
                <TextInput
                    label="Author"
                    placeholder="Enter your name.."
                    name="name"
                    value={post.name}
                    handelChange={(e) => setPost({ ...post, name: e.target.value })}
                />
                <TextInput
                    label="Image Prompt"
                    placeholder="Write a detailed prompt about the image . . . "
                    name="prompt"
                    rows="8"
                    textArea
                    value={post.prompt}
                    handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
                />
                <div>** You can Post AI Generated Image to the Community **</div>
                {post.photo && <ImagePreview src={post.photo} alt="Generated preview" />}
                {error && <div style={{ color: "red" }}>{error}</div>}
            </Body>
            <Actions>
                <Button
                    text="Generate Image"
                    $flex
                    leftIcon={<AutoAwesome />}
                    $isLoading={generateImageLoading}
                    $isDisabled={post.prompt === ""}
                    onClick={generateImageFun}
                />
                <Button
                    text="Post Image"
                    type="secondary"
                    $flex
                    leftIcon={<CreateRounded />}
                    $isLoading={createPostLoading}
                    $isDisabled={
                        post.name === "" || post.prompt === "" || post.photo === ""
                    }
                    onClick={CreateImageFun}
                />
            </Actions>
        </Form>
    );
};

export default GenerateImageForm;

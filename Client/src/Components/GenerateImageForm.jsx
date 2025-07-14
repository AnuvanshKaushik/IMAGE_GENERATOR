import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { GenerateAllImage, CreatePost } from "../apis";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Form = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: flex-start;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05);
  animation: ${fadeInUp} 0.8s ease forwards;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(59, 130, 246, 0.6), 
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    gap: 24px;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${slideIn} 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-top: 8px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${slideIn} 0.6s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(59, 130, 246, 0.9);
  background: rgba(59, 130, 246, 0.1);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '✨';
    margin-right: 8px;
    font-size: 16px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.1), 
      transparent
    );
    animation: ${shimmer} 4s infinite;
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const ImagePreviewLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '🎨';
    font-size: 18px;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 1px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 1px 8px rgba(0, 0, 0, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${pulse} 2s infinite;
  
  &::before {
    content: '⚠️';
    font-size: 16px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  animation: ${slideIn} 0.6s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transition: left 0.6s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
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
                <Desc>Write a detailed prompt to create stunning AI-generated artwork</Desc>
            </Top>
            
            <Body>
                <InputSection>
                    <TextInput
                        label="Author"
                        placeholder="Enter your name..."
                        name="name"
                        value={post.name}
                        handelChange={(e) => setPost({ ...post, name: e.target.value })}
                    />
                    <TextInput
                        label="Image Prompt"
                        placeholder="Describe your vision in detail... The more specific, the better the result!"
                        name="prompt"
                        rows="8"
                        textArea
                        value={post.prompt}
                        handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
                    />
                </InputSection>
                
                <InfoText>
                    Share your AI-generated masterpiece with the community
                </InfoText>
                
                {post.photo && (
                    <ImagePreviewContainer>
                        <ImagePreviewLabel>Generated Image Preview</ImagePreviewLabel>
                        <ImagePreview src={post.photo} alt="Generated preview" />
                    </ImagePreviewContainer>
                )}
                
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Body>
            
            <Actions>
                <StyledButton
                    text="Generate Image"
                    $flex
                    leftIcon={<AutoAwesome />}
                    $isLoading={generateImageLoading}
                    $isDisabled={post.prompt === ""}
                    onClick={generateImageFun}
                />
                <StyledButton
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
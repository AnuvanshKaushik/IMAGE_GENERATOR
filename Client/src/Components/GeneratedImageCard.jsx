import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  flex: 1;
  min-height: 400px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border: 2px dashed transparent;
  background-image: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)),
    linear-gradient(45deg, 
      rgba(59, 130, 246, 0.6) 0%,
      rgba(147, 51, 234, 0.6) 25%,
      rgba(236, 72, 153, 0.6) 50%,
      rgba(251, 191, 36, 0.6) 75%,
      rgba(59, 130, 246, 0.6) 100%
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 24px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease forwards;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(59, 130, 246, 0.8), 
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid rgba(59, 130, 246, 0.8);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 2px solid transparent;
    border-top: 2px solid rgba(147, 51, 234, 0.6);
    border-radius: 50%;
    animation: ${spin} 1.5s linear infinite reverse;
  }
`;

const LoadingText = styled.div`
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(45deg, 
    #3b82f6, 
    #9333ea, 
    #ec4899, 
    #fbbf24
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 3s ease infinite;
  
  &::after {
    content: '';
    animation: ${pulse} 1.5s infinite;
  }
`;

const LoadingSubtext = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  animation: ${float} 2s ease-in-out infinite;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 1px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 2px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.6s ease forwards;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 1px 8px rgba(0, 0, 0, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  animation: ${float} 3s ease-in-out infinite;
`;

const PlaceholderIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.2) 0%, 
    rgba(147, 51, 234, 0.2) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 8px;
  position: relative;
  
  &::before {
    content: '✨';
    animation: ${pulse} 2s infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, 
      rgba(59, 130, 246, 0.4), 
      rgba(147, 51, 234, 0.4), 
      rgba(236, 72, 153, 0.4), 
      rgba(251, 191, 36, 0.4)
    );
    background-size: 300% 300%;
    animation: ${gradientShift} 4s ease infinite;
    z-index: -1;
  }
`;

const PlaceholderText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
`;

const PlaceholderSubtext = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  max-width: 300px;
`;

const GeneratedImageCard = ({ src, loading }) => {
    return (
        <Container>
            {loading ? (
                <LoadingContainer>
                    <LoadingSpinner />
                    <LoadingText>Generating Your Image</LoadingText>
                    <LoadingSubtext>Creating something amazing...</LoadingSubtext>
                </LoadingContainer>
            ) : (
                <>
                    {src ? (
                        <Image src={src} alt="Generated AI artwork" />
                    ) : (
                        <PlaceholderContainer>
                            <PlaceholderIcon />
                            <PlaceholderText>Ready to Create</PlaceholderText>
                            <PlaceholderSubtext>
                                Write a detailed prompt to generate your unique AI artwork
                            </PlaceholderSubtext>
                        </PlaceholderContainer>
                    )}
                </>
            )}
        </Container>
    );
};

export default GeneratedImageCard;
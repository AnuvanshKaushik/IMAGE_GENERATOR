import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { AddRounded, ExploreRounded } from "@mui/icons-material";
import Button from "./button";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
  50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(147, 51, 234, 0.6); }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Container = styled.div`
  flex: 0 1 auto;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.98) 0%, 
    rgba(30, 41, 59, 0.95) 25%,
    rgba(51, 65, 85, 0.98) 50%,
    rgba(30, 41, 59, 0.95) 75%,
    rgba(15, 23, 42, 0.98) 100%
  );
  backdrop-filter: blur(25px);
  color: white;
  font-weight: bold;
  font-size: 22px;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.1) inset,
    0 0 0 1px rgba(59, 130, 246, 0.2);
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(90deg, 
    rgba(59, 130, 246, 0.8) 0%,
    rgba(147, 51, 234, 0.8) 25%,
    rgba(236, 72, 153, 0.8) 50%,
    rgba(251, 191, 36, 0.8) 75%,
    rgba(59, 130, 246, 0.8) 100%
  ) 1;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: ${slideDown} 0.8s ease forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(59, 130, 246, 0.9), 
      rgba(147, 51, 234, 0.9),
      rgba(236, 72, 153, 0.9),
      transparent
    );
    animation: ${shimmer} 4s infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(59, 130, 246, 0.8) 0%,
      rgba(147, 51, 234, 0.8) 25%,
      rgba(236, 72, 153, 0.8) 50%,
      rgba(251, 191, 36, 0.8) 75%,
      rgba(59, 130, 246, 0.8) 100%
    );
    background-size: 300% 100%;
    animation: ${gradientShift} 5s ease infinite;
  }

  &:hover {
    box-shadow: 
      0 15px 50px rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(255, 255, 255, 0.15) inset,
      0 0 0 1px rgba(59, 130, 246, 0.4);
    transform: translateY(-2px);
    background: linear-gradient(135deg, 
      rgba(15, 23, 42, 1) 0%, 
      rgba(30, 41, 59, 0.98) 25%,
      rgba(51, 65, 85, 1) 50%,
      rgba(30, 41, 59, 0.98) 75%,
      rgba(15, 23, 42, 1) 100%
    );
  }

  @media only screen and (max-width: 600px) {
    padding: 18px 28px;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
`;

const NavbarTitle = styled.div`
  font-size: 36px;
  font-weight: 900;
  background: linear-gradient(135deg, 
    #3b82f6 0%, 
    #8b5cf6 15%, 
    #ec4899 30%, 
    #f59e0b 45%, 
    #10b981 60%,
    #3b82f6 75%,
    #8b5cf6 90%,
    #ec4899 100%
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 6s ease infinite;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  letter-spacing: -1px;
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  animation: ${float} 4s ease-in-out infinite;
  
  &::before {
    content: '✨';
    position: absolute;
    top: -8px;
    right: -15px;
    font-size: 18px;
    animation: ${sparkle} 3s ease infinite;
    animation-delay: 0.5s;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      #3b82f6, 
      #8b5cf6, 
      #ec4899, 
      #f59e0b
    );
    border-radius: 2px;
    transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
  }

  &:hover {
    transform: scale(1.08) translateY(-2px);
    animation: ${glow} 2s ease infinite, ${pulse} 1s ease infinite;
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6));
    
    &::after {
      width: 100%;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
    }
    
    &::before {
      animation: ${sparkle} 1s ease infinite;
    }
  }

  &:active {
    transform: scale(1.02) translateY(0);
  }

  @media only screen and (max-width: 600px) {
    font-size: 32px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media only screen and (max-width: 600px) {
    width: 100%;
    justify-content: flex-start;
    gap: 16px;
  }
`;

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 12px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent
    );
    transition: left 0.8s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, 
      rgba(59, 130, 246, 0.3) 0%, 
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 
      0 12px 30px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(59, 130, 246, 0.4),
      0 0 20px rgba(59, 130, 246, 0.2);
    
    &::before {
      left: 100%;
    }
    
    &::after {
      width: 200px;
      height: 200px;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, 
      rgba(59, 130, 246, 0.2) 0%, 
      transparent 70%
    );
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.4s ease;
  }
  
  ${StyledButton}:hover & {
    transform: scale(1.2) rotate(10deg);
    
    &::before {
      transform: scale(1.5);
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Container>
      <NavbarTitle onClick={() => navigate("/")}>
        ImageX
      </NavbarTitle>
      <ButtonContainer>
        {path[1] === "post" ? (
          <StyledButton
            onClick={() => navigate("/")}
            text="Explore Posts"
            leftIcon={
              <IconWrapper>
                <ExploreRounded style={{ fontSize: "22px" }} />
              </IconWrapper>
            }
            type="secondary"
          />
        ) : (
          <StyledButton
            onClick={() => navigate("/post")}
            text="Create New Post"
            leftIcon={
              <IconWrapper>
                <AddRounded style={{ fontSize: "22px" }} />
              </IconWrapper>
            }
          />
        )}
      </ButtonContainer>
    </Container>
  );
};

export default Navbar;
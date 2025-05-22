import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DownloadRounded } from "@mui/icons-material";
import { keyframes } from 'styled-components';
import { darkTheme } from '../Utils/Theme';
import { Download } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 120%;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: ${fadeIn} 0.6s ease forwards;
  background: ${({ theme }) => theme.card_bg};
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-5px) scale(0.98);
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.9) 0%, 
    rgba(0, 0, 0, 0.6) 30%,
    rgba(0, 0, 0, 0) 60%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-bottom: 12px;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
  transition-delay: 0.1s;
  
  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Author = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 18px;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
  transition-delay: 0.2s;
  
  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 10px 16px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
  transition-delay: 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0.98);
  }
  
  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ImageCard = ({item}) => {

  
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Card>
          <ImageWrapper>
            <Image src={item?.photo} alt="AI Generated artwork" />
          </ImageWrapper>
          <HoverOverlay>
            <Prompt>{item?.prompt}</Prompt>
            <Author>{item?.author}</Author>
            <DownloadButton href={item?.photo} download="image.jpg">
              <Download size={16} />
              Download
            </DownloadButton>
          </HoverOverlay>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default ImageCard;

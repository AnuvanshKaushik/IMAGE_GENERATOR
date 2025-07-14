import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Download, Heart } from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 125%;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: ${fadeIn} 0.8s ease forwards;
  background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(-8px) scale(1.01);
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(90deg, #f0f0f0 0px, rgba(229, 229, 229, 0.8) 40px, #f0f0f0 80px);
  background-size: 200px;
  animation: ${shimmer} 2s infinite;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  background: ${props => props.$liked ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0, 0, 0, 0.6)'};
  border: 1px solid ${props => props.$liked ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateY(-10px);

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: scale(1.1);
    background: ${props => props.$liked ? 'rgba(239, 68, 68, 1)' : 'rgba(0, 0, 0, 0.8)'};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: ${props => props.$liked ? 'white' : 'none'};
    animation: ${props => props.$liked ? heartBeat : 'none'} 0.6s ease;
  }
`;

const LikeCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
  border: 2px solid white;
  opacity: ${props => props.count > 0 ? 1 : 0};
  transform: scale(${props => props.count > 0 ? 1 : 0.8});
  transition: all 0.3s ease;
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 90%);
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

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Prompt = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: white;
  line-height: 1.4;
  transform: translateY(25px);
  opacity: 0;
  transition: all 0.4s ease;
  transition-delay: 0.1s;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Author = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  transform: translateY(25px);
  opacity: 0;
  transition: all 0.4s ease;
  transition-delay: 0.2s;

  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }

  &:before {
    content: "by ";
    opacity: 0.6;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9));
  backdrop-filter: blur(20px);
  padding: 12px 20px;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transform: translateY(25px);
  opacity: 0;
  transition: all 0.4s ease;
  transition-delay: 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 120px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 1), rgba(37, 99, 235, 1));
    transform: translateY(0) scale(1.05);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateY(-1px);
  }
`;

// Main Component
const ImageCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes || 0);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.photo;
    link.download = `${item.prompt.slice(0, 20)}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Card>
        <ImageWrapper>
          <Image src={item.photo} alt={item.prompt} loading="lazy" />
        </ImageWrapper>

        <ActionButtons>
          <ActionButton onClick={handleLike} $liked={isLiked}>
            <Heart />
            <LikeCount count={likeCount}>
              {likeCount > 99 ? '99+' : likeCount}
            </LikeCount>
          </ActionButton>
        </ActionButtons>

        <HoverOverlay>
          <ContentSection>
            <Prompt>{item.prompt}</Prompt>
            <Author>{item.author}</Author>
            <DownloadButton onClick={handleDownload}>
              <Download />
              Download
            </DownloadButton>
          </ContentSection>
        </HoverOverlay>
      </Card>
    </Container>
  );
};

export default ImageCard;

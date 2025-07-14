import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import SearchBar from "../Components/SearchBar";
import ImageCard from "../Components/ImageCard";
import { GetPosts } from "../apis";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { 
    background-position: -200px 0;
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% { 
    background-position: calc(200px + 100%) 0;
    opacity: 0.3;
  }
`;

const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
  }
  33% { 
    transform: translateY(-15px) rotate(1deg);
  }
  66% { 
    transform: translateY(-8px) rotate(-1deg);
  }
`;

const pulse = keyframes`
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sparkle = keyframes`
  0%, 100% { 
    opacity: 0; 
    transform: scale(0) rotate(0deg);
  }
  25% {
    opacity: 0.5;
    transform: scale(0.5) rotate(90deg);
  }
  50% { 
    opacity: 1; 
    transform: scale(1) rotate(180deg);
  }
  75% {
    opacity: 0.7;
    transform: scale(0.8) rotate(270deg);
  }
`;

const wave = keyframes`
  0%, 100% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(5px) translateY(-5px); }
  50% { transform: translateX(-3px) translateY(3px); }
  75% { transform: translateX(3px) translateY(-2px); }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3),
                0 0 40px rgba(147, 51, 234, 0.2),
                0 0 60px rgba(236, 72, 153, 0.1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5),
                0 0 60px rgba(147, 51, 234, 0.4),
                0 0 90px rgba(236, 72, 153, 0.3);
  }
`;

const breathe = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, 
    #0a0a0f 0%, 
    #1a1a2e 15%,
    #16213e 30%,
    #0f3460 45%,
    #533483 60%,
    #7209b7 75%,
    #2d1b69 90%,
    #0a0a0f 100%
  );
  background-size: 400% 400%;
  animation: ${gradientShift} 20s ease infinite;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
    background: radial-gradient(ellipse at center top, 
      rgba(59, 130, 246, 0.2) 0%, 
      rgba(147, 51, 234, 0.15) 25%,
      rgba(236, 72, 153, 0.1) 50%,
      transparent 80%
    );
    pointer-events: none;
    animation: ${pulse} 8s ease infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: radial-gradient(ellipse at center bottom, 
      rgba(236, 72, 153, 0.15) 0%, 
      rgba(251, 191, 36, 0.1) 35%, 
      rgba(16, 185, 129, 0.05) 60%,
      transparent 80%
    );
    pointer-events: none;
    animation: ${breathe} 6s ease infinite;
  }
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  
  &::before {
    content: '✨';
    position: absolute;
    top: 20%;
    left: 10%;
    font-size: 24px;
    animation: ${float} 6s ease-in-out infinite, ${sparkle} 4s ease infinite;
    animation-delay: 0s;
  }
  
  &::after {
    content: '🌟';
    position: absolute;
    top: 60%;
    right: 15%;
    font-size: 20px;
    animation: ${float} 8s ease-in-out infinite, ${sparkle} 5s ease infinite;
    animation-delay: 2s;
  }
`;

const AdditionalFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  .element-1 {
    position: absolute;
    top: 30%;
    right: 20%;
    font-size: 18px;
    animation: ${wave} 4s ease-in-out infinite, ${sparkle} 3s ease infinite;
    animation-delay: 1s;
    
    &::before {
      content: '💫';
    }
  }
  
  .element-2 {
    position: absolute;
    bottom: 30%;
    left: 20%;
    font-size: 22px;
    animation: ${float} 7s ease-in-out infinite, ${sparkle} 6s ease infinite;
    animation-delay: 3s;
    
    &::before {
      content: '🎨';
    }
  }
  
  .element-3 {
    position: absolute;
    top: 50%;
    left: 5%;
    font-size: 16px;
    animation: ${wave} 5s ease-in-out infinite, ${sparkle} 4s ease infinite;
    animation-delay: 4s;
    
    &::before {
      content: '⭐';
    }
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 60px;
  animation: ${slideInUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  position: relative;
  z-index: 10;
`;

const Headline = styled.h1`
  font-size: 72px;
  font-weight: 900;
  background: linear-gradient(135deg, 
    #60a5fa 0%, 
    #a78bfa 10%,
    #f472b6 20%, 
    #fbbf24 30%, 
    #34d399 40%,
    #60a5fa 50%,
    #a78bfa 60%,
    #f472b6 70%,
    #fbbf24 80%,
    #34d399 90%,
    #60a5fa 100%
  );
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 10s ease infinite;
  margin-bottom: 24px;
  line-height: 1.1;
  letter-spacing: -3px;
  position: relative;
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  
  &::before {
    content: '✨';
    position: absolute;
    top: -20px;
    left: -40px;
    font-size: 32px;
    animation: ${sparkle} 3s ease infinite, ${float} 4s ease infinite;
    animation-delay: 0.5s;
  }
  
  &::after {
    content: '🎨';
    position: absolute;
    top: -15px;
    right: -45px;
    font-size: 36px;
    animation: ${sparkle} 3s ease infinite, ${wave} 5s ease infinite;
    animation-delay: 1.5s;
  }

  @media (max-width: 768px) {
    font-size: 52px;
    letter-spacing: -2px;
  }

  @media (max-width: 480px) {
    font-size: 38px;
    letter-spacing: -1px;
  }
`;

const Subtitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 16px;
  animation: ${float} 5s ease-in-out infinite;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
    border-radius: 2px;
    animation: ${shimmer} 3s ease infinite;
  }
  
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.25) 0%, 
    rgba(147, 51, 234, 0.25) 50%,
    rgba(236, 72, 153, 0.25) 100%
  );
  backdrop-filter: blur(30px);
  padding: 16px 32px;
  border-radius: 60px;
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 2px 0 rgba(255, 255, 255, 0.1) inset,
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  position: relative;
  overflow: hidden;
  animation: ${pulse} 4s ease infinite, ${glow} 6s ease infinite;
  
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
    animation: ${shimmer} 4s infinite;
  }
  
  &::after {
    content: '⚡';
    margin-left: 12px;
    font-size: 20px;
    animation: ${sparkle} 2.5s ease infinite;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    padding: 14px 28px;
  }
`;

const SearchSection = styled.div`
  width: 100%;
  max-width: 700px;
  margin-bottom: 60px;
  animation: ${slideInUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
  position: relative;
  z-index: 5;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  animation: ${slideInUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.8s;
  opacity: 0;
  animation-fill-mode: forwards;
  position: relative;
  z-index: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 100px 20px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 80px;
  height: 80px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-top: 5px solid rgba(59, 130, 246, 0.9);
  border-right: 5px solid rgba(147, 51, 234, 0.7);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 4px solid transparent;
    border-top: 4px solid rgba(236, 72, 153, 0.8);
    border-left: 4px solid rgba(251, 191, 36, 0.6);
    border-radius: 50%;
    animation: ${spin} 1.8s linear infinite reverse;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border: 3px solid transparent;
    border-bottom: 3px solid rgba(16, 185, 129, 0.9);
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }
`;

const LoadingText = styled.div`
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(45deg, 
    #3b82f6, 
    #9333ea, 
    #ec4899, 
    #fbbf24,
    #10b981
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 4s ease infinite;
  position: relative;
  
  &::after {
    content: '...';
    position: absolute;
    right: -20px;
    animation: ${pulse} 1.5s ease infinite;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: linear-gradient(135deg, 
    rgba(239, 68, 68, 0.15) 0%, 
    rgba(220, 38, 38, 0.1) 100%
  );
  border: 2px solid rgba(239, 68, 68, 0.4);
  padding: 24px 40px;
  border-radius: 20px;
  color: #fca5a5;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 40px;
  animation: ${pulse} 3s infinite, ${glow} 4s ease infinite;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(239, 68, 68, 0.2);
  
  &::before {
    content: '⚠️';
    font-size: 24px;
    animation: ${wave} 2s ease infinite;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  animation: ${fadeIn} 1.5s ease forwards;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 32px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 100px 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  font-weight: 600;
  animation: ${float} 4s ease-in-out infinite;
  
  &::before {
    content: '🔍';
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.9;
    animation: ${pulse} 3s ease infinite;
  }
  
  &::after {
    content: 'Try a different search term or explore our featured artworks';
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 12px;
    display: block;
  }
`;

const StatsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  margin-bottom: 50px;
  padding: 32px 40px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.03) 50%,
    rgba(255, 255, 255, 0.08) 100%
  );
  backdrop-filter: blur(30px);
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.3),
    0 2px 0 rgba(255, 255, 255, 0.1) inset;
  animation: ${slideInUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards, ${breathe} 8s ease infinite;
  animation-delay: 1.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  position: relative;
  overflow: hidden;
  
  &::before {
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
    animation: ${shimmer} 6s infinite;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
    padding: 28px 32px;
  }
  
  @media (max-width: 600px) {
    gap: 24px;
    padding: 24px 28px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.95);
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  .number {
    font-size: 36px;
    font-weight: 900;
    background: linear-gradient(135deg, 
      #3b82f6 0%, 
      #8b5cf6 50%, 
      #ec4899 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    animation: ${pulse} 4s ease infinite;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
      border-radius: 1px;
      animation: ${shimmer} 3s ease infinite;
    }
  }
  
  .label {
    font-size: 16px;
    font-weight: 600;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: linear-gradient(45deg, #3b82f6, #ec4899);
    border-radius: 50%;
    animation: ${sparkle} 3s ease infinite;
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await GetPosts();
      setPosts(res?.data?.data || []);
      setFilteredPosts(res?.data?.data || []);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Search filter effect
  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
      return;
    }

    const SearchFilteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const authorMatch = post?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return promptMatch || authorMatch;
    });

    setFilteredPosts(SearchFilteredPosts);
  }, [posts, search]);

  return (
    <Container>
      <HeaderSection>
        <Headline>
          Explore Amazing AI Creations
        </Headline>
        <Subtitle>Discover the Future of Digital Art</Subtitle>
        <Badge>
          Generated with AI
        </Badge>
      </HeaderSection>

      <SearchSection>
        <SearchBar search={search} setSearch={setSearch} />
      </SearchSection>

      <ContentWrapper>
        {!loading && posts.length > 0 && (
          <StatsBar>
            <StatItem>
              <div className="number">{posts.length}</div>
              <div className="label">Total Artworks</div>
            </StatItem>
            <StatItem>
              <div className="number">{filteredPosts.length}</div>
              <div className="label">Showing Results</div>
            </StatItem>
            <StatItem>
              <div className="number">{new Set(posts.map(p => p.name)).size}</div>
              <div className="label">Artists</div>
            </StatItem>
          </StatsBar>
        )}

        {error && (
          <ErrorContainer>
            {error}
          </ErrorContainer>
        )}

        {loading ? (
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Loading Amazing Artworks...</LoadingText>
          </LoadingContainer>
        ) : (
          <CardGrid>
            {filteredPosts.length === 0 ? (
              <EmptyState>
                {search ? 
                  `No artworks found for "${search}"` : 
                  "No artworks available yet"
                }
              </EmptyState>
            ) : (
              filteredPosts
                .slice()
                .reverse()
                .map((item, index) => <ImageCard key={index} item={item} />)
            )}
          </CardGrid>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default Home;
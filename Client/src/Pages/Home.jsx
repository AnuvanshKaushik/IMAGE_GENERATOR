import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import SearchBar from "../Components/SearchBar";
import ImageCard from "../Components/ImageCard";
import { CircularProgress } from "@mui/material";
import { GetPosts } from "../apis";  // Make sure this import is present

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.background};
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const Headline = styled.h1`
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(to right, #7f00ff, #e100ff, #ff005d);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const Span = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
  letter-spacing: 1px;
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-top: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  animation: ${fadeIn} 1s ease forwards;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
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
    await GetPosts()
      .then((res) => {
        setLoading(false);
        setPosts(res?.data?.data);
        setFilteredPosts(res?.data?.data);
      })
      .catch((error) => {
        setError(error?.response?.data?.message || "Failed to fetch posts");
        setLoading(false);
      });
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
      <Headline>
        Explore popular posts in the Community!
        <Span>⦿ Generated with AI ⦿</Span>
      </Headline>
      <SearchBar search={search} setSearch={setSearch} />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <CardGrid>
            {filteredPosts.length === 0 ? (
              <>No Posts Found</>
            ) : (
              filteredPosts
                .slice()
                .reverse()
                .map((item, index) => <ImageCard key={index} item={item} />)
            )}
          </CardGrid>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;

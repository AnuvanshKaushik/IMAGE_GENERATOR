import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./Utils/Theme";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: auto;  // Change to auto for scroll if content overflows
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  width: 100%;  // Ensure full width is utilized
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  // Align content from the top
  flex: 3;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<CreatePost />} />
          </Routes>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;

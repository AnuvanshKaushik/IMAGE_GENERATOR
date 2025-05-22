import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { AddRounded, ExploreRounded } from "@mui/icons-material";
import Button from "./button";

const Container = styled.div`
  flex: 0 1 auto;  
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width: 600px) {
    padding: 12px 20px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavbarTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }

  @media only screen and (max-width: 600px) {
    font-size: 22px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;

  @media only screen and (max-width: 600px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Container>
      <NavbarTitle>ImageX</NavbarTitle>
      <ButtonContainer>
        {path[1] === "post" ? (
          <Button
            onClick={() => navigate("/")}
            text="Explore Posts"
            leftIcon={
              <ExploreRounded
                style={{
                  fontSize: "20px",
                  marginRight: "8px",
                }}
              />
            }
            type="secondary"
          />
        ) : (
          <Button
            onClick={() => navigate("/post")}
            text="Create new post"
            leftIcon={
              <AddRounded
                style={{
                  fontSize: "20px",
                  marginRight: "8px",
                }}
              />
            }
          />
        )}
      </ButtonContainer>
    </Container>
  );
};
  
export default Navbar;

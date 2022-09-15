import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../../assets/bankName_Logo.png";
import { PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";
import { Info } from "phosphor-react";
import HeaderModal from "./HeaderModal";

const Container = styled.div`
  border-bottom: 10px solid ${({ theme }) => theme.color.primary};
  background-color: #fff;
`;

const Nav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 120rem;
  margin: 0 auto;
  padding: 2.4rem 3.2rem 1.2rem 3.2rem;

  > div > a {
    color: ${({ theme }) => theme.color.primaryMid};
    font-size: 1.6rem;
    text-decoration: none;
    transition: all 0.1s linear;

    &:hover {
      color: ${({ theme }) => theme.color.primary};
      text-decoration: underline;
    }
  }

  > button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

const NavIcon = styled.img`
  max-width: 18rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.primaryMid};
  cursor: pointer;
  font-size: 1.6rem;
  padding: 0;
  text-decoration: none;
  transition: all 0.1s linear;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
    text-decoration: underline;
  }
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 28px;
  opacity: 0.7;
  padding: 0;

  > svg {
    fill: ${({ theme }) => theme.color.primary};
    > circle {
      stroke: ${({ theme }) => theme.color.primary};
    }
    > polyline {
      stroke: ${({ theme }) => theme.color.primary};
    }
  }

  &:hover {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 2.6rem;
`;

function Header({ isLoggedIn }) {
  const [showModal, setShowModal] = useState(false);
  const { getIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = pathname.split("/")[1];

  const logout = async () => {
    try {
      await axios.get("http://localhost:5002/auth/logout");

      await getIsLoggedIn();
      navigate(PATH.LOGIN);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInfoClick = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <Nav>
        <NavIcon src={logo} alt="Bankir logo" />
        <ButtonContainer>
          <HeaderModal showModal={showModal} setShowModal={setShowModal} />
          <InfoButton onClick={handleInfoClick}>
            <Info size={28} color="#080808" />
          </InfoButton>
          {isLoggedIn === false && currentPage === "login" ? (
            <Link to={PATH.REGISTER}>Register</Link>
          ) : isLoggedIn === false && currentPage === "register" ? (
            <Link to={PATH.LOGIN}>Log in</Link>
          ) : (
            <Button onClick={logout}>Log out</Button>
          )}
        </ButtonContainer>
      </Nav>
    </Container>
  );
}

export default Header;

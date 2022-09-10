import axios from "axios";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/bankName_Logo.png";
import { PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";

const Container = styled.div`
  border-bottom: 10px solid ${({ theme }) => theme.color.primary};
  background-color: #fff;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 120rem;
  margin: 0 auto;
  padding: 2.4rem 3.2rem 1.2rem 3.2rem;

  > a,
  button {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primaryMid};
    transition: all 0.1s linear;
    font-size: 1.6rem;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.color.primary};
    }
  }

  > button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }
`;

const NavIcon = styled.img`
  max-width: 18rem;
`;

function Header({ isLoggedIn }) {
  const { pathname } = useLocation();
  const currentPage = pathname.split("/")[1];
  const navigate = useNavigate();
  const { getIsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    try {
      await axios.get("http://localhost:5002/auth/logout");

      await getIsLoggedIn();
      navigate(PATH.LOGIN);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Nav>
        <NavIcon src={logo} alt="Bankir logo" />
        {isLoggedIn === true && <button onClick={logout}>Log out</button>}
        {isLoggedIn === false && currentPage === "login" ? (
          <Link to={PATH.REGISTER}>Register</Link>
        ) : isLoggedIn === false && currentPage === "register" ? (
          <Link to={PATH.LOGIN}>Log in</Link>
        ) : (
          <></>
        )}
      </Nav>
    </Container>
  );
}

export default Header;

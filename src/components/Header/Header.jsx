import styled from "styled-components";
import logo from "../../assets/bankName_Logo.png";

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
`;

const NavIcon = styled.img`
  max-width: 18rem;
`;

function Header({ isLoggedIn }) {
  return (
    <Container>
      <Nav>
        <NavIcon src={logo} alt="Bankir logo" />
        {/* Add links depending on user login */}
        <button>Login</button>
      </Nav>
    </Container>
  );
}

export default Header;

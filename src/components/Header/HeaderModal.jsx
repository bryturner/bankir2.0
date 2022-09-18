import styled from "styled-components";
import Modal from "../Modal/Modal";
import { X } from "phosphor-react";

const Container = styled.div`
  padding: 2rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  height: 20px;
  opacity: 0.6;
  position: absolute;
  right: 14px;
  top: 12px;
  transition: all 0.2s linear;

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

const Heading = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.6rem;
  text-align: center;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const List = styled.ul``;

const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListHeading = styled.h4`
  font-weight: 500;
  font-size: 1.6rem;
  margin-bottom: 6px;
`;

const ListItem = styled.li`
  margin-left: 2rem;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.color.primary};
  transition: all 0.2s linear;

  &:hover {
    color: ${({ theme }) => theme.color.primaryMid};
  }
`;

function HeaderModal({ showModal, setShowModal }) {
  const handleCloseClick = () => {
    setShowModal(false);
  };
  return (
    <Modal showModal={showModal}>
      <Button onClick={handleCloseClick}>
        <X size={20} color="#080808" weight="bold" />
      </Button>
      <Container>
        <Heading>Welcome to BankIR</Heading>
        <ListsContainer>
          <List>
            <ListHeading>How to use this site:</ListHeading>
            <ListItems>
              <ListItem>
                Log in using a default user OR register your own account
              </ListItem>
              <ListItem>
                Transfer money within an account or to another user's account
              </ListItem>
              <ListItem>Simulate a withdrawal or deposit</ListItem>
              <ListItem>
                Simulate earning compound interest and add it to the account
              </ListItem>
              <ListItem>
                Choose to reset the account values at any time
              </ListItem>
              <ListItem>
                When the account reaches $10,000,000 the values will be reset
              </ListItem>
              <ListItem>
                Choose to delete your account from the database at any time
              </ListItem>
            </ListItems>
          </List>
          <List>
            <ListHeading>For more information:</ListHeading>
            <ListItems>
              <ListItem>
                <span>View the site's github repositories and READMEs:</span>
                <LinkContainer>
                  <Link target="_blank">
                    <span>-{">"}</span> Frontend code
                  </Link>
                  <Link target="_blank">
                    <span>-{">"}</span> Backend code
                  </Link>
                </LinkContainer>
              </ListItem>
              <ListItem>
                <span>Check out my LinkedIn profile -{">"}</span>{" "}
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/bryanturnerdev/"
                >
                  here
                </Link>
              </ListItem>
              {/* <ListItem>
              <span>Visit my portfolio website</span>{" "}
              <Link target="_blank">here</Link>
            </ListItem> */}
            </ListItems>
          </List>
        </ListsContainer>
      </Container>
    </Modal>
  );
}

export default HeaderModal;

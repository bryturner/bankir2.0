import styled from "styled-components";

const Form = styled.form`
  position: relative;
`;

function DetailsBoxForm({ id, children, onSubmit }) {
  return (
    <Form onSubmit={onSubmit} id={id}>
      {children}
    </Form>
  );
}

export default DetailsBoxForm;

import styled from "styled-components";

const Form = styled.form``;

function TempForm({ id, children, onSubmit }) {
  return (
    <Form onSubmit={onSubmit} id={id}>
      {children}
    </Form>
  );
}

export default TempForm;
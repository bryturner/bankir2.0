import { forwardRef } from "react";
import styled from "styled-components";

const Form = styled.form`
  position: relative;
`;

const DetailsBoxForm = forwardRef((props, ref) => {
  return (
    <Form onSubmit={props.onSubmit} id={props.id} ref={ref}>
      {props.children}
    </Form>
  );
});

export default DetailsBoxForm;

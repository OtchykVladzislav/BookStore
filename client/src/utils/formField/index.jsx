import { forwardRef } from "react";
import { Form } from "rsuite";
import MyInput from "../../UI/input/MyInput";

export const TextField = forwardRef((props, ref) => {
  const { className, name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group className={error ? 'has-error' : className} controlId={name}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={MyInput} errorMessage={error} {...rest} />
      {error && <Form.HelpText>{message}</Form.HelpText>}
    </Form.Group>
  )
});

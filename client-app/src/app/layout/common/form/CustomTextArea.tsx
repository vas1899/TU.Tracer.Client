import { useField } from "formik";
import React from "react";
import { Form, Label, TextArea } from "semantic-ui-react";

interface Props {
  name: string;
  label?: string;
  rows: number;
  placeholder: string;
}

export default function CustomTextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label> <TextArea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}

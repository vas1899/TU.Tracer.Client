import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import CustomTextInput from "../common/form/CustomTextInput";

export default observer(function LoginForm() {
  const { accountStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: "" }}
      onSubmit={(values, { setErrors }) =>
        accountStore
          .login(values)
          .catch((error) => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h1" content="Login" textAlign="center" color="blue" />
          <CustomTextInput name="email" placeholder="Email" />
          <CustomTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />
            )}
          />
          <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
        </Form>
      )}
    </Formik>
  );
});

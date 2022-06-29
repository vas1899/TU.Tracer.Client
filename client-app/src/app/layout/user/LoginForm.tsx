import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import CustomTextInput from "../common/form/CustomTextInput";

export default observer(function LoginForm() {
  const { accountStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => accountStore.login(values)}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <CustomTextInput name="email" placeholder="Email" />
          <CustomTextInput name="password" placeholder="Password" type="password" />
          <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
        </Form>
      )}
    </Formik>
  );
});

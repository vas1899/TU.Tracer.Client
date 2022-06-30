import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import CustomTextInput from "../common/form/CustomTextInput";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
  const { accountStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", displayName: "", username: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        accountStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required(),
        displayName: Yup.string().required(),
        username: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h1" content="Register" textAlign="center" color="blue" />
          <CustomTextInput name="email" placeholder="Email" />
          <CustomTextInput name="displayName" placeholder="DisplayName" />
          <CustomTextInput name="username" placeholder="Username" />
          <CustomTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage name="error" render={() => <ValidationErrors errors={errors.error} />} />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});

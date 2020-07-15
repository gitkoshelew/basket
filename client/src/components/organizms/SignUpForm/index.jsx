import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { userSignUpRequest } from "../../../redux/actions";

function SignUpForm({ dispatchSignUp }) {
  return (
    <div>
      <h3>Sign Up</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={dispatchSignUp}
      >
        <Form>
          email: <Field type="email" name="email" />
          <Field
            type="password"
            name="password"
            validate={(password) =>
              password && password.length >= 8 ? undefined : "password to short"
            }
          >
            {({ field, meta }) => (
              <div>
                password: <input {...field} type="password" />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}

const mapDispatchToProps = {
  dispatchSignUp: userSignUpRequest,
};

export default connect(null, mapDispatchToProps)(SignUpForm);

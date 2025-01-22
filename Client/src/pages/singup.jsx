import React from "react";
import AuthTemplate from "../components/core/auth-page/template";

const SignUp = () => {
  const signUpHeading = "Sign Up";

  const signUpTitle = "Please Login To Continue";

  const signUpDesc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quisquam obcaecati saepe excepturi tempora architecto consequatur ratione blanditiis quibusdam nobis!";

  return (
    <div>
      <AuthTemplate
        title={signUpTitle}
        description={signUpDesc}
        heading={signUpHeading}
        formType="signUp"
      />
    </div>
  );
};

export default SignUp;

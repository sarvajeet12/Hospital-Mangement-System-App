import React from "react";
import AuthTemplate from "../components/core/auth-page/template";

const Login = () => {
  const loginHeading = "Sign In";

  const loginTitle = "Please Login To Continue";

  const loginDesc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quisquam obcaecati saepe excepturi tempora architecto consequatur ratione blanditiis quibusdam nobis!";

  return (
    <div>
      <AuthTemplate
        title={loginTitle}
        description={loginDesc}
        heading={loginHeading}
        formType="login"
      />
    </div>
  );
};

export default Login;

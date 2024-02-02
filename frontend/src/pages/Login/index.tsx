import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import styles from "./style.module.scss";
import Register from "../Register";

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginData] = useState({
    username: "",
    password: "",
  });

  const handleToggleRegister = () => {
    setIsRegister(!isRegister);
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log("Login Response:", data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className={styles["root"]}>
      <div className={styles["root__main"]}>
        <div className={styles["root__cnt__title"]}>
          <div className={styles["title__name"]}>Welcome Back .!</div>
          <div className={styles["title__skip"]}>
            <div>Skip the lag ?</div>
          </div>
        </div>
        <div className={styles["form__login"]}>
          {isRegister ? (
            <Register />
          ) : (
            <Form
              name="basic"
              className={styles["basic__main"]}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 480 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className={styles["login__name"]}>
                Login <span>Glad you’re back.!</span>
              </div>
              <div className={styles["form__input"]}>
                <Input placeholder="Username" />
                <Input placeholder="Password" />
              </div>

              <Button
                className={styles["btn__click"]}
                type="primary"
                htmlType="submit"
                onClick={handleLoginSubmit}
              >
                Login
              </Button>
            </Form>
          )}

          <div className="login-register">
            {isRegister ? (
              <div
                onClick={handleToggleRegister}
                className={styles["login-account"]}
              >
                Already have an account?
                <span className="login-register-link">Login</span>
              </div>
            ) : (
              <div
                onClick={handleToggleRegister}
                className={styles["login-account"]}
              >
                Don't have an account yet?
                <span className="login-register-link">
                  Register one for free
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import styles from "./style.module.scss";

import Register from "../Register";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleToggleRegister = () => {
    setIsRegister(!isRegister);
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
              <Form name="login" className={styles["login-form"]}>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    className={styles["pass__fill"]}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </Form>

              <Button
                className={styles["btn__click"]}
                type="primary"
                htmlType="submit"
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

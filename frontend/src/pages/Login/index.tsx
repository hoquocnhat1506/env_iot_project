import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "./style.module.scss";

const Login: React.FC = () => {
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
            <Form.Item
              className={styles["box__checked"]}
              valuePropName="checked"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Button
              className={styles["btn__click"]}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;

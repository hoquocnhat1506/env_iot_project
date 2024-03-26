import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const MainPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Devices
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">User 1</Menu.Item>
            <Menu.Item key="4">User 2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="5">Team 1</Menu.Item>
            <Menu.Item key="6">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Welcome to IoT Environment Monitoring and Flood Alert System
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;

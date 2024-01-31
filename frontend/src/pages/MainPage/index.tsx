import { FC, ReactElement } from "react";

const MainPage: FC = (): ReactElement => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
          <span>IoT Monitoring System</span>
        </div>

        <ul className="navbar-menu">
          <li className="navbar-item">Home</li>
          <li className="navbar-item">Devices</li>
          <li className="navbar-item">Reports</li>
          <li className="navbar-item">Alerts</li>
          <li className="navbar-item">Settings</li>
        </ul>
      </div>
    </nav>
  );
};

export default MainPage;

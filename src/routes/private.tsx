import { Outlet } from "react-router-dom";
import { AuthPage } from "../pages/auth-page/auth-page";

const Private = (): JSX.Element | any => {
  const token: string | null = localStorage.getItem("token");
  if (!token) {
    return <AuthPage /> && (window.location.href = "/login");
  } else {
    return <Outlet />;
  }
};

export default Private;

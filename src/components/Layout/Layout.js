import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Router from "../../routers/Router";
import AdminNav from "../../admin/AdminNav";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}

      <div>
        <Router />
      </div>
      <Footer />
    </>
  );
};

export default Layout;

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { motion } from "framer-motion";
import { Container, Row } from "react-bootstrap";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../customhook/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase.config";
import { toast } from "react-toastify";

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  
  const [toggleProfile, setToggleProfile] = useState(false);
  const [css, setCss] = useState("");
  useEffect(() => {
    if (toggleProfile) {
      setCss("toggle");
    } else {
      setCss("");
    }
  }, [toggleProfile]);
  console.log(toggleProfile);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active_menu");

  const navigateTocart = () => {
    navigate("/cart");
  };

  

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav_wrapper">
              <div className="logo">
                <img src={logo} alt="logo" />
                <div>
                  <h1>Market</h1>
                </div>
              </div>
              <div className="navigation" ref={menuRef} onClick={menuToggle}>
                <ul className="menu">
                  {nav_links.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav_active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="nav_icons">
                <span className="fav_icon">
                  <i className="ri-heart-line"></i>
                  <span className="badge">2</span>
                </span>
                <span className="cart_icon" onClick={navigateTocart}>
                  <i className="ri-shopping-bag-line"></i>
                  <span className="badge">{totalQuantity}</span>
                </span>
                <div className="profile">
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser ? currentUser.photoURL : userIcon}
                    alt="..."
                    onClick={() => {
                      setToggleProfile(!toggleProfile);
                    }}
                  />
                  {toggleProfile && (
                    <div
                      className={
                        toggleProfile
                          ? `profile__actions ${css}`
                          : `profile__actions`
                      }
                      
                    >
                      {currentUser ? (
                        <span onClick={logout}>Logout</span>
                      ) : (
                        <div className="d-flex align-items-center justify-content-center flex-column">
                          <Link to="/signup">Signup</Link>
                          <Link to="/login">Login</Link>
                          <Link to="/dashboard">Dashbroard</Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="mobile_menu">
                  <span onClick={menuToggle}>
                    <i class="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;

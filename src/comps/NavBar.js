import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserData, updateUserData } from '../services/userSer';
import NavLink from './NavLink';

function NavBar(props) {
  let [showMobileNav, setShowMobileNav] = useState(false);
  let [user, setUser] = useState(null);
  let history = useHistory();
  let navRef = useRef();


  useEffect(() => {
    setUser(getUserData());
  }, [props.location])

  const hideNavMobile = () => {
    setShowMobileNav(false);
  }

  const logOut = async () => {
    localStorage.removeItem("tok");
    updateUserData();
    history.push("/login");
    toast.info("You are logged out.");
  }

  const { pathname } = history.location;
  return (
    <div className="nav_top p-2">
      <div className="row align-items-center">
        <div className="logo col-lg-3 d-flex justify-content-between align-items-center">
          <h2 className="text-light navbar-brand display-4"><Link className="navbar-brand text-light" to="/">Business Cards</Link></h2>
          <div className="burger" onClick={() => {
            setShowMobileNav(!showMobileNav);
          }}>
            <i className="fa fa-bars fs-2 text-light" aria-hidden="true"></i>
          </div>
        </div>
        <nav ref={navRef} onClick={hideNavMobile} className={"col-lg-9 text-end"} style={{ display: showMobileNav && "block" }} >
          <NavLink pathname={pathname} className="navigation links" to="/">Home</NavLink>
          <NavLink pathname={pathname} className="navigation links" to="/about">About</NavLink>
          {!localStorage["tok"] ?
            <React.Fragment>
              <NavLink pathname={pathname} className="navigation links" to="/login">Log in</NavLink>
              <NavLink pathname={pathname} className="navigation links" to="/signup">Sign up</NavLink>
            </React.Fragment>
            :
            <React.Fragment>
              <NavLink pathname={pathname} className="navigation links" to="/userInfo">User info</NavLink>
              <NavLink pathname={pathname} className="navigation links" to="/favorites">My Favorites</NavLink>
              {user?.biz && <NavLink pathname={pathname} className="navigation links" to="/myBizCards">My cards</NavLink>}
              <Link className="navigation links" onClick={logOut} to="#" className="text-danger log out">Log out</Link>
            </React.Fragment>
          }
        </nav>
      </div>
    </div>
  )
}

export default NavBar
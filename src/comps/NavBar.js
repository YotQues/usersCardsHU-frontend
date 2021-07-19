import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserData, updateUserData } from '../services/userSer';
function NavBar(props) {
  let [showMobileNav, setShowMobileNav] = useState(false);
  let [user, setUser] = useState(null);
  let history = useHistory()


  useEffect(() => {
    setUser(getUserData())
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
        <nav onClick={hideNavMobile} className={"col-lg-9 text-end"} style={{ display: showMobileNav && "block" }} >
          <Link className="navigation links" to="/">Home</Link>
          <Link className="navigation links" to="/about">About</Link>
          {!localStorage["tok"] ?
            <React.Fragment>
              <Link className="navigation links" to="/login">Log in</Link>
              <Link className="navigation links" to="/signup">Sign up</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Link className="navigation links" to="/userInfo">User info</Link>
              <Link className="navigation links" to="/favorites">My Favorites</Link>
              {user?.biz && <Link className="navigation links" to="/myBizCards">My cards</Link>}
              <Link className="navigation links" onClick={logOut} to="#" className="text-danger log out">Log out</Link>
            </React.Fragment>
          }
        </nav>
      </div>
    </div>
  )
}

export default NavBar
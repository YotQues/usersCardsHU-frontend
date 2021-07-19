import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import './css_comps/header_nav.css'
import './css_comps/card.css'
import NavBar from './comps/NavBar';
import Home from './comps/home';
import About from './comps/about';
import Page404 from './comps/page404';
import SignUpClient from './comps/signup';
import Login from './comps/login';
import Footer from './comps/Footer';
import UserInfo from './comps/UserInfo';
import ProtectedRoute from './comps/common/protectedRoute';
import { useEffect, useState } from 'react';
import { updateUserData } from './services/userSer';
import FavoriteCards from './comps/favoriteCards';
import MyCards from './comps/biz/myCards';
import AddCard from './comps/biz/addCard';
import EditCard from './comps/biz/editCard';

function App() {
  let [user, setUser] = useState(null);

  useEffect(() => {
    ifUserLogin()

  }, [])

  const ifUserLogin = async () => {
    let data = await updateUserData();

    setUser(data);
  }

  return (

    <Router>
      <header className="container-fluid bg-dark shadow-sm">
        {user && <Route path="/" component={NavBar} />}
      </header>
      {user &&
        <main className="container bg-light" style={{ minHeight: "81vh" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={SignUpClient} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute path="/userInfo" comp={UserInfo} />
            <ProtectedRoute path="/favorites" comp={FavoriteCards} />
            <ProtectedRoute bizRoute={true} path="/myBizCards" comp={MyCards} />
            <ProtectedRoute bizRoute={true} path="/addCard" comp={AddCard} />
            <ProtectedRoute bizRoute={true} path="/editCard/:id" comp={EditCard} />
            <Route path="/" component={Page404} />
          </Switch>
        </main>
      }
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </Router>
  );
}

export default App;

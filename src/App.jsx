import React, { useContext } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./components/homescreen/homescreen";
import Products from "./components/homescreen/product/products";
import Resources from "./components/homescreen/resources/resources";
import Pricing from "./components/homescreen/pricing/pricing";

import Sidebar from "./components/homescreen/projectSidebar/projectSidebar";
import Header from "./components/homescreen/projectHeader/projectHeader";
import Userstory from "./pages/userStory/userStory";

import { UserContext } from "./context/userContext/userContext";
import "./App.css";
const App = () => {
  const [user, setUser] = useContext(UserContext).user;
  return (
    <Router>
      {user === null ? (
        <Switch>
          <Route exact path="/" component={HomeScreen} />

          <Route path="/product" component={Products} />
          <Route path="/resource" component={Resources} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/signin" />
        </Switch>
      ) : (
        <div className="wraper">
          <Sidebar />
          <div className="right">
            <Header />
            <div className="main__contain">
              <Userstory />
            </div>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;

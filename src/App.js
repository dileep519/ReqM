import React, { useContext } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import HomeScreen from "./components/homescreen/homescreen";
import Products from "./components/homescreen/product/products";
import Resources from "./components/homescreen/resources/resources";
import Pricing from "./components/homescreen/pricing/pricing";

import Mysidebar from "./components/homescreen/myprojectSidebar/myprojectSidebar";
import ProjectSidebar from "./components/homescreen/projectSidebar/projectSidebar";
import ProjectHeader from "./components/homescreen/projectHeader/projectHeader";
import Userstory from "./pages/userStory/userStory";
import NoParticularProject from "./components/homescreen/NoParticularProjectLeft/NoParticularProject";
import DemoPageProject from "./components/homescreen/DemoPage/DemoPageProject";

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
          <Switch>
            <Route exact path="/">
              {" "}
              <Redirect to="/myprojects" />
            </Route>
            <Route exact path="/myprojects" component={Mysidebar} />
            <Route path="/myprojects/:projectID/" component={ProjectSidebar} />
          </Switch>
          <div className="right">
            <ProjectHeader />
            <Switch>
              <Route
                exact
                path="/myprojects/:projectID/projects/addUserStory"
                component={Userstory}
              />
            </Switch>
            {/*<Userstory /> */}
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;

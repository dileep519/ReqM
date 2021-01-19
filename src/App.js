import React, { useContext } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

// components when user is null
import HomeScreen from "./components/homescreen/homescreen";
import Products from "./components/homescreen/product/products";
import Resources from "./components/homescreen/resources/resources";
import Pricing from "./components/homescreen/pricing/pricing";

// components when user is not null
import Mysidebar from "./components/homescreen/myprojectSidebar/myprojectSidebar";
import ProjectSidebar from "./components/homescreen/projectSidebar/projectSidebar";
import ProjectHeader from "./components/homescreen/projectHeader/projectHeader";
import Userstory from "./pages/userStory/userStory";
import NoParticularProject from "./components/homescreen/NoParticularProjectLeft/NoParticularProject";
//import Welcome from "./components/homescreen/welcome/welcome";

// resue this when there is no req left in project and he created first time project
import CreateReq from "./components/homescreen/CreateReq/createReq";

//importing all the pages when user is not null
import AllProjectSummary from "./pages/allProjectSummery/allProjectSummery";
import ParticularPageProject from "./pages/ParticularProjectHomepage/ParticularProjectHomepage";
import ViewAll from "./pages/viewallSummery/ViewAll";
import JTBD from "./pages/JTBD/JTBD";
import EditUserstory from "./pages/editUserstory/editUserStory";

import { UserContext } from "./context/userContext/userContext";
import "./App.css";
import ViewSummery from "./pages/viewSummery/viewSummery";
import Signin from "./components/signin/signin";
const App = () => {
  const [user, setUser] = useContext(UserContext).user;
  return (
    <Router>
      {/* <Route exact path="/welcome" component={Welcome} /> */}
      {user === null ? (
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/product" component={Products} />
          <Route path="/resource" component={Resources} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/signin" component={Signin} />
        </Switch>
      ) : (
        <div className="app__wraper">
          <Switch>
            <Route exact path="/">
              {" "}
              <Redirect to="/myprojects" />
            </Route>
            <Route exact path="/myprojects" component={Mysidebar} />
            <Route path="/myprojects/:projectID/" component={ProjectSidebar} />
          </Switch>
          <div className="app__right">
            <Switch>
              {/*<Route exact path="/createnewproject" /> */}
              <Route exact path="/myprojects">
                <ProjectHeader />
                <AllProjectSummary />
              </Route>
              <Route exact path="/myprojects/:projectID/projects">
                <ProjectHeader />
                <ParticularPageProject />
              </Route>
              <Route exact path="/myprojects/:projectID/projects/addreq">
                <ProjectHeader />
                <CreateReq />
              </Route>
              <Route
                exact
                path="/myprojects/:projectID/projects/viewall/:storyID"
              >
                <ProjectHeader />
                <ViewSummery />
              </Route>

              <Route
                exact
                path="/myprojects/:projectID/projects/viewall/:storyID/edit"
              >
                <ProjectHeader />
                <EditUserstory />
              </Route>

              <Route exact path="/myprojects/:projectID/projects/viewall">
                <ProjectHeader />
                <ViewAll />
              </Route>
              <Route exact path="/myprojects/:projectID/projects/addreq/jtbd">
                <ProjectHeader />
                <JTBD />
              </Route>

              <Route
                exact
                path="/myprojects/:projectID/projects/addreq/adduserstory"
              >
                <ProjectHeader />
                <Userstory />
              </Route>
            </Switch>
            {/*<Userstory /> */}
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;

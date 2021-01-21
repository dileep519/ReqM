import React, { useContext } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
  useHistory,
} from "react-router-dom";

// components when user is null
import HomeScreen from "./components/homescreen/homescreen";
import Products from "./components/homescreen/product/products";
import Resources from "./components/homescreen/resources/resources";
import Pricing from "./components/homescreen/pricing/pricing";
import Signup from "./components/signup/signup";
import Welcome from "./components/homescreen/welcome/welcome";

// components when user is not null
import Mysidebar from "./components/homescreen/myprojectSidebar/myprojectSidebar";
import ProjectSidebar from "./components/homescreen/projectSidebar/projectSidebar";
import ProjectHeader from "./components/homescreen/projectHeader/projectHeader";
import Userstory from "./pages/userStory/userStory";

import NoParticularProject from "./components/homescreen/NoParticularProjectLeft/NoParticularProject";

// resue this when there is no req left in project and he created first time project
import CreateReq from "./components/homescreen/CreateReq/createReq";

//importing all the pages when user is not null
import AllProjectSummary from "./pages/allProjectSummery/allProjectSummery";
import ParticularPageProject from "./pages/ParticularProjectHomepage/ParticularProjectHomepage";
import ViewAll from "./pages/viewallSummery/ViewAll";
import JTBD from "./pages/JTBD/JTBD";
import EditUserstory from "./pages/editUserstory/editUserStory";
import ViewJTBD from "./pages/ViewJTBD/viewJTBD";
import EditJTBD from "./pages/editJTBD/EditJTBD";

import { UserContext } from "./context/userContext/userContext";
import "./App.css";
import ViewSummery from "./pages/viewSummery/viewSummery";
import Signin from "./components/signin/signin";
import ProjectMembers from "./pages/ProjectMembers/ProjectMembers";
const App = () => {
  const [user, setUser] = useContext(UserContext).user;
  const history = useHistory();

  window.onpopstate = () => {
    const ans = window.location.href.split("myprojects");
    if (ans.length >= 1 && ans[1].split("/").length == 2) {
      history.push("/");
    }
  };
  return (
    <Router>
      {/* <Route exact path="/welcome" component={Welcome} /> */}
      {user === null ? (
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product" component={Products} />
          <Route exact path="/resource" component={Resources} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/welcome" component={Welcome} />
          <Redirect to="/signin" />
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
                path="/myprojects/:projectID/projects/viewall/jtbd/:storyID"
              >
                <ProjectHeader />
                <ViewJTBD />
              </Route>

              <Route
                exact
                path="/myprojects/:projectID/projects/viewall/jtbd/:storyID/edit"
              >
                <ProjectHeader />
                <EditJTBD />
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

              <Route exact path="/myprojects/:projectID/project_members">
                <ProjectHeader />
                <ProjectMembers />
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

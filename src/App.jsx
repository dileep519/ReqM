import React, { Fragment } from 'react';
import UserStory2 from './components/auth/UserStory2';
import UserStory1 from './components/auth/UserStory1';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => (
  <div>
    {/* <UserStory1 /> */}
    <UserStory2 />
  </div>
);

export default App;

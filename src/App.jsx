import React from 'react';
import {Route,Switch } from 'react-router-dom';
import HomeScreen from './components/homescreen/homescreen';
import Products from './components/homescreen/product/products';
import Resources from './components/homescreen/resources/resources';
import Pricing from './components/homescreen/pricing/pricing';

const App=()=>{
    return(
        <>
        <Switch>
            <Route exact path="/" component={HomeScreen}/>
            <Route path="/product" component={Products}/>
            <Route path="/resource" component={Resources}/>
            <Route path="/pricing" component={Pricing}/>
            <Route path="/signin"/>
        </Switch>

        </>
    );
}

export default App;
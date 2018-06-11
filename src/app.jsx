/*
* @Author: Reshift0023
* @Date:   2018-05-30 10:50:48
* @Last Modified by:   Reshift0023
* @Last Modified time: 2018-05-30 16:22:24
*/

// console.log("Hello webpack");

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';

import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';
import Login from 'page/login/index.jsx';

class App extends React.Component {
    render() {
        // console.log('123');
        return (

            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={props => (

                        <Layout>

                            <Switch>

                                <Route exact path="/" component={Home}/>
                                <Route path="/product" component={Home}/>
                                <Route path="product-category" component={Home}/>

                            </Switch>

                        </Layout>)}/>


                </Switch>

            </Router>

        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)





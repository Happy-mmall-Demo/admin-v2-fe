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

import Home          from 'page/home/index.jsx';
import Layout        from 'component/layout/index.jsx';
import Login         from 'page/login/index.jsx';
import UserList      from 'page/user/index.jsx';
import ErrorPage     from 'page/error/index.jsx';
import ProductRouter from 'page/product/router.jsx';

class App extends React.Component {


    render() {

        let LayoutRouter = (
            <Layout>

                <Switch>

                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}/>

                    <Route path='/user' component={UserList}/>
                    <Redirect exact from='/user' to='/user/index'/>
                    <Route component={ErrorPage}/>
                </Switch>

            </Layout>
        );
        // console.log('123');
        return (

            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={props => LayoutRouter}/>

                </Switch>

            </Router>

        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)





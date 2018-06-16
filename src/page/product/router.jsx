/*
* @Author: Reshift0023
* @Date:   2018-05-30 10:50:48
* @Last Modified by:   Reshift0023
* @Last Modified time: 2018-05-30 16:22:24
*/

// console.log("Hello webpack");

import React from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';

class ProductRouter extends React.Component {
    render() {
         return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Redirect exact from="/product" to="/product/index"/>
            </Switch>
        );
    }
}

export default ProductRouter;


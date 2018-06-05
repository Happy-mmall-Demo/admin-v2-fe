/*
* @Author: Reshift0023
* @Date:   2018-05-30 10:50:48
* @Last Modified by:   Reshift0023
* @Last Modified time: 2018-05-30 16:22:24
*/

// console.log("Hello webpack");

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';

import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';

class App extends React.Component {
	render() {
		// console.log('123');
		return (
			
				<Router>
					<Layout>
						<Switch>
							<Route exact path="/" component = {Home}/>
							<Redirect from="*" to="/"/>
						</Switch>
					</Layout>
				</Router>
				
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);





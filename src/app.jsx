/*
* @Author: Reshift0023
* @Date:   2018-05-30 10:50:48
* @Last Modified by:   Reshift0023
* @Last Modified time: 2018-05-30 16:22:24
*/

// console.log("Hello webpack");

import React from 'react';
import ReactDOM from 'react-dom';

// import 'font-awesome/css/font-awesome.min.css';
// import './index.css';
// import './index.scss';

// ReactDOM.render(
//   <div>
  	
//   	<h1>Hello, world!</h1>,
//   </div>,
//   document.getElementById('app')
// );

class Child extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClick() {
		this.props.changeColor('red');
	}
	render() {
		return (
			<div>
				<h1>Parent Component Bgcolor: {this.props.bgColor}</h1>
				<button onClick={(e) => {this.handleClick(e)}}>Change Father Component Color</button>
			</div>
		);
	}
}

class Father extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bgColor: '#999'
		}
	}
	
	onBgColorChange(color) {
		this.setState ({
			bgColor: color
		})
	}

	render(props) {
		return (
			<div style = {{background: this. state.bgColor }}>
				<Child bgColor = {this.state.bgColor} changeColor = {(color) => {this.onBgColorChange(color)}}/>
			</div>
			);
	}
}

ReactDOM.render(
	<Father />,
	document.getElementById('app')
);




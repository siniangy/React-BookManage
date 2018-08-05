import React from 'react';
import style from '../styles/home-page.less';

//react-router-dom的Link跳转
export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {date: new Date()};
	}
	//生命周期在DidMount中绑定tick方法
	componentDidMount() {
	    this.timerID = setInterval(
	      () => this.tick(),
	      1000
	    );
  	}

  componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
		  date: new Date()
		});
	}
	render () {
		return (
			<div className={style.Welcome}>
				<h1>Welcome</h1>
				<h1>祀念</h1>
				<h2>The time is {this.state.date.toLocaleTimeString()}</h2>
			</div>
		)
	}
}
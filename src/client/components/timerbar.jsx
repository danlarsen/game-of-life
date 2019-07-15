import React from 'react';
import { inherits } from 'util';

export default class Timerbar extends React.Component {
	onTick = null;
	
	constructor(props) {
		super(props);
		this.state = {
			active: 0
		};

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
	}
	
	timer = null;

	start() {
		this.timer = setInterval(() => {
			if(!this.onTick && this.props.onTick)
				this.onTick = this.props.onTick;
			
			if(this.onTick)
				this.onTick();
		}, 250);
		this.setState({active: 1});
	}
	stop() {
		clearInterval(this.timer);
		this.timer = null;
		this.setState({active: 0});
	}

	render() {
		var content = (this.state.active == 1) ?
			<button id="pause-button" onClick={this.stop}>Pause</button> :
			<button id="start-button" onClick={this.start}>Start</button>;

		return <div className="toolbar">
				{content}
				<button onClick={this.onTick}>Advance one Frame</button>
			</div>;
	}
};
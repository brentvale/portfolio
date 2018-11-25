import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import RobotChickens from './screens/chickens/robot_chickens';
import WorkExperience from './screens/work/work_experience';
import IntroSectionContainer from './screens/intro/section_container';
import Footer from './screens/footer.jsx';
import { isMobile } from './utils/isMobile';

import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state = {
			backgroundHeight: null,
			windowWidth: null
		};
	}
	
	componentDidMount(){
		window.addEventListener('resize', debounce(this.handleResizeBackground.bind(this), 200));
		const isDeviceMobile = isMobile();
		if(isDeviceMobile){
      window.addEventListener('orientationchange', debounce(this.handleResizeBackground.bind(this), 200));
		}
		this.handleResizeBackground();
		this.setState({ isMobile: isDeviceMobile });
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.handleResizeBackground);
    window.removeEventListener('orientationchange', this.handleResizeBackground);
	}
	
	handleResizeBackground = () => { // eslint-disable-line
		const windowWidth = window.innerWidth;
		//1600width x 2160 height = 74%
		const heightOfExpandingDiv = (windowWidth < 740) ? 1000 : 1.35*windowWidth;
		this.setState({ backgroundHeight: heightOfExpandingDiv, windowWidth: windowWidth }, () => {
			this.forceUpdate();
		});
	};
	
  render() {
    return (
      <div className="App">
				<IntroSectionContainer backgroundHeight={this.state.backgroundHeight}
															 windowWidth={this.state.windowWidth}/>

				<RobotChickens windowWidth={this.state.windowWidth}/>

				<WorkExperience windowWidth={this.state.windowWidth}/>

				<Footer windowWidth={this.state.windowWidth}/>
      </div>
    );
  }
}

export default App;
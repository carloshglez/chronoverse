import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ControlPanel extends React.Component {
	render() {
		return (
			<div>
				{this.props.scorePanel}
				<ToastContainer 
					transition={Slide}
					position="top-center"
					autoClose={5000}
					closeButton={false}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable={false}
					pauseOnHover={false}
					theme="colored"
				/>
				{this.props.buttonsPanel}
			</div>
		);
	}
}

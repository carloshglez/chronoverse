import React from 'react';
import FaRepeat from 'react-icons/lib/fa/repeat'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'

export default class EndGame extends React.Component {
	render() {
        let message;
    
        if (this.props.currentScore <= 0) {
          message = '0 points... So sad.';
        } else if (this.props.currentScore >= this.props.topScore){
          message = 'Top score with ' + this.props.currentScore + ' points. Woo!';
        } else {
          message = this.props.currentScore + ' Points though :)'
        }

		return (
      		<div className='endgame'>
        		<p>Game Over!</p>
            	<p>{message}</p>
            	<button
            		className='infoButton'
            		onClick={ this.props.startGame }>
            		<FaRepeat/> Try again?
              	</button>
				<button
            		className='infoButton'
            		onClick={ this.props.setIntro }>
            		<MdExitToApp/> Exit
              	</button>
            </div>
		);
	}
}

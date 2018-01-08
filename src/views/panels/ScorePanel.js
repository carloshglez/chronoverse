import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';

import FaShield from 'react-icons/lib/fa/shield'
import MdAccessAlarm from 'react-icons/lib/md/access-alarm'
import MdStars from 'react-icons/lib/md/stars'
import MdStarOutline from 'react-icons/lib/md/star-outline'
import { PLAYLIST } from '../../util/soundHelper';

export default class ScorePanel extends React.Component {
    componentDidMount() {
        PLAYLIST.START_GAME.play();
    }

    render() {
        return (
            <div>
                <span className='score top-score'>
                    <MdStars /> Top Score: {this.props.topScore}
                </span>
                <span className='score current-score'>
                    <MdStarOutline /> Score: {this.props.currentScore}
                </span>
                <span className='score shield-score'>
                    <FaShield /> Shield: {this.props.currentShield}
                </span>
                <span className='score time-score'>
                    <MdAccessAlarm /> Time: {this.props.timeValue} seg
				</span>
            </div>
        );
    }
}

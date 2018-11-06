import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';

import FaShield from 'react-icons/lib/fa/shield'
import MdAccessAlarm from 'react-icons/lib/md/access-alarm'
import MdStars from 'react-icons/lib/md/stars'
import MdStarOutline from 'react-icons/lib/md/star-outline'
import Progress from 'react-progressbar';
import { PLAYLIST } from '../../util/soundHelper';
import { strings } from '../../util/strings';

export default class ScorePanel extends React.Component {
    componentDidMount() {
        PLAYLIST.START_GAME.play();
    }

    render() {
        let shieldValueForlabel = (this.props.currentShield > 100) ? 100 : this.props.currentShield;
        let timeValueForLabel = (this.props.timeValue * 100) / 15;
        timeValueForLabel = (timeValueForLabel > 100) ? 100 : timeValueForLabel;
        return (
            <div>
                <span className='score top-score'>
                    <MdStars /> {strings.lbTopScore}: {new Intl.NumberFormat().format(this.props.topScore)}
                </span>
                <span className='score current-score'>
                    <MdStarOutline /> {strings.lbScore}: {new Intl.NumberFormat().format(this.props.currentScore)}
                </span>
                <span className='score shield-score'>
                    <div style={{float: 'left'}}><FaShield /></div>
                    <Progress className={(shieldValueForlabel < 30 && shieldValueForlabel > 0) ? 'shield-meter flashit' : 'shield-meter'}
                        color='Blue' completed={shieldValueForlabel}/>
                </span>
                <span className='score time-score'>
                    <div style={{float: 'left'}}><MdAccessAlarm /></div>
                    <Progress className='time-meter' color='WhiteSmoke' completed={timeValueForLabel}/>
				</span>
            </div>
        );
    }
}

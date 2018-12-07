import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';

import FaShield from 'react-icons/lib/fa/shield'
import MdAccessAlarm from 'react-icons/lib/md/access-alarm'
import FaHeart from 'react-icons/lib/io/heart'
import MdStars from 'react-icons/lib/md/stars'
import MdStarOutline from 'react-icons/lib/md/star-outline'
import Progress from 'react-progressbar';
import { PLAYLIST } from '../../util/soundHelper';
import { strings } from '../../util/strings';

export default class ScorePanel extends React.Component {
    componentDidMount() {
        PLAYLIST.START_GAME.play();
    }

    getShield(currentShield) {
        let shieldValueForlabel = (currentShield > 100) ? 100 : currentShield;
        return (
            <span className='score shield-score'>
                    <div style={{float: 'left'}}><FaShield /></div>
                    <Progress className={(shieldValueForlabel <= 30 && shieldValueForlabel > 0) ? 'shield-meter flashit' : 'shield-meter'}
                        color='Blue' completed={shieldValueForlabel}/>
                </span>
        )
    }

    getTime(currentTime) {
        let timeValueForLabel = (currentTime * 100) / 15;
        timeValueForLabel = (timeValueForLabel > 100) ? 100 : timeValueForLabel;
        return (
            <span className='score time-score'>
                    <div style={{float: 'left'}}><MdAccessAlarm /></div>
                    <Progress className='time-meter' color='WhiteSmoke' completed={timeValueForLabel}/>
				</span>
        )
    }

    getLife(currentLife) {
        let lifeValueForLabel = (currentLife > 100) ? 100 : currentLife;
        return (
            <span className='score life-score'>
                    <div style={{float: 'left'}}><FaHeart /></div>
                    <Progress className={(lifeValueForLabel <= 40 && lifeValueForLabel > 0) ? 'life-meter flashit' : 'life-meter'}
                        color='Red' completed={lifeValueForLabel}/>
				</span>
        )
    }

    render() {
        return (
            <div>
                <span className='score top-score'>
                    <MdStars /> {strings.lbTopScore}: {new Intl.NumberFormat().format(this.props.topScore)}
                </span>
                <span className='score current-score'>
                    <MdStarOutline /> {strings.lbScore}: {new Intl.NumberFormat().format(this.props.currentScore)}
                </span>
                {this.getShield(this.props.currentShield)}
                {this.getTime(this.props.currentTime)}
                {(this.props.inBattleGame) ? this.getLife(this.props.currentLife) : null}
            </div>
        );
    }
}

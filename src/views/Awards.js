import React from 'react';
import IScroll from 'iscroll'
import '../styles/style.css';
import '../styles/awards.css';

import MdHighlightRemove from 'react-icons/lib/md/highlight-remove'
import FaTrophy from 'react-icons/lib/fa/trophy'
import FaCheckSquareO from 'react-icons/lib/fa/check-square-o'
import { isPassive, isMobileDevice } from '../util/helpers';
import { getAwardsArray, wonAwards } from '../util/awardsHelper';

export default class Awards extends React.Component {
    constructor() {
        super();
        this.myScroll = null;
    }

    componentDidMount() {
        this.myScroll = new IScroll(this.refs.wrapper, { mouseWheel: true });
        window.addEventListener('touchmove', function (e) { e.preventDefault(); },
            isPassive() ? {
                capture: false,
                passive: false
            } : false
        );

    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        window.removeEventListener('touchmove', function (e) { e.preventDefault(); });
        this.myScroll.destroy();
        this.myScroll = null;
    }

    render() {
        let awardItems = getAwardsArray().map(function (item) {
            return (
                <li key={item.id}>
                    <div className='icon-award'>{item.icon}</div>
                    <div className='status-award'>{(item.won) ? <FaCheckSquareO /> : null} </div>
                    <div className='text-award'>{item.text}</div>
                </li>
            )
        });

        return (
            <div>
                <div className='iconPanel upper-corner-left-first'>
                    <FaTrophy/> <span className='score-award'>{wonAwards.length} / {getAwardsArray().length}</span>
				</div>
				<div className='iconPanel upper-corner-right-first'>
                    <MdHighlightRemove onClick={this.props.gameOptions} />
				</div>

                <div className='selectgame'>
                    <h3>Your Awards:</h3>
                </div>
                <div>
                    <div id='wrapper' className='wrapper-award' ref='wrapper'>
                        <div id='scroller' className='scroller-award'>
                            <ul>
                                {awardItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

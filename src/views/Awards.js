import React from 'react';
import IScroll from 'iscroll'
import '../styles/style.css';
import '../styles/awards.css';

import MdHighlightRemove from 'react-icons/lib/md/highlight-remove'
import FaTrophy from 'react-icons/lib/fa/trophy'
import FaCheckSquareO from 'react-icons/lib/fa/check-square-o'
import { isPassive, isMobileDevice } from '../util/helpers';
import { AWARDS } from '../util/awardsHelper';

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
        let awardItems = AWARDS.map(function (item) {
            return (
                <li key={item.id}>
                    <div className='icon-award'>{item.icon}</div>
                    <div className='text-award'>{item.text}</div>
                    <div className='status-award'>{(item.won) ? <FaCheckSquareO /> : null} </div>
                </li>
            )
        });

        return (
            <div>
                <ul className='gameAwards'>
                    <li>
                        <MdHighlightRemove onClick={this.props.setIntro} />
                    </li>
                </ul>
                <div className='selectgame'>
                    <h3> <FaTrophy /> Your Awards:</h3>
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

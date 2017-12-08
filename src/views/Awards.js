import React from 'react';
import IScroll from 'iscroll'
import '../styles/style.css';
import '../styles/awards.css';

import MdHighlightRemove from 'react-icons/lib/md/highlight-remove'
import FaTrophy from 'react-icons/lib/fa/trophy'
import FaCheckSquareO from 'react-icons/lib/fa/check-square-o'
import { isPassive, isMobileDevice } from '../util/helpers';

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
        return (
            <div>
                <ul className='gameAwards'>
                    <li>
                       <MdHighlightRemove onClick={this.props.setIntro} />
                    </li>
                </ul>
                <div className='selectgame'>
					<h3> <FaTrophy/> Your Awards:</h3>
				</div>
                <div>
                    <div id='wrapper' className='wrapper-award' ref='wrapper'>
                        <div id='scroller' className='scroller-award'>
                            <ul>
                                <li>
                                    <div className='icon-award'>O</div>
                                    <div className='text-award'>Hello world!</div>
                                    <div className='status-award'> <FaCheckSquareO/> </div>
                                </li>
                                <li>
                                    <div className='icon-award'>O</div>
                                    <div className='text-award'>Hello world!</div>
                                    <div className='status-award'> <FaCheckSquareO/> </div>
                                </li>
                                <li>
                                    <div className='icon-award'>O</div>
                                    <div className='text-award'>Hello world!</div>
                                    <div className='status-award'> <FaCheckSquareO/> </div>
                                </li>
                                <li>
                                    <div className='icon-award'>O</div>
                                    <div className='text-award'>Hello world!</div>
                                    <div className='status-award'> <FaCheckSquareO/> </div>
                                </li>
                                <li>
                                    <div className='icon-award'>O</div>
                                    <div className='text-award'>Hello world!</div>
                                    <div className='status-award'> <FaCheckSquareO/> </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

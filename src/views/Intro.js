import React from 'react';
import '../styles/style.css';
import '../styles/intro.css';

import MdStars from 'react-icons/lib/md/stars'
import MdInfo from 'react-icons/lib/md/info'
import FaTrophy from 'react-icons/lib/fa/trophy'

export default class Intro extends React.Component {
    render() {
        return (
            <div>
                <span className='score top-score'>
                    <MdStars /> Top Score: {this.props.topScore}
                </span>
                <div className='intro'>
                    <h2>Chronoverse</h2>
                    <button
                        className='infoButton'
                        onClick={this.props.gameOptions}>
                        S T A R T
                    </button>
                </div>
                <ul className='gameAwards'>
                    <li>
                        <FaTrophy onClick={this.props.displayAwards}/>
                    </li>
                    <li>
                        <MdInfo onClick={this.props.displayAbout}/>
                    </li>
                </ul>
                <div className='help-info legal'>
                    v{this.props.appversion} - &copy;2018
                </div>
            </div>
        );
    }
}

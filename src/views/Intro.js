import React from 'react';
import '../styles/style.css';
import '../styles/intro.css';

import MdStars from 'react-icons/lib/md/stars'

export default class Intro extends React.Component {
	render() {

		return (
            <div>
                <div className='intro'>
                    <h2>Chronoverse</h2>
                    <button
                        className='infoButton'
                        onClick={ this.props.gameOptions }>
                        S T A R T
                    </button>
                </div>
                <div className='help-info legal'>
                    v1.1 - &copy;2018
                </div>
            </div>
		);
	}
}

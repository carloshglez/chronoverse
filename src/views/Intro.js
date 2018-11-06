import React from 'react';
import '../styles/style.css';
import '../styles/intro.css';

import { PLAYLIST } from '../util/soundHelper';
import { strings } from '../util/strings';

export default class Intro extends React.Component {
    componentWillUnmount() {
        PLAYLIST.INTRO_SELECT.play();
    }

    render() {
        return (
            <div>
                <div className='intro'>
                    <h2>{strings.title}</h2>
                    <button
                        className='infoButton'
                        onClick={this.props.gameOptions}>
                        {strings.btStart}
                    </button>
                </div>
                <div className='help-info legal'>
                    v{this.props.appversion} - &copy;2018
                </div>
            </div>
        );
    }
}

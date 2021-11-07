import React from 'react';
import '../styles/style.css';
import '../styles/intro.css';

import { PLAYLIST } from '../util/soundHelper';
import { strings } from '../util/strings';

export default class About extends React.Component {
    componentDidMount() {
        PLAYLIST.OPTION_SELECT.play();
    }

    componentWillUnmount() {
        PLAYLIST.OPTION_SELECT.play();
    }

    render() {
        return (
            <div>
                <div className='intro'>
                    <h2>{strings.title}</h2>
                    <img className='aboutImg' src={'./res/mipmap-hdpi/ic_launcher.png'}/>
                    <br/>{strings.lbVersion} {AppVersion}<br/>
                    <p>carloshglez - &copy; 2021</p>
                    <br/>
                    <button
                        className='infoButton'
                        onClick={this.props.gameOptions}>
                        {strings.lbThanks}
                    </button>
                </div>
            </div>
        );
    }
}

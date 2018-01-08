import React from 'react';
import '../styles/style.css';
import '../styles/intro.css';

import MdInfo from 'react-icons/lib/md/info'
import { PLAYLIST } from '../util/soundHelper';

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
                    <h2>Chronoverse</h2>
                    <img className='aboutImg' src={'./webapp/icon.png'}/>
                    <br/>Version {this.props.appversion}<br/>
                    <p>carloshglez &copy;2018</p>
                    <br/>
                    <button
                        className='infoButton'
                        onClick={this.props.gameOptions}>
                        Thanks for playing!
                    </button>
                </div>
            </div>
        );
    }
}

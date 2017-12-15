import React from 'react';
import '../styles/style.css';
import '../styles/intro.css';

import MdInfo from 'react-icons/lib/md/info'

export default class About extends React.Component {
    render() {

        return (
            <div>
                <div className='intro'>
                    <h2>Chronoverse</h2>
                    <img className='aboutImg' src={'../www/webapp/icon.png'}/>
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

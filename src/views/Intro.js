import React from 'react';
import '../styles/style.css';
import '../styles/intro.css';

export default class Intro extends React.Component {
    render() {
        return (
            <div>
                <div className='intro'>
                    <h2>Chronoverse</h2>
                    <button
                        className='infoButton'
                        onClick={this.props.gameOptions}>
                        S T A R T
                    </button>
                </div>
                <div className='help-info legal'>
                    v{this.props.appversion} - &copy;2018
                </div>
            </div>
        );
    }
}

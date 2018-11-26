import React from 'react';
import Switch from "react-switch";
import '../styles/style.css';
import '../styles/settings.css';

import MdHighlightRemove from 'react-icons/lib/md/highlight-remove'
import MdSettings from 'react-icons/lib/md/settings'
import MdVolumeUp from 'react-icons/lib/md/volume-up'
import MdLanguage from 'react-icons/lib/md/language'
import { PLAYLIST } from '../util/soundHelper';
import { strings } from '../util/strings';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.soundEnabled = props.soundValue;
        this.langSelected = props.langValue;
        this.handleSoundChange = this.handleSoundChange.bind(this);
        this.handleLangChange = this.handleLangChange.bind(this);
    }

    handleSoundChange(checked) {
        this.soundEnabled = checked;
        //Store sound option
        this.props.updateSound(this.soundEnabled);
    }

    handleLangChange(checked) {
        this.langSelected = (checked) ? 'en' : 'es';
        //Store lang option
        this.props.updateLang(this.langSelected);
    }

    componentDidMount() {
        PLAYLIST.OPTION_SELECT.play();
    }

    componentWillUnmount() {
        PLAYLIST.OPTION_SELECT.play();
    }

    render() {
        let switchProps = {
            offColor: "#333",
            onColor: "#999",
            offHandleColor: "#fff",
            onHandleColor: "#fff",
            boxShadow: "0px 1px 5px rgba(255, 255, 255, 255.6)",
            activeBoxShadow: "0px 0px 1px 10px rgba(255, 255, 255, 0.2)"
        };

        return (
            <div>
                <div className='iconPanel upper-corner-left-first-2'>
                    <MdSettings className="iconEffect" />
                </div>
                <div className='iconPanel upper-corner-right-first'>
                    <MdHighlightRemove onClick={this.props.gameOptions} />
                </div>

                <div className='selectgame'>
                    <h3>{strings.lbSettings}</h3>
                </div>
                <div className='settingsTable'>
                    <ul>
                        <li id="sound-switch">
                            <MdVolumeUp className='settingIcon' />
                            <Switch
                                className="sound-switch"
                                onChange={this.handleSoundChange}
                                checked={this.soundEnabled}
                                aria-labelledby="sound-switch"
                                width={65}
                                {...switchProps}
                                uncheckedIcon={
                                    <div className='label-switch'>OFF</div>
                                }
                                checkedIcon={
                                    <div className='label-switch'>ON</div>
                                }
                            />
                            {strings.lbSound}
                        </li>
                        <li id="language-switch">
                            <MdLanguage className='settingIcon' />
                            <Switch
                                className="language-switch"
                                onChange={this.handleLangChange}
                                checked={(this.langSelected == 'en') ? true : false}
                                aria-labelledby="language-switch"
                                width={65}
                                {...switchProps}
                                uncheckedIcon={
                                    <div className='label-switch'>ES</div>
                                }
                                checkedIcon={
                                    <div className='label-switch'>EN</div>
                                }
                            />
                            {strings.lbLanguage}                            
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

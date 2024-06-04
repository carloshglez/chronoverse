import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';
import { isMobileDevice } from '../../util/helpers';

import { MdArrowBack } from 'react-icons/md'
import { MdArrowUpward } from 'react-icons/md'
import { MdArrowForward } from 'react-icons/md'
import { MdArrowDownward } from 'react-icons/md'
import { MdGpsFixed } from 'react-icons/md'
import { FaShield } from 'react-icons/fa'

export default class ButtonsPanelSpaceRace extends React.Component {
    render() {
        let buttonsLayer;
        let keysHelp;

        if(!isMobileDevice()) {
            keysHelp = (
                <div className='help-info instructions'>
                Use [A][D] or [<MdArrowBack />][<MdArrowForward />] to MOVE<br/>
                Use [SPACE] to SHOOT<br/>
                Use [S] or [<MdArrowDownward />] to SHIELD<br/>
                </div>
            );
        } else {
            buttonsLayer = (
                <div>
                    {/*<button id='left' 	className='actionButton btnLeft_sp' 	{...this.props.customEvents}> 	<MdArrowUpward />		</button>
                    <button id='right' 	className='actionButton btnRight_sp' 	{...this.props.customEvents}>	<MdArrowDownward />	</button>*/}
                    <button id='shoot' 	className='actionButton btnShoot_sp' 	{...this.props.customEvents}>	<MdGpsFixed />		</button>
                    <button id='shield' 	className={(this.props.currentShield <= 0) ? 'disabledButton btnShield_sp' : 'actionButton btnShield_sp'}
                        {...this.props.customEvents}>	<FaShield />
                    </button>
                </div>
            );
        }

        return (
            <div>
                {keysHelp}
                {buttonsLayer}
            </div>
        );
    }
}

import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';

import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdGpsFixed from 'react-icons/lib/md/gps-fixed'
import FaShield from 'react-icons/lib/fa/shield'

export default class ButtonsPanelSpaceRace extends React.Component {
    render() {
        let shieldValue = Math.floor((this.props.currentShield));
        return (
            <div>
                <button id='left' 	className='actionButton btnLeft_sp' 	{...this.props.customEvents}> 	<MdArrowUpward />		</button>
                <button id='right' 	className='actionButton btnRight_sp' 	{...this.props.customEvents}>	<MdArrowDownward />	</button>
                <button id='shoot' 	className='actionButton btnShoot_sp' 	{...this.props.customEvents}>	<MdGpsFixed />		</button>
                <button id='shield' 	className={(shieldValue <= 0) ? 'disabledButton btnShield_sp' : 'actionButton btnShield'}
                    {...this.props.customEvents}>	<FaShield />
                </button>
            </div>
        );
    }
}

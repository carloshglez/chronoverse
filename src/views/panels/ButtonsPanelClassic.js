import React from 'react';
import '../../styles/style.css';
import '../../styles/controlPanel.css';

import MdArrowBack from 'react-icons/lib/md/arrow-back'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowForward from 'react-icons/lib/md/arrow-forward'
import MdGpsFixed from 'react-icons/lib/md/gps-fixed'
import FaShield from 'react-icons/lib/fa/shield'

export default class ClassicButtonsPanel extends React.Component {
    render() {
        let shieldValue = Math.floor((this.props.currentShield));
        return (
            <div>
                <button id='left' className='actionButton btnLeft' 	{...this.props.customEvents}> 	<MdArrowBack />		</button>
                <button id='up' className='actionButton btnUp' 		{...this.props.customEvents}>	<MdArrowUpward />	</button>
                <button id='right' className='actionButton btnRight' 	{...this.props.customEvents}>	<MdArrowForward />	</button>
                <button id='shoot' className='actionButton btnShoot' 	{...this.props.customEvents}>	<MdGpsFixed />		</button>
                <button id='shield' className={(shieldValue <= 0) ? 'disabledButton btnShield' : 'actionButton btnShield'}
                    {...this.props.customEvents}>	<FaShield />
                </button>
            </div>
        );
    }
}

import React from 'react';
import './Loader.scss';
import cx from 'classnames';
import {assetUrl} from 'helpers/asset';

const Loader = props => {
    const {fullscreen} = props;
    const classNames = cx("loader", {
        "fullscreen": fullscreen
    })

    return (
        <div className={classNames}>
            <img src={assetUrl('/cinema.svg')} alt="loader" />
        </div>
    )
}

Loader.defaultProps = {
    fullscreen: true
}

export default Loader;
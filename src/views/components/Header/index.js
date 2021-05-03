import React from 'react';
import './Header.scss';
import {assetUrl} from 'helpers/asset';

const Header = props => {

    return (
        <div className="header">
            <a href="/"><img src={assetUrl('/logo-white.png')} alt="logo" /></a>
        </div>
    )
}

export default Header;
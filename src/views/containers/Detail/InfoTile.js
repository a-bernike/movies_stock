import React from 'react';

const InfoTile = props => {
    const {title, children} = props;

    if (!title) return null;
    return (
        <div className="detail-info-tile">
            <h6>{title}</h6> {children}
        </div>
    )
}

export default InfoTile;
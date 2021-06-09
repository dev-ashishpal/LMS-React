import React from 'react';
import './skeletonElement.css';

const skeletonElement = (props) => {
    // const type = props.type;
    // const skeletonClass = [classes.Skeleton, type];
    const classes = `Skeleton ${props.type}`;
    return (
        <div className={classes}>&nbsp;</div>
    )
};

export default skeletonElement;
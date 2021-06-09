import React from 'react';
import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.Spinner}>
        <div className={classes.DoubleBounce1}></div>
        <div className={classes.DoubleBounce2}></div>
    </div>
);

export default spinner;
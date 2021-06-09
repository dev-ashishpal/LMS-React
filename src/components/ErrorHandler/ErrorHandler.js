import React from 'react';

const errorHandler = (props) => (
    <div style={{textAlign: 'center', padding: "2rem 0", fontSize: '3rem'}}>{props.children}</div>
);

export default errorHandler;
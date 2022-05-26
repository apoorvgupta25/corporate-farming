import React from 'react';
import {Link} from 'react-router-dom';

import notfound from './assets/notfound.png';

const NotFound = () => {
    return (
        <div>
            <img src={notfound} style={imgStyle} alt=""/><br/><br/>
            <div className="d-flex justify-content-center">
                <Link to="/" className="btn btn-primary ">Back To Home</Link>
            </div>
        </div>

    )
}

const imgStyle = {
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '3%',
    borderRadius: '40px',
    width: '40vw',
};
export default NotFound;

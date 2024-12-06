import React from 'react';

import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
            <div>
                <h1>404 Error Page</h1>
                <p>Sorry This Page is Not Found</p>
               <Link to="/">Go Back Home</Link>
            </div>
        </>
    )
}

export default Error;
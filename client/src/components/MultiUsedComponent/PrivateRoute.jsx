import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CloudLoader } from '../../components';

const PrivateRoute = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate("/login");
        } else if (!authentication && authStatus) {
            navigate("/");
        } else {
            setLoader(false);
        }
    }, [authStatus, navigate, authentication]);

    return loader ? <CloudLoader /> : <>{children}</>;
};

export default PrivateRoute;
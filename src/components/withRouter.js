import {useLocation, useNavigate, useParams} from 'react-router-dom';

export const withRouter = (Component) => {
    console.log('With Route');
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return (
            <Component
                navigate={navigate}
                // location={location}
                {...props}
                // router={{location,navigate,params}}
            />
        );
    };

    return Wrapper;
};
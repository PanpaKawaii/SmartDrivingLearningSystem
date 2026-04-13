import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext/AuthContext.jsx';

const ROLE_HOME = {
    Admin: '/admin',
    Instructor: '/instructor',
};

export default function Require({ children, allowedRoles = [] }) {
    const { isLoading, user } = useAuth();

    if (isLoading) return null;

    if (!user) {
        return <Navigate to='/' replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.roleName)) {
        return <Navigate to={ROLE_HOME[user?.roleName] || '/'} replace />;
    }

    return children;
}
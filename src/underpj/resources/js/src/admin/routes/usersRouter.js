// import React from 'react';
import AdminCreateUsers from '../pages/AdminCreateUsers/index';
import AdminManageUsers from '../pages/AdminManageUsers/index';
import Login from '../pages/Login/index';

const usersRoutes = [
    {
        path: '/admin/create-users',
        exact: true,
        main: () => <AdminCreateUsers/>
    },
    {
        path: '/admin/users-manager',
        exact: true,
        main: () => <AdminManageUsers/>
    },
    {
        path: '/admin/login',
        exact: true,
        main: () => <Login/>
    }
]

export default usersRoutes;

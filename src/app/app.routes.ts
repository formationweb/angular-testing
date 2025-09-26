import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Login } from './login/login';
import { UserEdit } from './user-edit/user-edit';

export const routes: Routes = [
    {
        path: '',
        component: Users
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'user/:id',
        component: UserEdit
    }
];

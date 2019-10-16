import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home/home';
import Layout from './hoc/layout';
import BooksVeiw from './components/Books';

import Auth from './hoc/auth'
import User from './components/admin';
import Login from './containers/Admin/login';
import AddBook from './containers/Admin/add';
import UserPost from './components/admin/user_post';
import EditBook from './containers/Admin/edit';
import Register from './containers/Admin/register';
import Logout from './components/admin/logout';


class Routes extends Component{
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Auth(Home, null)} />
                    <Route path="/books/:id" exact component={Auth(BooksVeiw)} />
                    <Route path="/login" exact component={Auth(Login, false)} />
                    <Route path="/user" exact component={Auth(User, true)} />
                    <Route path="/user/add" exact component={Auth(AddBook, true)} />
                    <Route path="/user/user-reviews" exact component={Auth(UserPost, true)} />
                    <Route path="/user/register" exact component={Auth(Register, true)} />
                    <Route path="/user/edit-post/:id" exact component={Auth(EditBook, true)} />
                    <Route path="/logout" exact component={Auth(Logout, true)} />
                </Switch>
            </Layout>
        )
    }
}

export default Routes
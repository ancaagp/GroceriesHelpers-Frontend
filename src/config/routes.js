import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Register from '../components/Auth/Register/Register';
import Login from '../components/Auth/Login/Login';
import HomepageContainer from '../components/Main/HomepageContainer';
import ProfileContainer from '../components/ProfileContainer/ProfileContainer';
import About from '../components/Main/Home';
import Home from '../components/Main/Home';


const Routes = (props) => {
    return (
        <Switch>

            <Route
                exact path='/offerhelp'
                render={() =>
                    <HomepageContainer
                        userId={props.userId}
                        location={props.location}
                    />
                }
            />
            <Route
                exact path='/'
                component={Home}
            />

{/* 
            <Route
                exact path='/'
                render={ () =>
                    <HomepageContainer
                        userId={props.userId}
                        location={props.location}
                    />
                }
            />
            <Route
                exact path='/about'
                component={About}
            /> */}
            <Route
                path='/profile'
                render={
                    () => props.user ?
                        <ProfileContainer
                            userId={props.userId}
                        />
                        :
                        <Login login={props.login} />
                }
            />
            <Route
                path='/register'
                render={
                    () => props.user ?
                        <Redirect to="/" />
                        :
                        <Register register={props.register} />
                }
            />
            <Route
                path='/login'
                render={
                    () => props.user ?
                        <Redirect to="/" />
                        :
                        <Login login={props.login} />
                }
            />
        </Switch>
    )
}

export default Routes;
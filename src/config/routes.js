import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Register from '../components/Auth/Register/Register';
import Login from '../components/Auth/Login/Login';
import LoginRegister from '../components/Auth/LoginRegister';
import HomepageContainer from '../components/Main/HomepageContainer';
import ProfileContainer from '../components/ProfileContainer/ProfileContainer';
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

            <Route
                path='/profile'
                render={
                    () => props.user ?
                        <ProfileContainer
                            userId={props.userId}
                        />
                        :
                        <LoginRegister login={props.login} />
                }
            />

            {/* <Route
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
                        <Redirect to="/offerhelp" />
                        :
                        <Login login={props.login} />
                }
            /> */}

            <Route
                path='/loginregister'
                render={
                    () => props.user ?
                        <Redirect to="/offerhelp" />
                        :
                        <LoginRegister 
                            register={props.register}
                            login={props.login} />
                }
            />

        </Switch>
    )
}

export default Routes;
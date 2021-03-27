import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import PersonalPage from './pages/PersonalPage'

const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path={`/main`} exact>
                    <MainPage />
                </Route>
                <Route path={`/personal`} exact>
                    <PersonalPage />
                </Route>
                <Redirect to={`/main`} />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}

export default useRoutes;
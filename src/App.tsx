import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Authorization from './containers/Authorization/Authorization';
import { signOut } from './redux/actions/authenticationActions';

interface AppProps {
    isAuthenticated: boolean;
    signOutSync: any;
}

class App extends Component<AppProps> {
    componentDidMount() {
        window.gapi.load('auth2', function () {
            window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                })
                .then(
                    (auth2: any) => {
                        console.log('init OK', auth2);
                    },
                    (err: any) => {
                        console.log('error', err);
                    }
                );
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {this.props.isAuthenticated ? (
                        <>
                            <Route path="/" exact render={() => <h1>Main page</h1>} />
                            <Redirect to="/" />
                        </>
                    ) : (
                        <>
                            <Route path="/signin" component={Authorization} />
                            <Redirect to="/signin" />
                        </>
                    )}
                </Switch>
                <header className="App-header">
                    <button onClick={this.props.signOutSync}>Log out</button>
                </header>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        signOutSync: () => dispatch(signOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { signOut } from './redux/actions/authenticationActions';
import { About } from './components/About/About';
import { Layout } from './components/Layout/Layout';
import { Main } from './components/Main/Main';
import Authorization from './containers/Authorization/Authorization';
import { Report } from './containers/Report/Report';

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
                {this.props.isAuthenticated ? (
                    <>
                        <Layout signOut={this.props.signOutSync}>
                            <Switch>
                                <Route path="/" exact component={Main} />
                                <Route path="/about" component={About} />
                                <Route path="/report" component={Report} />
                                <Redirect to="/" />
                            </Switch>
                        </Layout>
                    </>
                ) : (
                    <>
                        <Switch>
                            <Route path="/signin" component={Authorization} />
                            <Redirect to="/signin" />
                        </Switch>
                    </>
                )}
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

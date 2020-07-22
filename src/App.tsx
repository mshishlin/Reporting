import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Authorization from './containers/Authorization/Authorization';
import QuarterDetailView from './containers/QuarterDetailView/QuarterDetailView';
import QuarterListView from './containers/QuarterListView/QuarterListView';
import ReportDetailView from './containers/ReportDetailView/ReportDetailView';
import ReportListView from './containers/ReportListView/ReportListView';
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
                {this.props.isAuthenticated ? (
                    <>
                        <Layout signOut={this.props.signOutSync}>
                            <Switch>
                                <Route path="/quarterlistview" exact component={QuarterListView} />
                                <Route path="/quarterdetailview/" exact component={QuarterDetailView} />
                                <Route path="/quarterdetailview/:year/:quarterNumber" component={QuarterDetailView} />
                                <Route path="/reportlistview" exact component={ReportListView} />
                                <Route path="/reportdetailview" exact component={ReportDetailView} />
                                <Route path="/reportdetailview/:year/:quarterNumber" component={ReportDetailView} />
                                <Redirect to="/reportlistview" />
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

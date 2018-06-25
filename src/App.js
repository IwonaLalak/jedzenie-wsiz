import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import HomeContainer from "./views/home/HomeContainer";
import LoginContainer from "./views/login/LoginContainer";
import NewOrderContainer from "./views/new_order/NewOrderContainer";
import RestaurantsContainer from "./views/restaurants/RestaurantsContainer";
import LoginService from "./views/login/LoginService";
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.common.Authorization = 'Basic ' + btoa('jedzenie' + ':' + 'jedzenie')

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderRoutes = this.renderRoutes.bind(this)
    }

    isUserLogged(){
        return Boolean(LoginService.getCurrentUser())
    }

    renderRoutes(props) {
        let links =  [
            {
                path: '/',
                exact: true,
                component: (props) => <HomeContainer {...props}/>,
                onEnter: true,
            },
            {
                path: '/login',
                exact: true,
                component: (props) => <LoginContainer {...props}/>,
                onEnter: true
            },
            {
                path: '/home',
                exact: true,
                component: (props) => <HomeContainer {...props}/>,
                onEnter: this.isUserLogged(),
            },
            {
                path: '/neworder',
                exact: true,
                component: (props) => <NewOrderContainer {...props}/>,
                onEnter: this.isUserLogged()
            },
            {
                path: '/restaurants',
                exact: true,
                component: (props) => <RestaurantsContainer {...props}/>,
                onEnter: this.isUserLogged()
            },
        ]

        return links.map(item=>{
            return <Route exact={Boolean(item.exact)} path={item.path}
                          render={(props) =>
                              Boolean(item.onEnter)?
                                  item.component(props) : <Redirect to={'/'}/>
                          }
            />
        })

    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {
                            this.renderRoutes(this.props)
                        }
                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;

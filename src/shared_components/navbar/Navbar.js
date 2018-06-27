import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import Config from "../../Config";
import {ButtonDef} from "../Buttons";
import LoginService from "../../views/login/LoginService";
import {Link} from "react-router-dom";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClickLogout = this.onClickLogout.bind(this)
    }

    onClickLogout(){
        LoginService.logout();
        this.props.history.push('/login')
    }

    render() {
        return (
            <div id={'main-navbar'}>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={2}>
                            <h5>
                                {Config.APP_NAME()}
                                <small>
                                    {Config.APP_VER()}
                                </small>
                            </h5>
                        </Col>
                        <Col xs={8}>
                            <ul>
                                <li>
                                    <Link to={'/'} className={(this.props.current ===1)?'current':''}><i className={'fa fa-bookmark'}></i><span>Dzisiejsze zamówienia</span></Link>
                                </li>
                                <li>
                                    <Link to={'/neworder'} className={(this.props.current ===2)?'current':''}><i className={'fa fa-plus'}></i><span>Nowe zamówienie</span></Link>
                                </li>
                                <li>
                                    <Link to={'/restaurants'} className={(this.props.current ===3)?'current':''}><i className={'fa fa-cutlery'}></i><span>Restauracje</span></Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={2}>
                            <div className={'pull-right'}>
                                <h5>
                                    <span style={{marginRight: '15px'}}>
                                       {Boolean(LoginService.getCurrentUser())? " Witaj, "+LoginService.getCurrentUser().login : ''}
                                    </span>
                                    <ButtonDef onClick={this.onClickLogout} icon={'fa fa-sign-out'} text={'Wyloguj się'} style={'default'} size={'xs'}/>
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
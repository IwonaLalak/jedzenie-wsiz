import React, {Component} from 'react';
import {Grid, Row, Col, Form, FormGroup, InputGroup, FormControl} from 'react-bootstrap'
import Config from "../../Config";
import {ButtonAction} from "../../shared_components/Buttons";
import If from "../../shared_components/If";
import LoginService from "./LoginService";

export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login:'',
            error:false
        };
        this.onClickLogin = this.onClickLogin.bind(this)
        this.onChangeLogin = this.onChangeLogin.bind(this)
        this.__onKeyPress = this.__onKeyPress.bind(this)
    }

    onChangeLogin(e){
        this.setState({login:e.target.value})
    }


    onClickLogin() {
        this.setState({error:false})
        if(this.state.login.length>0){
            let user = {
                login: this.state.login,
                usersession: LoginService.generateUserSessionID()
            }
            LoginService.login(user,this.props.history)

        }
        else{
            this.setState({error: true})
        }
    }

    __onKeyPress(e){
        if(e.key === 'Enter'){
            this.onClickLogin()
        }
    }

    render() {
        return (
            <div id={'login-page'}>
                <Grid fluid={false}>
                    <Row>
                        <Col xs={12} lg={6} lgOffset={3}>
                            <div id={'login-container'}>
                                <h1>{Config.APP_NAME()}
                                    <small>{Config.APP_VER()}</small>
                                </h1>

                                    <FormGroup>
                                        <Col xs={12} lg={9}>
                                            <InputGroup>
                                                <InputGroup.Addon>
                                                    <i className={'fa fa-user'}></i> User:
                                                </InputGroup.Addon>
                                                <FormControl type="text" onChange={this.onChangeLogin} onKeyPress={this.__onKeyPress}/>
                                            </InputGroup>
                                        </Col>
                                        <Col xs={12} lg={3}>
                                            <div className={'btn-container'}>
                                                <ButtonAction onClick={this.onClickLogin} text={'Zaloguj się'} icon={'fa fa-sign-in'}/>
                                            </div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <If isTrue={this.state.error}>
                                        <Col xs={12}>
                                            <span className={'login-error'}>
                                            <i className={'fa fa-exclamation-circle'}></i>
                                                Proszę uzupełnić login
                                            </span>
                                        </Col>
                                        </If>
                                    </FormGroup>

                                <div style={{clear: 'both', height: '1px'}}></div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

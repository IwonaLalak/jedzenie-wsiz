import React, {Component} from 'react';
import {Col, FormControl, Grid, Row} from "react-bootstrap";
import {Select} from "../../../shared_components/Select";
import {ButtonAction, ButtonAdd, ButtonDef, ButtonSave} from "../../../shared_components/Buttons";
import Utils from "../../../utils/Utils";
import If from "../../../shared_components/If";
import LoginService from "../../login/LoginService";

export default class NewOrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: null,
            time: '',
            order: '',
            error: null
        };
        this.onChangeRestaurant = this.onChangeRestaurant.bind(this)
        this.onChangeOrder = this.onChangeOrder.bind(this)
        this.onChangeTime = this.onChangeTime.bind(this)
        this.onClickSave = this.onClickSave.bind(this)
    }

    onChangeRestaurant(e) {
        this.setState({restaurant: e})
    }

    onChangeOrder(e) {
        if (e.target.value.length > 250) {
            Utils.findIdAndSetValue('orderInput', this.state.order)
        }
        else {
            this.setState({order: e.target.value})
        }
    }

    onChangeTime(e){
        this.setState({time:e.target.value})
    }

    onClickSave() {
        this.setState({error: null})

        if (Boolean(this.state.restaurant) && this.state.order.length > 0 && this.state.order.length < 251 && Boolean(this.state.time)) {

            let data = {
                "date": new Date().toJSON().substr(0, 10),
                "godz":this.state.time,
                "individualOrderList": [
                    {
                        "purchaser": LoginService.getCurrentUser().login,
                        "purchaserOrder": this.state.order
                    }
                ],
                "restaurantId": this.state.restaurant.restaurantId
            }

            this.props.handleSaveNewOrder(data);

        } else this.setState({error: 'Proszę proprawnie uzupełnić dane. Długość zamówienia nie może przekraczać 250 znaków.'})
    }

    renderRestaurantValue(val) {
        return <div>
            {val.restaurantName}
            <div className={'pull-right'}>
                <a href={'http://' + val.restaurantUrl} target={'_blank'}>
                    <ButtonDef onClick={() => {
                    }} text={'Pokaż menu'} icon={'fa fa-external-link'} size={'xs'}/>
                </a>
            </div>
        </div>
    }

    render() {
        return (
            <div className={'thumbnail'} style={{padding: '15px'}}>
                <Row>
                    <Col xs={12} lg={4}>
                        <h6>Wybierz restaurację</h6>
                        <Select onChange={this.onChangeRestaurant}
                                value={this.state.restaurant}
                                options={this.props.restaurants}
                                valueKey={'restaurantId'}
                                labelKey={'restaurantName'}
                                valueRenderer={this.renderRestaurantValue}
                        />
                    </Col>
                    <Col xs={12} lg={8}>
                        <h6>Wybierz godzinę, do której będą zbierane zamówienia</h6>
                        <div style={{display: 'inline-block', width: '150px'}}>
                            <FormControl type={'time'} id={'inputTime'} onChange={this.onChangeTime}/>
                        </div>
                        <i className={'fa fa-clock-o'} style={{marginLeft: '10px'}}></i>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h6>Dodaj treść zamówienia</h6>
                        <textarea className={'form-control'} style={{minHeight: '150px'}} onChange={this.onChangeOrder} id={'orderInput'}></textarea>
                    </Col>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Col xs={12} lg={8}>
                        <If isTrue={Boolean(this.state.error)}>
                            <span style={{color: 'firebrick'}}><i className={'fa fa-exclamation-circle'}></i> {this.state.error}</span>
                        </If>
                    </Col>
                    <Col xs={12} lg={4}>
                        <div className={'pull-right'}>
                            <ButtonSave onClick={this.onClickSave}/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
import React, {Component} from 'react';
import {Col, FormControl, Grid, Row} from "react-bootstrap";
import {ButtonDef, ButtonPointDelete} from "../../../shared_components/Buttons";
import LoginService from "../../login/LoginService";
import If from "../../../shared_components/If";
import IndividualForm from "./IndividualForm";
import IndividualOrdersService from "../../../services/IndividualOrdersService";
import OrdersService from "../../../services/OrdersService";


export default class HomeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
        this.renderRestaurantName = this.renderRestaurantName.bind(this)
        this.renderIndividualOrders = this.renderIndividualOrders.bind(this)
        this.checkIfSomeoneAlreadyAddOrder = this.checkIfSomeoneAlreadyAddOrder.bind(this)
        this.onClickSaveIndividualOrder = this.onClickSaveIndividualOrder.bind(this)
        this.onClickDeleteIndividualOrder = this.onClickDeleteIndividualOrder.bind(this)
        this.onClickDeleteOrder = this.onClickDeleteOrder.bind(this)
    }

    componentDidMount() {
    }

    renderRestaurantName() {
        let restaurant = this.props.restaurants.find(r => r.restaurantId === this.props.order.restaurantId)
        if (Boolean(restaurant)) return restaurant.restaurantName
    }

    onClickDeleteOrder() {
        if (window.confirm('Czy na pewno chcesz usunąć całe zamówienie?')) {
            OrdersService.deleteOrder(this.props.order.orderId).then(function (response) {
                this.props.handleRefreshDataAfterDeletingOrder()
            }.bind(this))
        }
    }

    onClickSaveIndividualOrder(order) {
        let data = {
            "purchaser": LoginService.getCurrentUser().login,
            "purchaserOrder": order
        }
        console.log(data)
        IndividualOrdersService.addIndividualOrder(this.props.order.orderId, data).then(function (response) {
            if (response.status < 300) {
                //todo notyfikacja
                this.props.handleRefreshData();
            }
        }.bind(this))
    }

    onClickDeleteIndividualOrder(order){
        if (window.confirm('Czy na pewno chcesz usunąć swoje zamówienie?')) {
            IndividualOrdersService.deleteIndividualOrder(order.individualOrderId).then(function (response) {
                console.log(response)
                if (response.status < 300) {
                    //todo notyfikacja
                    // todo rest nie dziala - meczyc konrada o naprawe
                    this.props.handleRefreshData();
                }
            }.bind(this))
        }
    }

    checkIfSomeoneAlreadyAddOrder() {
        return Boolean(this.props.order.individualOrderList.find(item => (item.purchaser === LoginService.getCurrentUser().login)))
    }

    renderIndividualOrders() {
        return this.props.order.individualOrderList.map((item, index) => {
            return (
                <div className={'individualItem'}>
                    <Row>
                        <Col xs={3} lg={2}>
                            {item.purchaser}
                        </Col>
                        <Col xs={7} lg={9}>
                            {item.purchaserOrder}
                        </Col>
                        <Col xs={2} lg={1}>
                            <If isTrue={(LoginService.getCurrentUser().login === item.purchaser) && (index !== 0)}>
                                <div className={'pull-right'}>
                                    <ButtonPointDelete onClick={() => this.onClickDeleteIndividualOrder(item)}
                                                       title={'Usuń swoje zamówienie'}/>
                                </div>
                            </If>
                        </Col>
                    </Row>
                </div>
            )
        })
    }

    render() {
        return (
            Boolean(this.props.order) ?
                <div className={'orderTabContent'}>
                    <Row>
                        <Col xs={12}>
                            <h1>
                                {this.renderRestaurantName()}
                            </h1>
                            <h2>
                                <span title={'Godzina, do której zbierane są zamówienia'}>
                                    <i className={'fa fa-clock-o'}></i> {this.props.order.godz}
                                </span>
                                <span title={'Osoba, która założyła zamówienie'}>
                                    <i className={'fa fa-user'}></i> {this.props.order.individualOrderList[0].purchaser}
                                </span>
                            </h2>
                            <If isTrue={LoginService.getCurrentUser().login === this.props.order.individualOrderList[0].purchaser}>
                                <div className={'pull-right'}>
                                    <ButtonDef onClick={this.onClickDeleteOrder} text={'Usuń zamówienie'} icon={'fa fa-times'} style={'default'}
                                               customstyle={{color: 'firebrick', marginTop: '15px'}}/>
                                </div>
                            </If>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className={'individualOrdersContainer'}>
                                <div className={'individualItem'}>
                                    <Row>
                                        <Col xs={3} lg={2}>
                                            Osoba
                                        </Col>
                                        <Col xs={7} lg={9}>
                                            Zamówienie
                                        </Col>
                                        <Col xs={2} lg={1}>

                                        </Col>
                                    </Row>
                                </div>
                                {this.renderIndividualOrders()}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {
                                Boolean(this.checkIfSomeoneAlreadyAddOrder()) ?
                                    <div id={'orderAlreadyAdded'}>Twoje zamówienie zostało już dodane!</div>
                                    :
                                    <IndividualForm handleClickSave={this.onClickSaveIndividualOrder}/>
                            }
                        </Col>
                    </Row>
                </div>
                :
                <div>
                    Wystąpil problem z dostepem do danych
                </div>
        );
    }
}
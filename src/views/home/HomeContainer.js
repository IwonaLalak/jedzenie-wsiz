import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";
import OrdersService from "../../services/OrdersService";
import {Col, Grid, Row, Tab, Tabs} from "react-bootstrap";
import HomeTab from "./components/HomeTab";
import RestaurantService from "../../services/RestaurantService";


export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:[],
            restaurants:[],
        };
        this.renderTabs = this.renderTabs.bind(this)
    }

    componentDidMount(){
        this.getTodayOrders()
        this.getRestaurants()
    }

    getRestaurants(){
        RestaurantService.getRestaurants().then(function (response) {
            this.setState({restaurants:response.data})
        }.bind(this))
    }

    getTodayOrders(){
        OrdersService.getOrders().then(function (response) {
            this.setState({orders:response.data})
        }.bind(this))
    }

    renderTabTitle(order){
        let restaurant = this.state.restaurants.find(r=>r.restaurantId===order.restaurantId)
        if(Boolean(restaurant)){
            return (
                <div className={'orderTabTitle'}>
                    <h1>{restaurant.restaurantName}</h1>
                    <h2>
                        <span>
                        <i className={'fa fa-clock-o'} title={'Godzina, do której zbierane są zamówienia'}></i> {order.godz}
                        </span>
                        <span>
                        <i className={'fa fa-user'} title={'Osoba, która założyła zamówienie'}></i> {order.individualOrderList[0].purchaser}
                        </span>
                    </h2>
                </div>
            )
        } else return (
            <div className={'orderTabTitle'}>
                <h1>Zamówienie {order.restaurantId}</h1>
                <h2>
                        <span>
                        <i className={'fa fa-clock-o'} title={'Godzina, do której zbierane są zamówienia'}></i> {order.godz}
                        </span>
                        <span>
                        <i className={'fa fa-user'} title={'Osoba, która założyła zamówienie'}></i> {order.individualOrderList[0].purchaser}
                        </span>
                </h2>
            </div>
        )
    }

    renderTabs(){
        if(this.state.orders.length>0){
            return this.state.orders.map(order=>{
                return(
                    <Tab eventKey={1} title={this.renderTabTitle(order)}>
                        <HomeTab order={order}/>
                    </Tab>
                )
            })
        }
        else
            return (
                <Tab eventKey={1} title="Brak zamówień na dziś">
                Nikt nie złożył dzisiaj jeszcze zamówienia - bądź pierwszy
                </Tab>
            )
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} current={1}/>
                <div id={'main-content'}>
                    <Grid fluid={false} id={'HomeContainer'}>
                        <Row>
                            <Col xs={12}>
                                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                    {
                                        this.renderTabs()
                                    }
                                </Tabs>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}
import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";
import OrdersService from "../../services/OrdersService";
import {Col, Grid, Row, Tab, Tabs} from "react-bootstrap";
import HomeTab from "./components/HomeTab";
import RestaurantService from "../../services/RestaurantService";
import {Link} from "react-router-dom";


export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:[],
            restaurants:[],
            activeKey:0
        };
        this.renderTabs = this.renderTabs.bind(this)
        this.getTodayOrders = this.getTodayOrders.bind(this)
        this.onDeleteOrder = this.onDeleteOrder.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
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


    onDeleteOrder(){
        this.getTodayOrders()
        this.setState({ activeKey:0 });
    }

    handleSelect(key) {
        this.setState({ activeKey:key });
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
            return this.state.orders.map((order,index)=>{
                return(
                    <Tab eventKey={index} title={this.renderTabTitle(order)}>
                        <HomeTab order={order} restaurants={this.state.restaurants}
                                 handleRefreshData={this.getTodayOrders}
                                 handleRefreshDataAfterDeletingOrder={this.onDeleteOrder}
                                 {...this.props}
                        />
                    </Tab>
                )
            })
        }
        else
            return (
                <Tab eventKey={0} title="Brak zamówień na dziś">
                    <h1 id={'noOrdersAlert'}>
                        <div>
                        Nikt nie złożył dzisiaj jeszcze zamówienia
                        </div>
                        <Link to={'/neworder'}>bądź pierwszy <i className={'fa fa-cutlery'}></i></Link>
                    </h1>
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
                                <Tabs activeKey={this.state.activeKey} id="tab-orders"
                                      onSelect={this.handleSelect}>
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
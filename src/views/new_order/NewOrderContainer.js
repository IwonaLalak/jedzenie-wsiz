import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";
import {Col, Grid, Row} from "react-bootstrap";
import NewOrderForm from "./components/NewOrderForm";
import RestaurantService from "../../services/RestaurantService";
import OrdersService from "../../services/OrdersService";

export default class NewOrderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        };
        this.onClickSaveNewOrder = this.onClickSaveNewOrder.bind(this)
    }

    componentDidMount() {
        this.getAllRestaurants();
    }

    getAllRestaurants() {
        RestaurantService.getRestaurants().then(function (response) {
            this.setState({restaurants: response.data})
        }.bind(this))
    }

    onClickSaveNewOrder(obj) {
        OrdersService.addOrder(obj).then(function (response) {
            console.log(response)
            if (response.status < 300)
                this.props.history.push('/')
        }.bind(this))
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} current={2}/>
                <div id={'main-content'}>
                    <Grid fluid={false}>
                        <Row>
                            <Col xs={12}>
                                <NewOrderForm restaurants={this.state.restaurants} handleSaveNewOrder={this.onClickSaveNewOrder}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}
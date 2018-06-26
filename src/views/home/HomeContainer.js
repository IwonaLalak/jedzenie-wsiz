import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";
import OrdersService from "../../services/OrdersService";
import {Col, Grid, Row} from "react-bootstrap";


export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:[]
        };
    }

    componentDidMount(){
        this.getTodayOrders()
    }

    getTodayOrders(){
        OrdersService.getOrders().then(function (response) {
            this.setState({orders:response.data})
        }.bind(this))
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} current={1}/>
                <div id={'main-content'}>
                    <Grid fluid={false}>
                        <Row>
                            <Col xs={12}>

home
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}
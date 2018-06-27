import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";


export default class HomeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:[]
        };
    }

    componentDidMount(){
    }


    render() {
        return (
            <div>
                order {this.props.order.orderId}
            </div>
        );
    }
}
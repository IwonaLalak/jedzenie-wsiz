import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";
import {Col, Row, Grid} from "react-bootstrap";
import {ButtonAdd} from "../../shared_components/Buttons";
import RestaurantsForm from "./components/RestaurantsForm";

export default class RestaurantsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm:false,
        };
    }

    closeForm(){
        this.setState({
            showForm:false,
        })
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} current={3}/>
                <div id={'main-content'}>
                    <Grid fluid={false}>
                        <Row>
                            <Col xs={12}>

                            </Col>
                            <Col xs={12}>
                                <div className={'pull-right'}>
                                    <ButtonAdd onClick={()=>{this.setState({showForm:true})}}/>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <RestaurantsForm handleClickCancel={this.closeForm}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>

            </div>
        );
    }
}
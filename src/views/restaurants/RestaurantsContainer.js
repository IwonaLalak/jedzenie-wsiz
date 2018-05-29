import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";
import {Col, Row, Grid} from "react-bootstrap";
import {ButtonAdd} from "../../shared_components/Buttons";
import RestaurantsForm from "./components/RestaurantsForm";
import RestaurantsTable from "./components/RestaurantsTable";
import RestaurantService from "../../services/RestaurantService";

export default class RestaurantsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants:[],
            showForm:false,
        };
        this.onClickSave = this.onClickSave.bind(this)
    }

    componentDidMount(){
        this.getRestaurants();
    }

    getRestaurants(){
        RestaurantService.getRestaurants().then(function (response) {
            console.log(response)
            this.setState({restaurants:response.data})
        }.bind(this))
    }

    closeForm(){
        this.setState({
            showForm:false,
        })
    }

    onClickSave(obj,isEdition){
        console.log(obj)
        if(isEdition){

        }
        else{
            RestaurantService.addRestaurant(obj).then(function (response) {
                if(response){
                    if(response.status<300){
                        // todo notyfikacja
                        this.getRestaurants()
                    }
                }
            }.bind(this))
        }
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} current={3}/>
                <div id={'main-content'}>
                    <Grid fluid={false}>
                        <Row>
                            <Col xs={12}>
                                <RestaurantsTable data={this.state.restaurants}/>
                            </Col>
                            <Col xs={12}>
                                <div className={'pull-right'}>
                                    <ButtonAdd onClick={()=>{this.setState({showForm:true})}}/>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <RestaurantsForm handleClickCancel={this.closeForm} handleClickSave={this.onClickSave}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>

            </div>
        );
    }
}
import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";
import {Col, Row, Grid} from "react-bootstrap";
import {ButtonAdd} from "../../shared_components/Buttons";
import RestaurantsForm from "./components/RestaurantsForm";
import RestaurantsTable from "./components/RestaurantsTable";
import RestaurantService from "../../services/RestaurantService";
import If from "../../shared_components/If";

export default class RestaurantsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            editedRestaurant: null,
            showForm: false,
        };
        this.onClickSave = this.onClickSave.bind(this)
        this.onClickEdit = this.onClickEdit.bind(this)
        this.onClickDelete = this.onClickDelete.bind(this)
        this.closeForm = this.closeForm.bind(this)
    }

    componentDidMount() {
        this.getRestaurants();
    }

    getRestaurants() {
        RestaurantService.getRestaurants().then(function (response) {
            if (response)
                this.setState({restaurants: response.data})
        }.bind(this))
    }

    closeForm() {
        this.setState({
            showForm: false,
            editedRestaurant: null
        })
    }

    onClickSave(obj, isEdition) {
        console.log(obj)
        if (isEdition) {
            obj = Object.assign(obj, {restaurantId:this.state.editedRestaurant.restaurantId})

            RestaurantService.editRestaurant(this.state.editedRestaurant.restaurantId, obj).then(function (response) {
                if (response) {
                    if (response.status < 300) {
                        // todo notyfikacja
                        this.getRestaurants()
                        this.closeForm();
                    }
                }
            }.bind(this))
        }
        else {
            RestaurantService.addRestaurant(obj).then(function (response) {
                if (response) {
                    if (response.status < 300) {
                        // todo notyfikacja
                        this.getRestaurants()
                        this.closeForm();
                    }
                }
            }.bind(this))
        }
    }

    onClickEdit(obj) {
        this.setState({editedRestaurant: obj, showForm: true});
    }

    onClickDelete(obj) {
        if (window.confirm('Czy chcesz usunac restauracje ' + obj.restaurantName + '?')) {
            RestaurantService.deleteRestaurant(obj.restaurantId).then(function (response) {
                if (response) {
                    if (response.status < 300) {
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
                                <RestaurantsTable data={this.state.restaurants}
                                                  handleClickEdit={this.onClickEdit}
                                                  handleClickDelete={this.onClickDelete}/>
                            </Col>
                            <If isTrue={!this.state.showForm}>
                                <Col xs={12}>
                                    <div className={'pull-right'}>
                                        <ButtonAdd onClick={() => {
                                            this.setState({showForm: true})
                                        }}/>
                                    </div>
                                </Col>
                            </If>
                            <If isTrue={this.state.showForm}>
                                <RestaurantsForm handleClickCancel={this.closeForm} handleClickSave={this.onClickSave}
                                                 editedRestaurant={this.state.editedRestaurant}/>
                            </If>
                        </Row>
                    </Grid>
                </div>

            </div>
        );
    }
}
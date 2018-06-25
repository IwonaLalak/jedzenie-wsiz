import React, {Component} from 'react';
import {ButtonToolbar, Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {ButtonSave, ButtonCancel} from "../../../shared_components/Buttons";
import Utils from "../../../utils/Utils";
import If from "../../../shared_components/If";

export default class RestaurantsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            hasError: null
        };
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeUrl = this.onChangeUrl.bind(this)
        this.onClickSave = this.onClickSave.bind(this)
    }

    componentDidMount() {
        if (this.props.editedRestaurant) {
            this.setState({
                name: this.props.editedRestaurant.restaurantName,
                url: this.props.editedRestaurant.restaurantUrl,
            })
            Utils.findIdAndSetValue('nameInput', this.props.editedRestaurant.restaurantName)
            Utils.findIdAndSetValue('urlInput', this.props.editedRestaurant.restaurantUrl)
        }
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.editedRestaurant) {
            this.setState({
                name: nextprops.editedRestaurant.restaurantName,
                url: nextprops.editedRestaurant.restaurantUrl,
            })
            Utils.findIdAndSetValue('nameInput', nextprops.editedRestaurant.restaurantName)
            Utils.findIdAndSetValue('urlInput', nextprops.editedRestaurant.restaurantUrl)
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeUrl(e) {
        this.setState({
            url: e.target.value
        })
    }

    onClickSave() {
        this.setState({
            hasError: null
        })
        if (!this.state.name.length > 0 || !this.state.url.length > 0) {
            this.setState({hasError: 'Nie uzupełniono danych'})
        }
        else if (!Utils.validateUrl(this.state.url)) {
            this.setState({hasError: 'Niepoprawny URL'})
        }
        else {
            let data = {
                "restaurantName": this.state.name,
                "restaurantUrl": this.state.url,
            }

            this.props.handleClickSave(data, this.props.editedRestaurant)
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Col xs={12} lg={4}>
                            <FormControl placeholder={'Nazwa restauracji'} onChange={this.onChangeName} id={'nameInput'}/>
                        </Col>
                        <Col xs={12} lg={4}>
                            <FormControl type={'url'} placeholder={'Url do menu'} onChange={this.onChangeUrl} id={'urlInput'}/>
                        </Col>
                        <Col xs={12} lg={4}>
                            <ButtonToolbar>
                                <ButtonCancel onClick={() => {
                                    this.props.handleClickCancel()
                                }}/>
                                <ButtonSave onClick={this.onClickSave}/>
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col xs={12}>
                            <If isTrue={Boolean(this.state.hasError)}>
                                <div style={{color: 'firebrick'}}>
                                    <i className={'fa fa-exclamation-circle'}></i> {this.state.hasError}
                                </div>
                            </If>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
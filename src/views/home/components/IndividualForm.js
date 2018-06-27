import React, {Component} from 'react';
import {Col, Form, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import Utils from "../../../utils/Utils";
import {ButtonSave} from "../../../shared_components/Buttons";


export default class IndividualForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order:''
        };
        this.onChangeOrder=this.onChangeOrder.bind(this)
        this.onClickAdd=this.onClickAdd.bind(this)
    }

    componentDidMount() {
    }

    onChangeOrder(e) {
        if (e.target.value.length > 250) {
            Utils.findIdAndSetValue('orderInput', this.state.order)
        }
        else {
            this.setState({order: e.target.value})
        }
    }

    onClickAdd(){
        if(this.state.order.length>0){
            this.props.handleClickSave(this.state.order);
            Utils.findIdAndSetValue('orderInput','')
        }
    }

    render() {
        return (
            <div style={{marginTop:'30px'}}>
                <Form>
                    <FormGroup>
                        <h6>Podaj treść swojego zamówienia</h6>
                        <textarea className={'form-control'} style={{height:'100px'}} id={'orderInput'} onChange={this.onChangeOrder}>
                        </textarea>
                    </FormGroup>
                    <FormGroup>
                        <Col xs={12}>
                            <div className={'pull-right'}>
                                <ButtonSave onClick={this.onClickAdd} text={'Dodaj zamówienie'} disabled={this.state.order.length===0}/>
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
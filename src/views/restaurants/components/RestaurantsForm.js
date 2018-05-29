import React, {Component} from 'react';
import {ButtonToolbar, Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {ButtonSave, ButtonCancel} from "../../../shared_components/Buttons";

export default class RestaurantsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Col xs={12} lg={4}>
                            <FormControl placeholder={'Nazwa restauracji'}/>
                        </Col>
                        <Col xs={12} lg={4}>
                            <FormControl type={'url'} placeholder={'Url do menu'} />
                        </Col>
                        <Col xs={12} lg={4}>
                            <ButtonToolbar>
                                <ButtonCancel onClick={()=>{this.props.handleClickCancel()}}/>
                                <ButtonSave onClick={this.onClickSave} />
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
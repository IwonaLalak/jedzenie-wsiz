import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";

export default class NewOrderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} current={2}/>
                <div id={'main-content'}>

                    new order


                </div>
            </div>
        );
    }
}
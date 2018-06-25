import React, {Component} from 'react';
import Navbar from "../../shared_components/navbar/Navbar";


export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        //console.log(this.props.history)
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} current={1}/>
                <div id={'main-content'}>

                    home


                </div>
            </div>
        );
    }
}
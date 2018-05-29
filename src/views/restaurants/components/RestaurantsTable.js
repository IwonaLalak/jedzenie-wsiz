import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'


export default class RestaurantsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.renderButtons = this.renderButtons.bind(this)
    }

    formatID(cell,row){
        return <span className={'label label-default'}>{cell}</span>
    }

    formatUrl(cell,row){
        return <a href={cell}>{cell}</a>
    }

    renderButtons(cell,row){

    }

    render() {
        return (
            <div>
                <BootstrapTable data={this.props.data}
                                hover
                >
                    <TableHeaderColumn dataField='restaurantId' isKey
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                                       dataFormat={this.formatID}
                    >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='restaurantName'
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                    >Nazwa restauracji</TableHeaderColumn>
                    <TableHeaderColumn dataField='restaurantUrl'
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                                       dataFormat={this.formatUrl}
                    >URL do menu</TableHeaderColumn>
                    <TableHeaderColumn dataField='restaurantId'
                                       dataFormat={this.renderButtons}
                    >Akcje</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
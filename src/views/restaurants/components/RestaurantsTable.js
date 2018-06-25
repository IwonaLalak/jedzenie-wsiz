import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {ButtonToolbar} from "react-bootstrap";
import {ButtonPointDelete, ButtonPointEdit} from "../../../shared_components/Buttons";


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
        return <ButtonToolbar>
            <ButtonPointEdit onClick={()=>this.props.handleClickEdit(row)} title={'Edytuj pozycję'}/>
            <ButtonPointDelete onClick={()=>this.props.handleClickDelete(row)} title={'Usuń pozycję'}/>
        </ButtonToolbar>
    }

    render() {
        return (
            <div style={{marginBottom:'15px'}}>
                <BootstrapTable data={this.props.data}
                                hover
                >
                    <TableHeaderColumn dataField='restaurantId' isKey
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                                       dataFormat={this.formatID}
                                       thStyle={{width:'10%'}} tdStyle={{width:'10%'}}
                    >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='restaurantName'
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                                       thStyle={{width:'35%'}} tdStyle={{width:'35%'}}
                    >Nazwa restauracji</TableHeaderColumn>
                    <TableHeaderColumn dataField='restaurantUrl'
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                                       thStyle={{width:'40%'}} tdStyle={{width:'40%'}}
                                       dataFormat={this.formatUrl}
                    >URL do menu</TableHeaderColumn>
                    <TableHeaderColumn dataField='restaurantId'
                                       thStyle={{width:'15%'}} tdStyle={{width:'15%'}}
                                       dataFormat={this.renderButtons}
                    >Akcje</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
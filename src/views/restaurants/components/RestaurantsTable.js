import React, {Component} from 'react';


export default class RestaurantsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.renderButtons = this.renderButtons.bind(this)
    }

    formatID(cell,row){

    }

    formatUrl(cell,row){

    }

    renderButtons(cell,row){

    }

    render() {
        return (
            <div>
                <BootstrapTable data={this.props.data}
                                hover
                >
                    <TableHeaderColumn dataField='idPro' isKey thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                    >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='dataOd'
                                       thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                                       dataFormat={this.renderRodzajZnizki}
                    >Nazwa restauracji</TableHeaderColumn>
                    <TableHeaderColumn dataField='dataOd'
                                       thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={{type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}}
                                       dataFormat={this.renderRodzajZnizki}
                    >URL do menu</TableHeaderColumn>
                    <TableHeaderColumn dataField='dataOd'
                                       thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       dataFormat={this.renderButtons}
                    >Akcje</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
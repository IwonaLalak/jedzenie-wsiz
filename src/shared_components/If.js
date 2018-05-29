import React from 'react';
import PropTypes from 'prop-types';

export default class TopIf extends React.Component {
    static propTypes = {
        isTrue: PropTypes.bool.isRequired
    }

    render() {
        if (this.props.isTrue) {
            return this.props.children;
        } else {
            return false;
        }
    }
}

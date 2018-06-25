import React from 'react';
import InputSelect from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

export const Select = (props) => {
    return (
        <InputSelect
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            options={props.options}
            disabled={props.disabled}
            valueRenderer={props.valueRenderer}
            optionRenderer={props.optionRenderer}
            style={props.style}
            className={props.className}
            valueKey={props.valueKey}
            labelKey={props.labelKey}
            placeholder={props.placeholder}
            clearable={props.clearable}
            multi={props.multi}
        />
    );
};

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style:PropTypes.object,
    valueRenderer: PropTypes.func,
    optionRenderer: PropTypes.func,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    clearable:PropTypes.bool,
    multi:PropTypes.bool,
};

Select.defaultProps = {
    disabled: false,
    name: 'form-field-name',
    placeholder: 'Wybierz...',
    clearable:true,
    multi:false,
};

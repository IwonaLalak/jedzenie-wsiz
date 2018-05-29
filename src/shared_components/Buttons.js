import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ButtonDef = (props) => {
    return (
        <Button
            onClick={props.onClick}
            bsSize={props.size}
            bsStyle={props.style}
            style={{...props.customstyle}}
            block={props.block}
            disabled={props.disabled}
        >
            {
                Boolean(props.icon)? <i className={props.icon} style={{marginRight:'7px'}}></i> : ''
            }
            {props.text}
        </Button>
    );
};

ButtonDef.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    icon: PropTypes.any,
    size: PropTypes.string,
    style: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    customstyle: PropTypes.string,
};

ButtonDef.defaultProps = {
    text: 'Button',
    icon:false,
    style: 'primary',
    block:false,
    disabled:false,
};

export const ButtonAdd = (props) => {
    return (
        <Button
            onClick={props.onClick}
            bsSize={props.size}
            bsStyle={'success'}
            style={{...props.customstyle}}
            block={props.block}
            disabled={props.disabled}
        >
            <i className={"fa fa-plus"} style={{marginRight:'7px'}}></i>
            {props.text}
        </Button>
    );
};

ButtonAdd.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    customstyle: PropTypes.string,
};

ButtonAdd.defaultProps = {
    text: 'Dodaj',
    block:false,
    disabled:false,
};

export const ButtonSave = (props) => {
    return (
        <Button
            onClick={props.onClick}
            bsSize={props.size}
            bsStyle={'primary'}
            style={{...props.customstyle}}
            block={props.block}
            disabled={props.disabled}
        >
            <i className={"fa fa-save"} style={{marginRight:'7px'}}></i>
            {props.text}
        </Button>
    );
};

ButtonSave.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    customstyle: PropTypes.string,
};

ButtonSave.defaultProps = {
    text: 'Zapisz',
    block:false,
    disabled:false,
};

export const ButtonCancel = (props) => {
    return (
        <Button
            onClick={props.onClick}
            bsSize={props.size}
            bsStyle={'default'}
            style={{background:'#eee', ...props.customstyle}}
            block={props.block}
            disabled={props.disabled}
        >
            <i className={"fa fa-times"} style={{marginRight:'7px'}}></i>
            {props.text}
        </Button>
    );
};

ButtonCancel.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    customstyle: PropTypes.string,
};

ButtonCancel.defaultProps = {
    text: 'Anuluj',
    block:false,
    disabled:false,
};

export const ButtonAction = (props) => {
    return (
        <Button
            onClick={props.onClick}
            bsSize={props.size}
            bsStyle={'info'}
            style={{...props.customstyle}}
            block={props.block}
            disabled={props.disabled}
        >
            <i className={props.icon} style={{marginRight:'7px'}}></i>
            {props.text}
        </Button>
    );
};

ButtonAction.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    customstyle: PropTypes.string,
    icon: PropTypes.string,
};

ButtonAction.defaultProps = {
    text: 'Wyszukaj',
    block:false,
    disabled:false,
    icon:'fa fa-search'
};

export const ButtonPointEdit = (props) => {
    return (
        <Button
            onClick={props.onClick}
            bsSize={props.size}
            bsStyle={'default'}
            style={{color: '#d58512',...props.customstyle}}
            block={props.block}
            disabled={props.disabled}
            title={props.title}
        >
            <i className={"fa fa-pencil"}></i>
        </Button>
    );
};

ButtonPointEdit.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    customstyle: PropTypes.string,
};

ButtonPointEdit.defaultProps = {
    title: 'Edytuj',
    block:false,
    disabled:false,
};

export const ButtonPointDelete = (props) => {
    return (
        <Button
            onClick={props.onClick}
            bsSize={props.size}
            bsStyle={'default'}
            style={{color: '#c9302c',...props.customstyle}}
            block={props.block}
            disabled={props.disabled}
            title={props.title}
        >
            <i className={"fa fa-times"}></i>
        </Button>
    );
};

ButtonPointDelete.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    customstyle: PropTypes.string,
};

ButtonPointDelete.defaultProps = {
    title: 'Usuń',
    block:false,
    disabled:false,
};

export const ButtonPointAction = (props) => {
    return (
        <Button
            onClick={props.onClick}
            bsSize={props.size}
            bsStyle={'default'}
            style={{color: '#333',...props.customstyle}}
            block={props.block}
            disabled={props.disabled}
            title={props.title}
        >
            <i className={props.icon}></i>
        </Button>
    );
};

ButtonPointAction.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    customstyle: PropTypes.string,
};

ButtonPointAction.defaultProps = {
    title: 'Akcja',
    block:false,
    disabled:false,
};

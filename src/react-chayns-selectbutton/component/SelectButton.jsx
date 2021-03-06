/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class SelectButton extends React.Component {
    static propTypes = {
        onSelect: PropTypes.func,
        title: PropTypes.string,
        description: PropTypes.string,
        label: PropTypes.string,
        list: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
        listKey: PropTypes.string.isRequired,
        listValue: PropTypes.string.isRequired,
        multiSelect: PropTypes.bool,
        quickFind: PropTypes.bool,
        className: PropTypes.string,
        showSelection: PropTypes.bool,
    };

    static defaultProps = {
        quickFind: false,
        multiSelect: false,
        title: 'Select Dialog',
        description: 'Please select an item',
        label: 'Select',
        showSelection: true,
        className: null,
        onSelect: null,
    };

    static getDialogList(_list, listKey, listValue) {
        const list = [];

        if (_list) {
            _list.map((item, i) => {
                const curListKey = listKey || i;
                if (item[curListKey] && item[listValue]) {
                    list.push({ name: item[listValue], value: item[curListKey], isSelected: !!item.isSelected });
                }
            });
        }

        return list;
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/no-unused-state
            selected: []
        };

        this.onClick = this.onClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(selected) {
        const { onSelect } = this.props;
        const { selection } = selected;

        if(selection.length === 1) {
            this.setLabel(selection[0].name);
        }

        if(onSelect) {
            onSelect(this.getReturnList(selected));
        }
    }

    onClick() {
        const {
            quickFind,
            multiSelect,
            title,
            description,
            list,
            listKey,
            listValue,
        } = this.props;
        const _list = SelectButton.getDialogList(list, listKey, listValue);

        chayns.dialog.select({
            title,
            message: description,
            quickfind: quickFind,
            multiselect: multiSelect,
            list: _list
        }).then((selected) => {
            this.onSelect(selected);
        }).catch((e) => {
            console.error(e);
        });
    }

    getReturnList(selected) {
        const { list, listKey } = this.props;
        const { buttonType, selection: selectedItems } = selected;
        const result = [];

        selectedItems.map((item) => {
            list.map((listItem) => {
                if (listItem[listKey] === item.value) result.push(listItem);
            });
        });
        return { buttonType, selection: result };
    }

    setLabel(text) {
        if (this.props.showSelection) {
            this._btn.innerText = text;
        }
    }

    render() {
        const { className, label } = this.props;
        const classNames = classnames({
            choosebutton: true,
            [className]: className
        });

        return (
            <div
                className={classNames}
                onClick={this.onClick}
                ref={(ref) => { this._btn = ref; }}
            >
                {label}
            </div>
        );
    }
}

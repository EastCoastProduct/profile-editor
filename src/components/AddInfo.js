'use strict';

import $rdf from 'rdflib';
import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import Input from './Input';

// Styles
import sharedStyle from '../styles/shared/base';
import addInfoStyle from '../styles/components/addInfo';

@Radium
export default class AddInfo extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onAddDeleteItem: PropTypes.func.isRequired,
    predicate: PropTypes.object.isRequired,
    prefix: PropTypes.string,
    prop: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    webId: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e, prop, predicate, prefix = '') {
    const { onAddDeleteItem, user, webId } = this.props;
    e.preventDefault();
    const newValue = `${prefix}${e.target.elements[prop].value}`;
    const item = $rdf.st($rdf.sym(webId), predicate, $rdf.sym(''),
      $rdf.sym(''));
    const array = user[prop];
    if (array.some((obj) => { return obj.value === newValue; })) return;

    onAddDeleteItem(newValue, item, prop, user.source, array);
  }

  deleteItem(e, prop, key) {
    const { onAddDeleteItem, user } = this.props;
    e.preventDefault();
    const item = user[prop][key];
    const array = user[prop];
    array.splice(key, 1);

    onAddDeleteItem(undefined, item, prop, user.source, array);
  }

  renderList(list, prop, prefix) {
    return list.map((item, key) => {
      return (
        <li
          style={addInfoStyle.listItem}
          key={`${key}${prop}`}
          onClick={(e) => this.deleteItem(e, prop, key)}
        >
          <p>
            {item.value && item.value.replace(prefix, '')}
            <i
              style={addInfoStyle.listIcon}
              className="fa fa-trash"
              key={`0${key}${prop}`}
            />
          </p>
        </li>
      );
    });
  }

  render() {
    const { icon, name, predicate, prefix, prop, type, user } = this.props;

    return (
      <article style={sharedStyle.leftCard}>
        <h3 style={sharedStyle.heading}>
          <i style={sharedStyle.icon} className={`fa fa-${icon}`} />
          {`${name}s`}
        </h3>
        {user[prop].length > 0 ?
          <ul>
            {this.renderList(user[prop], prop, prefix)}
          </ul> :
          <p style={sharedStyle.infoMsg}>
            No items at the moment
          </p>
        }
        <form
          style={addInfoStyle.form}
          onSubmit={(e) => this.addItem(e, prop, predicate, prefix)}
        >
          <Input
            style={addInfoStyle.newInput}
            label={`New ${name}`}
            name={prop}
            type={type}
            placeholder={`${name}`}
            button={`Add ${name}`}
          />
        </form>
      </article>
    );
  }
}

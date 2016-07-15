'use strict';

import { rdflib as $rdf } from 'solid-client';
import React, { PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import Radium from 'radium';
import Input from './Input';
import Spinner from './Spinner';

// Styles
import sharedStyle from '../styles/shared/base';
import addInfoStyle from '../styles/components/addInfo';

// Validation
import { isRequired, isPhone, isEmail, isUrl, isDuplicate }
  from '../utils/validator';
const fields = ['newItem'];
const validate = (values, { name, prefix, prop, type, user }) => {
  const errors = {};
  let rule;

  if (type === 'tel') {
    rule = isPhone(values.newItem);
  } else if (type === 'email') {
    rule = isEmail(values.newItem);
  } else if (type === 'url') {
    rule = isUrl(values.newItem);
  }

  errors.newItem = isRequired(values.newItem) || rule ||
    isDuplicate(values.newItem, user[prop], prefix, name);
  return errors;
};

const addItem = (prop, predicate, prefix = '', props) => {
  const { onAddDeleteItem, user, webId, fields: { newItem },
    resetForm } = props;
  const newValue = `${prefix}${newItem.value}`;
  const item = $rdf.st($rdf.sym(webId), predicate, $rdf.sym(''),
    $rdf.sym(''));
  const array = user[prop];

  onAddDeleteItem(newValue, item, prop, user.source, array, null, () => {
    resetForm();
  });
};

const deleteItem = (e, prop, key, props) => {
  const { onAddDeleteItem, user } = props;
  e.preventDefault();
  const item = user[prop][key];
  const array = user[prop];

  onAddDeleteItem(undefined, item, prop, user.source, array, key);
};

const renderList = (list, prop, prefix, props) =>
  list.map((item, key) => {
    return (
      item.value &&
        <li style={addInfoStyle.listItem} key={`${key}${prop}`}>
          <p>
            {item.value && item.value.replace(prefix, '')}
            {item.updating ?
              <Spinner style={addInfoStyle.spinner} /> :
              <i
                style={addInfoStyle.listIcon}
                className="fa fa-trash"
                key={`0${key}${prop}`}
                onClick={(e) => deleteItem(e, prop, key, props)}
              />
            }
          </p>
        </li>
    );
  });

const AddInfo = props => {
  const { icon, name, predicate, prefix, prop, type, user, fields: { newItem },
    handleSubmit } = props;

  return (
    <article style={sharedStyle.leftCard}>
      <h3 style={sharedStyle.heading}>
        <i style={sharedStyle.icon} className={`fa fa-${icon}`} />
        {`${name}s`}
      </h3>
      {user[prop].length > 0 ?
        <ul>
          {renderList(user[prop], prop, prefix, props)}
        </ul> :
        <p style={sharedStyle.infoMsg}>
          No items at the moment
        </p>
      }
      <form
        style={addInfoStyle.form}
        onSubmit={handleSubmit(() => addItem(prop, predicate, prefix, props))}
      >
        <Input
          style={addInfoStyle.newInput}
          label={`New ${name}`}
          type={type}
          placeholder={`${name}`}
          button={`Add ${name}`}
          spinner={user[prop].some(itm => itm.updating)}
          disabled={user[prop].some(itm => itm.updating)}
          {...newItem}
        />
        {newItem.touched && newItem.error && !newItem.active &&
          <p style={sharedStyle.errMsg}>{newItem.error}</p>
        }
      </form>
    </article>
  );
};

AddInfo.propTypes = {
  ...propTypes,
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

export default reduxForm({
  form: 'AddInfo',
  fields,
  validate,
})(new Radium(AddInfo));

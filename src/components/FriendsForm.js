'use strict';

import React, { PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import Radium from 'radium';
import Input from './Input';

// Styles
import sharedStyle from '../styles/shared/base';
import friendsFormStyle from '../styles/components/friendsForm';

// Validation
import { isRequired, isWebId, hasFriend } from '../utils/validator';

const fields = ['friendId'];
const validate = (values, { user: { friends } }) => {
  const errors = {};

  errors.friendId = isRequired(values.friendId) || isWebId(values.friendId) ||
    hasFriend(values.friendId, friends);
  return errors;
};

const addNewFriend = (friendId, onAddNewFriend, resetForm) =>
  onAddNewFriend(friendId.value, () => {
    resetForm();
  });

const FriendsForm = props => {
  const { onAddNewFriend, fields: { friendId }, handleSubmit, resetForm } =
    props;

  return (
    <article style={sharedStyle.leftCard}>
      <form
        onSubmit={handleSubmit(() => addNewFriend(friendId, onAddNewFriend,
          resetForm))}
        noValidate
      >
        <Input
          style={friendsFormStyle.label}
          label="New Friend"
          type="url"
          placeholder="WebId of your friend"
          button="Add Friend"
          {...friendId}
        />
        {friendId.touched && friendId.error && !friendId.active &&
          <p style={[sharedStyle.errMsg, friendsFormStyle.error]}>
            {friendId.error}
          </p>
        }
      </form>
    </article>
  );
};

FriendsForm.propTypes = {
  ...propTypes,
  onAddNewFriend: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'FriendsItem',
  fields,
  validate,
})(new Radium(FriendsForm));

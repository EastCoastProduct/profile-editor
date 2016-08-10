'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';
import AppConstants from '../constants/application';
import Input from '../components/Input';
import Select from '../components/Select';

// Styles
import sharedStyle from '../styles/shared/base';
import basicInfoStyle from '../styles/components/basicInfo';

const { GENDER_OPTIONS } = AppConstants;

const BasicInfo = ({ edit, onUpdate, user }) =>
  <article style={sharedStyle.leftCard}>
    <h3 style={sharedStyle.heading}>
      <i style={sharedStyle.icon} className="fa fa-user" />
      Basic Information
    </h3>
    {edit ?
      <form>
        <Input
          style={basicInfoStyle.firstName}
          label="First Name"
          type="text"
          placeholder="First Name"
          defaultValue={user.firstName.value}
          onBlur={(e) => onUpdate(e, user.firstName,
              'firstName')}
          spinner={user.firstName.updating}
          disabled={user.firstName.updating}
        />
        <Input
          style={basicInfoStyle.lastName}
          label="Last Name"
          type="text"
          placeholder="Last Name"
          defaultValue={user.lastName.value}
          onBlur={(e) => onUpdate(e, user.lastName, 'lastName')}
          spinner={user.lastName.updating}
          disabled={user.lastName.updating}
        />
        <Input
          style={basicInfoStyle.nickName}
          label="Nickname"
          type="text"
          placeholder="Nickname"
          defaultValue={user.nickName.value}
          onBlur={(e) => onUpdate(e, user.nickName, 'nickName')}
          spinner={user.nickName.updating}
          disabled={user.nickName.updating}
        />
        <Input
          style={basicInfoStyle.fullName}
          label="Full Name"
          type="text"
          placeholder="Full Name"
          defaultValue={user.fullName.value}
          onBlur={(e) => onUpdate(e, user.fullName, 'fullName')}
          spinner={user.fullName.updating}
          disabled={user.fullName.updating}
        />
        <Select
          style={basicInfoStyle.gender}
          label="Gender"
          options={GENDER_OPTIONS}
          defaultValue={user.gender.value}
          onChange={(e) => onUpdate(e, user.gender, 'gender')}
          spinner={user.gender.updating}
          disabled={user.gender.updating}
        />
      </form> :
      <dl>
        {user.fullName.value && <dt>Full Name</dt>}
        {user.fullName.value && <dd>{user.fullName.value}</dd>}
        {user.firstName.value && <dt>First Name</dt>}
        {user.firstName.value && <dd>{user.firstName.value}</dd>}
        {user.lastName.value && <dt>Last Name</dt>}
        {user.lastName.value && <dd>{user.lastName.value}</dd>}
        {user.nickName.value && <dt>Nickname</dt>}
        {user.nickName.value && <dd>{user.nickName.value}</dd>}
        {user.gender.value && <dt>Gender</dt>}
        {user.gender.value && <dd>{user.gender.value}</dd>}
      </dl>
    }
  </article>;

BasicInfo.propTypes = {
  edit: PropTypes.bool,
  onUpdate: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default new Radium(BasicInfo);

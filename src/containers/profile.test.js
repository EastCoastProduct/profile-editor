'use strict';

import React from 'react';
import {expect} from 'chai';
import {shallow, render} from 'enzyme';
import Profile from './Profile';

const ProfileTest = Profile.ProfileTest;

const dispatchObj = { dispatch: (cb) => null };
const validProps = Object.assign({}, dispatchObj, {
  errors: {
    get: null,
    update: null,
  },
  location: { query: {webId: 'testData'}},
  profile: {
    errors: {
      update: null,
      get: null,
    },
    data: {},
    user: {
      bcgImg: {},
      blogs: [],
      emails: [],
      firstName: {},
      friends: [],
      fullName: {},
      gender: {},
      homepages: [],
      keystore: {},
      lastName: {},
      nickName: {},
      phones: [],
      profileImg: {},
      source: {},
      webId: 'testData',
      workpages: []
    }
  }
});
const emptyProps = Object.assign({}, dispatchObj, {
  profile: {}
});

describe('Profile component', () => {

  it('should render the component', () => {
    const wrapper = shallow(<ProfileTest {...validProps} />);
    expect(wrapper
      .find('div')
    ).to.have.length(4);
  });
});
'use strict';

const mixin = {
  label: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginBottom: 20,
  },
  nameAndGender: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '49%',
  },
};

export default {
  firstName: {
    ...mixin.label,
    marginRight: '2%',
    width: '38%',
  },
  lastName: {
    ...mixin.label,
    marginRight: '1%',
    width: '29%',
  },
  nickName: {
    ...mixin.label,
    marginLeft: '1%',
    width: '29%',
  },
  fullName: {
    ...mixin.nameAndGender,
    marginRight: '1%',
  },
  gender: {
    ...mixin.nameAndGender,
    marginLeft: '1%',
  },
};

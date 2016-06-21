'use strict';

import variables from '../base/variables';
const { sizes } = variables;

const mixin = {
  input: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginBottom: 20,
  },
  nameAndGender: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '49%',
  },
  inputAndSelect: {
    display: 'block',
    width: '100%',
  },
};

export default {
  leftCard: {
    marginBottom: 20,
    textAlign: 'left',
  },
  firstName: {
    ...mixin.input,
    marginRight: '2%',
    width: '38%',
  },
  lastName: {
    ...mixin.input,
    marginRight: '1%',
    width: '29%',
  },
  nickName: {
    ...mixin.input,
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
  labelText: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    ...mixin.inputAndSelect,
  },
  select: {
    ...mixin.inputAndSelect,
    height: 44,
  },
  newInput: {
    ...mixin.input,
    borderRadius: `${sizes.radius}px 0 0 ${sizes.radius}px`,
    width: '80%',
  },
  newButton: {
    borderRadius: `0 ${sizes.radius}px ${sizes.radius}px 0`,
    display: 'inline-block',
    fontWeight: 'bold',
    padding: 13.5,
    verticalAlign: 'top',
    width: '20%',
  },
};

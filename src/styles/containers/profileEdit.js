'use strict';

const mixin = {
  input: {
    marginBottom: 10,
  },
};

export default {
  leftCard: {
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
    width: '100%',
  },
};

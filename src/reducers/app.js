'use strict';

import Actions from '../constants/actions';
const { MENU_TOGGLE } = Actions;

const initialState = {
  showMenu: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_TOGGLE:
      return Object.assign({}, state, {
        showMenu: action.toggle,
      });
    default:
      return state;
  }
};

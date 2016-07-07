'use strict';

import Actions from '../constants/actions';
const { MENU_TOGGLE } = Actions;

export function menuToggle(toggle) {
  return {
    type: MENU_TOGGLE,
    toggle,
  };
}

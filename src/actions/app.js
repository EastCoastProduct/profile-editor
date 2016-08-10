'use strict';

import Actions from '../constants/actions';

const { MENU_TOGGLE } = Actions;

export default function menuToggle(toggle) {
  return {
    type: MENU_TOGGLE,
    toggle,
  };
}

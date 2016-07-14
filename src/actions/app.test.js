'use strict';

import { expect } from 'chai';
import * as appData from './app'
import Actions from '../constants/actions';

describe('app action', () => {
  it('toggles menu', () => {
    const toggle = '';
    const expectedAction = {
      type: Actions.MENU_TOGGLE,
      toggle: toggle,
    };
    expect(appData.menuToggle(toggle)).to.eql(expectedAction);
  });

});
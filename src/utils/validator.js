'use strict';

import validator from 'validator';

export function isRequired(value) {
  return validator.isNull(String(value)) ? 'Required field.' : null;
}

export function isWebId(value) {
  const expression = ['https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.',
    '[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&/=]*)#[-a-zA-Z0-9?/:@._~!$&\'',
    '()*+,;=]*'].join('');
  const regExp = new RegExp(expression, 'g');
  return regExp.test(value) ? null : 'Invalid WebId.';
}

export function hasFriend(value, friends) {
  return friends.some(obj => obj.value === value) ? 'You are already friends.'
    : null;
}

export function isPhone(value) {
  return validator.isNumeric(String(value)) ? null :
    'Invalid Phone number. Should only contain numbers.';
}

export function isEmail(value) {
  return validator.isEmail(String(value)) ? null : 'Invalid Email.';
}

export function isUrl(value) {
  const options = { protocols: ['http', 'https'] };
  return validator.isURL(String(value), options) ? null : 'Invalid URL.';
}

export function isDuplicate(value, array, prefix = '', name) {
  return array.some(obj => obj.value === `${prefix}${value}`) ?
    `You already have that ${name}` : null;
}

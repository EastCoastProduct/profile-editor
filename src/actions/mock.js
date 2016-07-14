// 'use strict';
//
// const mock_fake_module = {
//   graph: function () {
//     console.log (123,'nesto');
//     return {user: {}};
//   },
//   fetcher: function () {
//     return {nowOrWhenFetched: function (a, b, c) {
//       console.log(555555,a,b,c);
//       return {sranje:{}};
//     } };
//   },
//
// };
//
// module.exports = mock_fake_module;

import fs from 'fs';

export default function crap(cb) {
  fs.readFile('/etc/asl.conf', (err, data) => {
    if (err) return console.log('a brate', err);
    console.log('RADI', data);
    cb();
    return 'chickens';
  });
}
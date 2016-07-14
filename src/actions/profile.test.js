// 'use strict';
//
// import nock from 'nock';
// import { expect } from 'chai';
// import { profileFetch } from './profile';
// import mockStore from '../shared/mockStore';
// import Actions from '../constants/actions';
// import mock from 'mock-require';
//
// const webId = 'https://androecp.databox.me/profile/card#me';
// const URI = 'http://localhost:3000';
// const store = mockStore();
//
// describe('profile action', () => {
//   var mock_fake_module, profileFetch;
//
//   before(function(){
//
//     mock_fake_module = {
//       // graph: function () {
//       //   return {user: {}};
//       // },
//       // fetcher: function () {
//       //   return { nowOrWhenFetched: function (a) {
//       //     console.log(555555,a);
//       //     return {user: {} };
//       //   }};
//       // },
//       // sym: function () {
//       //   return 'http://nestp';
//       // },
//       graph: () => {
//         console.log ('prvi');
//         return {body: {}}
//       },
//       fetcher: function () {
//         console.log ('drugi');
//           return store;
//
//       },
//       sym: () => {
//         console.log ('treci');
//         return 'https://androecp.databox.me/profile/card';
//       },
//     };
//
//     mock('rdflib', mock_fake_module);
//
//     profileFetch = mock.reRequire('./profile').profileFetch;
//   });
//
//     after(function(){
//       mock.stop('rdflib');
//     });
//
//   afterEach(() => {
//     nock.cleanAll()
//   });
//
//   it.only('fetch user', () => {
//     nock(URI)
//       .get(webId)
//       .reply(200, {type: Actions.PROFILE_GET_SUCCESS, user: {}});
//
//     const expectedActions = [
//       {
//         type: Actions.PROFILE_GET_SUCCESS,
//         user: {user: {}},
//       },
//     ];
//
//    return store.dispatch(profileFetch(webId))
//     .then((done) => {
//       expect(store.getActions()).to.eql(expectedActions);
//       done();
//     });
//   });
//   // it.only('should something to do idiot', done => {
//   //
//   //   var store = mockStore({ data: {} });
//   //
//   //   return store.dispatch(profileFetch(webId))
//   //     .then(() => {
//   //       expect(store.getAction()).to.eql([{
//   //         type: PROFILE_GET_SUCCESS,
//   //         user: successBody,
//   //       }]);
//   //       done();
//   //     });
//   //   });
//   //
//   // var dummy;
//   //
//   // before(done => {
//   //   mock('./mock', function() {
//   //     console.log('CALL ME MAYBE...dam dam daam');
//   //     return 'cows';
//   //   });
//   //   dummy = mock.reRequire('./profile').dummy;
//   //   console.log(dummy)
//   //   done();
//   // });
//   //
//   // after(done => {
//   //   mock.stop('./mock');
//   //   done();
//   //
//   // });
//   //
//   // it('should have cookies', done => {
//   //   dummy(done);
//   // });
//   //
// });
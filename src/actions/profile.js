'use strict';

import fetch from '../utils/fetch';
import $rdf from 'rdflib';
import path from 'path';
import _ from 'lodash';
import parseLinkHeader from 'parse-link-header';
import Actions from '../constants/actions';
import appConstants from '../constants/application';
import Namespaces from '../constants/namespaces';
const { PROFILE_GET_SUCCESS, PROFILE_GET_FAILED, PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED, PROFILE_IMAGE_UPLOAD_FAILED, PROFILE_RESET,
  FRIENDS_GET_SUCCESS, PAGINATION_CHANGED } = Actions;
const { ACL, DCT, FOAF, UI } = Namespaces;
const { TIMEOUT } = appConstants;

function profileFetchSuccess(user) {
  return {
    type: PROFILE_GET_SUCCESS,
    user,
  };
}

export function profileUpdateSuccess(item, prop) {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    user: {
      [prop]: item,
    },
  };
}

function friendFetchSuccess(friends) {
  return {
    type: FRIENDS_GET_SUCCESS,
    friends,
  };
}

export function paginationChanged(page, numOfPages, start, end) {
  return {
    type: PAGINATION_CHANGED,
    page,
    numOfPages,
    start,
    end,
  };
}

export function profileReset() {
  return {
    type: PROFILE_RESET,
  };
}

function profileUpdateFailed(error) {
  return {
    type: PROFILE_UPDATE_FAILED,
    error,
  };
}

function profileImageUploadFailed(error) {
  return {
    type: PROFILE_IMAGE_UPLOAD_FAILED,
    error,
  };
}

function profileFetchFailed(error) {
  return {
    type: PROFILE_GET_FAILED,
    error,
  };
}

function getStatement(g, subject, predicate, dontCreateStatement) {
  const statement = g.statementsMatching(subject, predicate)[0];
  if (dontCreateStatement) return statement;
  return statement || $rdf.st(subject, predicate, $rdf.lit(''), $rdf.sym(''));
}

function setDataValues(data) {
  const valData = data;
  Object.keys(valData).forEach((key) => {
    if (valData[key].constructor.name === 'Statement') {
      valData[key].value = valData[key].object.value || valData[key].object.uri;
    } else if (Array.isArray(valData[key])) {
      valData[key].forEach((item, arrKey) => {
        if (item.constructor.name !== 'Statement') return false;
        valData[key][arrKey].value = item.object.value || item.object.uri;
        return true;
      });
    }
  });
  return valData;
}

function fetchUser(webId, isFriend = false) {
  const g = $rdf.graph();
  const f = $rdf.fetcher(g, TIMEOUT);
  const docUri = webId.indexOf('#') >= 0 ? webId.slice(0, webId.indexOf('#'))
    : webId;
  const webSym = $rdf.sym(webId);

  return new Promise((resolve, reject) => {
    f.nowOrWhenFetched(docUri, (ok, body, xhr) => {
      const data = {};

      if (!ok) {
        if (!isFriend) return reject('Profile not found. Try another WebId.');
        data.error = 'Friend\'s Profile not found.';
      }

      // add webID
      data.webId = webId;

      // add source
      let docName = g.statementsMatching($rdf.sym(docUri), new DCT('title'))[0];
      docName = docName ? docName.object.value : 'Public Profile';

      if (xhr.getResponseHeader('Link')) {
        const lh = parseLinkHeader(xhr.getResponseHeader('Link'));
        if (lh.type && lh.type.url === 'http://www.w3.org/ns/ldp#Resource') {
          data.source = {
            uri: docUri,
            name: docName,
          };
        }
      }

      // add keystore
      data.keystore = getStatement(g, webSym, new ACL('keystore'));

      // info
      data.fullName = getStatement(g, webSym, new FOAF('name'));
      data.firstName = getStatement(g, webSym, new FOAF('givenName'));
      data.lastName = getStatement(g, webSym, new FOAF('familyName'));
      data.nickName = getStatement(g, webSym, new FOAF('nick'));
      data.gender = getStatement(g, webSym, new FOAF('gender'));
      data.profileImg = getStatement(g, webSym, new FOAF('img'), true) ||
        getStatement(g, webSym, new FOAF('depiction'), true) ||
        getStatement(g, webSym, new FOAF('img'));
      data.bcgImg = getStatement(g, webSym, new UI('backgroundImage'));

      // array collections
      data.phones = g.statementsMatching(webSym, new FOAF('phone'));
      data.emails = g.statementsMatching(webSym, new FOAF('mbox'));
      data.blogs = g.statementsMatching(webSym, new FOAF('weblog'));
      data.homepages = g.statementsMatching(webSym, new FOAF('homepage'));
      data.workpages =
        g.statementsMatching(webSym, new FOAF('workplaceHomepage'));

      // Friends
      data.friends = g.statementsMatching(webSym, new FOAF('knows'));

      return resolve(setDataValues(data));
    });
  });
}

export function profileFetch(webId) {
  return dispatch => {
    fetchUser(webId).then((resp) => {
      dispatch(profileFetchSuccess(resp));
    }).catch((err) => {
      dispatch(profileFetchFailed(err));
    });
  };
}

export function profileUpdate(value, item, prop, source, array) {
  return dispatch => {
    let query = '';
    let graphUri = '';
    const newS = _.cloneDeep(item);
    const itemProp = item.object.hasOwnProperty('uri') ? 'uri' : 'value';

    if (item.object[itemProp]) {
      query += `DELETE DATA { ${item.toNT()} }`;
      graphUri = source.uri;

      if (!!value) query += ' ;\n';
    }

    if (!!value) {
      newS.object[itemProp] = newS.value = value;
      newS.why.uri = source.uri;
      query += `INSERT DATA { ${newS.toNT()} }`;
      graphUri = source.uri;
    } else {
      newS.object[itemProp] = newS.value = value;
    }

    fetch(graphUri, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/sparql-update',
      },
      body: query,
    }).then(() => {
      if (array) {
        let newArray;
        if (!!value) newArray = array.concat(newS);
        return dispatch(profileUpdateSuccess(newArray || array, prop));
      }
      return dispatch(profileUpdateSuccess(newS, prop));
    }).catch((err) => {
      dispatch(profileUpdateFailed(err));
    });
  };
}

function uploadNewImage(newUrl, file) {
  return fetch(newUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });
}

function deleteOldImage(oldUrl) {
  return fetch(oldUrl, {
    method: 'DELETE',
  });
}

export function profileImageUpload(file, item, prop, source) {
  return dispatch => {
    const picUrl = `${path.dirname(source.uri)}/${file.name}`;
    const fetches = [uploadNewImage(picUrl, file)];

    if (item.object.uri || item.object.value) {
      fetches.push(deleteOldImage(item.object.uri || item.object.value));
    }

    Promise.all(fetches).then(() => {
      dispatch(profileUpdate(picUrl, item, prop, source));
    }).catch((err) => {
      dispatch(profileImageUploadFailed(err));
    });
  };
}

export function profileImageDelete(item, prop, source) {
  return dispatch => {
    const deleteUrl = item.object.uri || item.object.value;

    deleteOldImage(deleteUrl).then(() => {
      dispatch(profileUpdate(undefined, item, prop, source));
    }).catch((err) => {
      dispatch(profileImageUploadFailed(err));
    });
  };
}

export function getFriends(pagFriends, friends, start, itemsPerPage) {
  return dispatch => {
    const fetches = pagFriends.map((item) => {
      if (!item.data) return fetchUser(item.object.uri, true);
      return item.data;
    });

    // no need for catch method, fetchUser for friends always resolves
    Promise.all(fetches).then((resp) => {
      const newFriends = pagFriends.map((item, index) => {
        if (!item.data) {
          const newItem = item;
          newItem.data = resp[index];
          return newItem;
        }
        return item;
      });
      friends.splice(start, itemsPerPage, ...newFriends);

      dispatch(friendFetchSuccess(friends));
    });
  };
}

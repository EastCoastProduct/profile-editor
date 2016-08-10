'use strict';

import solid, { rdflib as $rdf, vocab } from 'solid-client';
import path from 'path';
import _ from 'lodash';
import Actions from '../constants/actions';
import appConstants from '../constants/application';

const { PROFILE_GET_SUCCESS, PROFILE_UPDATE, PROFILE_RESET,
  PROFILE_ACTION_FAILED, FRIENDS_GET_SUCCESS, PAGINATION_CHANGED } = Actions;
const { TIMEOUT } = appConstants;

// Solid config
solid.config.timeout = TIMEOUT;
solid.vocab.ui = function wrapper(term) {
  return (new $rdf.Namespace('http://www.w3.org/ns/ui#'))(term);
};

// Action creators
function profileFetchSuccess(user) {
  return {
    type: PROFILE_GET_SUCCESS,
    user,
  };
}

export function profileUpdateAction(item, prop) {
  return {
    type: PROFILE_UPDATE,
    user: {
      [prop]: item,
    },
  };
}

export function profileReset() {
  return {
    type: PROFILE_RESET,
  };
}

function profileActionFailed(type, error) {
  return {
    type: PROFILE_ACTION_FAILED,
    errors: {
      [type]: error,
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

// Asynchronous actions and other functions
function getStatement(profile, sub, pred, isArray, dontCreateStatement) {
  const newS = $rdf.st(sub, pred, $rdf.lit(''), $rdf.sym(''));
  if (!profile || !profile.parsedGraph) return isArray ? [] : newS;
  const statement = profile.parsedGraph.statementsMatching(sub, pred);
  if (isArray) return statement;
  if (dontCreateStatement) return statement[0];
  return statement[0] || newS;
}

function setDataValues(data) {
  const valData = data;
  Object.keys(valData).forEach((key) => {
    if (valData[key].constructor.name === 'Statement') {
      valData[key].value = valData[key].object.value || valData[key].object.uri;
      valData[key].updating = false;
    } else if (Array.isArray(valData[key])) {
      valData[key].forEach((item, arrKey) => {
        if (item.constructor.name !== 'Statement') return false;
        valData[key][arrKey].value = item.object.value || item.object.uri;
        valData[key][arrKey].updating = false;
        return true;
      });
    }
  });
  return valData;
}

function setData(profile, webId, error) {
  const webSym = $rdf.sym(webId);
  const data = {};

  // add webID
  data.webId = profile ? profile.webId : webId;

  // error
  if (error) data.error = error;

  // add source
  let docName = getStatement(profile, webSym, vocab.dct('title'));
  docName = docName ? docName.object.value : 'Public Profile';

  if (profile && profile.response.types && profile.response.types.some(itm =>
    itm === 'http://www.w3.org/ns/ldp#Resource')) {
    data.source = {
      uri: profile.response.url,
      name: docName,
    };
  }

  // add keystore
  data.keystore = getStatement(profile, webSym, vocab.acl('keystore'));

  // info
  data.fullName = getStatement(profile, webSym, vocab.foaf('name'));
  data.firstName = getStatement(profile, webSym, vocab.foaf('givenName'));
  data.lastName = getStatement(profile, webSym, vocab.foaf('familyName'));
  data.nickName = getStatement(profile, webSym, vocab.foaf('nick'));
  data.gender = getStatement(profile, webSym, vocab.foaf('gender'));
  data.profileImg =
    getStatement(profile, webSym, vocab.foaf('img'), null, true) ||
    getStatement(profile, webSym, vocab.foaf('depiction'), null, true) ||
    getStatement(profile, webSym, vocab.foaf('img'));
  data.bcgImg = getStatement(profile, webSym, vocab.ui('backgroundImage'));

  // array collections
  data.phones = getStatement(profile, webSym, vocab.foaf('phone'), true);
  data.emails = getStatement(profile, webSym, vocab.foaf('mbox'), true);
  data.blogs = getStatement(profile, webSym, vocab.foaf('weblog'), true);
  data.homepages =
    getStatement(profile, webSym, vocab.foaf('homepage'), true);
  data.workpages = getStatement(profile, webSym,
    vocab.foaf('workplaceHomepage'), true);

  // Friends
  data.friends = getStatement(profile, webSym, vocab.foaf('knows'), true);

  return setDataValues(data);
}

function fetchUser(webId, isFriend = false) {
  return solid.getProfile(webId).then((profile) => {
    return setData(profile, webId);
  }).catch((err) => {
    if (isFriend) return setData(null, webId, err.message);
    throw err;
  });
}

export function profileFetch(webId) {
  return dispatch => {
    fetchUser(webId).then((resp) => {
      dispatch(profileFetchSuccess(resp));
    }).catch((err) => {
      dispatch(profileActionFailed('get', err.message));
    });
  };
}

function updatingDispatch(dispatch, st, update, value, prop, array, arrayKey) {
  const newS = _.cloneDeep(st);
  newS.updating = update;
  if (array) {
    let newArray;
    if (value) {
      newArray = array.concat(newS);
    } else if (update) {
      newArray = _.cloneDeep(array);
      newArray[arrayKey] = newS;
    } else {
      newArray = _.cloneDeep(array);
      newArray.splice(arrayKey, 1);
    }
    return dispatch(profileUpdateAction(newArray, prop));
  }
  return dispatch(profileUpdateAction(newS, prop));
}

export function profileUpdate(value, item, prop, source, array, arrayKey, cb) {
  return dispatch => {
    const oldTriples = [];
    const newTriples = [];
    let patchUri;
    const newS = _.cloneDeep(item);
    const itemProp = item.object.hasOwnProperty('uri') ? 'uri' : 'value';

    // updating
    updatingDispatch(dispatch, newS, true, value, prop, array, arrayKey);

    if (item.object[itemProp]) {
      oldTriples.push(item.toNT());
      patchUri = source.uri;
    }

    if (value) {
      newS.object[itemProp] = newS.value = value;
      newS.why.uri = source.uri;
      newTriples.push(newS.toNT());
      patchUri = source.uri;
    } else {
      newS.object[itemProp] = newS.value = value;
    }

    solid.web.patch(patchUri, oldTriples, newTriples).then(() => {
      updatingDispatch(dispatch, newS, false, value, prop, array, arrayKey);
      if (typeof cb === 'function') cb();
    }).catch((err) => {
      dispatch(profileActionFailed('update', err.resp.statusText));
    });
  };
}

function uploadNewImage(newUrl, file) {
  return solid.web.put(newUrl, file);
}

function deleteOldImage(oldUrl) {
  return solid.web.del(oldUrl);
}

function updatingItem(item) {
  const newS = _.cloneDeep(item);
  newS.updating = true;
  return newS;
}

export function profileImageUpload(file, item, prop, source) {
  return dispatch => {
    const picUrl = `${path.dirname(source.uri)}/${file.name}`;
    const fetches = [uploadNewImage(picUrl, file)];

    if (item.object.uri || item.object.value) {
      fetches.push(deleteOldImage(item.object.uri || item.object.value));
    }

    dispatch(profileUpdateAction(updatingItem(item), prop));
    Promise.all(fetches).then(() => {
      dispatch(profileUpdate(picUrl, item, prop, source));
    }).catch((err) => {
      dispatch(profileActionFailed('upload', err));
    });
  };
}

export function profileImageDelete(item, prop, source) {
  return dispatch => {
    const deleteUrl = item.object.uri || item.object.value;

    dispatch(profileUpdateAction(updatingItem(item), prop));
    deleteOldImage(deleteUrl).then(() => {
      dispatch(profileUpdate(undefined, item, prop, source));
    }).catch((err) => {
      dispatch(profileActionFailed('upload', err));
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

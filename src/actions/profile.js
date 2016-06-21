'use strict';

import 'whatwg-fetch';
import $rdf from 'rdflib';
import path from 'path';
import _ from 'lodash';
import parseLinkHeader from 'parse-link-header';
import Actions from '../constants/actions';
import Namespaces from '../constants/namespaces';
const { PROFILE_GET_SUCCESS, PROFILE_GET_FAILED, PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED, PROFILE_IMAGE_UPLOAD_FAILED } = Actions;
const { ACL, DCT, FOAF, UI } = Namespaces;

function profileFetchSuccess(user) {
  return {
    type: PROFILE_GET_SUCCESS,
    user,
  };
}

function profileFetchFailed(error) {
  return {
    type: PROFILE_GET_FAILED,
    error,
  };
}

function profileUpdateSuccess(item, prop) {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    user: {
      [prop]: item,
    },
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
    }
  });
  return valData;
}

export function profileFetch(webId) {
  return dispatch => {
    const g = $rdf.graph();
    const f = $rdf.fetcher(g);
    const docUri = webId.indexOf('#') >= 0 ? webId.slice(0, webId.indexOf('#'))
      : webId;
    const webSym = $rdf.sym(webId);

    f.nowOrWhenFetched(docUri, (ok, body, xhr) => {
      if (!ok) {
        dispatch(profileFetchFailed('Profile not found'));
      }
      const data = {};

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
      data.empty = false;

      dispatch(profileFetchSuccess(setDataValues(data)));
    });
  };
}

export function profileUpdate(value, item, prop, source) {
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/sparql-update',
      },
      body: query,
    }).then(() => {
      dispatch(profileUpdateSuccess(newS, prop));
    }).catch((err) => {
      dispatch(profileUpdateFailed(err));
    });
  };
}

function uploadNewImage(newUrl, file) {
  return fetch(newUrl, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });
}

function deleteOldImage(oldUrl) {
  return fetch(oldUrl, {
    method: 'DELETE',
    credentials: 'include',
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

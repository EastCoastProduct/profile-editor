'use strict';

import $rdf from 'rdflib';
import parseLinkHeader from 'parse-link-header';
import Actions from '../constants/actions';
import Namespaces from '../constants/namespaces';
const { PROFILE_GET_SUCCESS, PROFILE_GET_FAILED } = Actions;
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
      docName = docName ? docName.object.value : docUri;

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

export function profileUpdate(value, item) {
  return dispatch => {
    let query = '';
    let graphUri = '';

    if (item.object.value) {
      query += `DELETE DATA { ${item.toNT()} }`;
      graphUri = item.source;

      if (!!value) query += ' ;\n';
    }

    if (!!value) {
      query += `INSERT DATA { ${item.toNT()} }`;
      graphUri = item.source;
    }


    // just to get rid of linting bugs
    // doesn't do anything at all
    dispatch(graphUri);
  };
}

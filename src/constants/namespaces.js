'use strict';

import $rdf from 'rdflib';

export default Object.freeze({
  RDF: new $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  RDFS: new $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#'),
  FOAF: new $rdf.Namespace('http://xmlns.com/foaf/0.1/'),
  OWL: new $rdf.Namespace('http://www.w3.org/2002/07/owl#'),
  SPACE: new $rdf.Namespace('http://www.w3.org/ns/pim/space#'),
  UI: new $rdf.Namespace('http://www.w3.org/ns/ui#'),
  DCT: new $rdf.Namespace('http://purl.org/dc/terms/'),
  CERT: new $rdf.Namespace('http://www.w3.org/ns/auth/cert#'),
  ACL: new $rdf.Namespace('http://www.w3.org/ns/auth/acl#'),
});

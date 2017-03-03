angular
    .module('formatter', [])
    .controller('Main', ['$scope', 'xmlParser', 'jsonParser', formatter.controllers.main])
    .directive('outputBox', [formatter.directives.outputBox])
    .service('indentGenerator', [formatter.services.IndentGenerator])
    .service('jsonGenerator', ['indentGenerator', formatter.services.JsonGenerator])
    .service('jsonParser', ['jsonGenerator', formatter.services.JsonParser])
    .factory('XmlGenerator', ['indentGenerator', formatter.services.xmlGenerator])
    .service('xmlParser', ['XmlGenerator', formatter.services.XmlParser]);

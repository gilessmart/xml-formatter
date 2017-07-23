angular
    .module('formatter', [])
    .controller('Main', ['$scope', 'xmlParser', formatter.controllers.main])
    .directive('outputBox', [formatter.directives.outputBox])
    .service('indentGenerator', [formatter.services.IndentGenerator])
    .factory('XmlGenerator', ['indentGenerator', formatter.services.xmlGenerator])
    .service('xmlParser', ['XmlGenerator', formatter.services.XmlParser]);

angular
    .module('formatter', [])
    .controller('Main', ['$scope', 'XmlParser', 'JsonParser', formatter.controllers.main])
    .directive('outputBox', [formatter.directives.outputBox])
    .service('IndentGenerator', [formatter.services.IndentGenerator])
    .service('JsonGenerator', ['IndentGenerator', formatter.services.JsonGenerator])
    .service('JsonParser', ['JsonGenerator', formatter.services.JsonParser])
    .service('XmlGenerator', ['IndentGenerator', formatter.services.XmlGenerator])
    .service('XmlParser', ['XmlGenerator', formatter.services.XmlParser]);

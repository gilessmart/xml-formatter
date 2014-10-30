angular.module('formatter')
    .controller('Main', ['$scope', 'XmlParser', 'JsonParser', function ($scope, xmlParser, jsonParser) {
        $scope.model = {
            indentationLevel: 4
        };

        $scope.$watch('model.input', updateOutput);
        $scope.$watch('model.indentationLevel', updateOutput);

        function updateOutput() {
            var parseTree;

            if ($scope.model.input && $scope.model.indentationLevel) {
                if (parseTree = xmlParser.parse($scope.model.input) || jsonParser.parse($scope.model.input)) {
                    console.log(parseTree);
                    $scope.model.output =  parseTree.getFormattedString($scope.model.indentationLevel);
                    $scope.model.errorMessage = null;
                }
                else {
                    $scope.model.errorMessage = 'Parser error';
                }
            }
        }
    }]);
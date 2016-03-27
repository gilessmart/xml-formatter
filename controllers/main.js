formatter.controllers.main = function ($scope, xmlParser, jsonParser) {
    $scope.model = {
        indentSize: 4
    };

    $scope.$watch('model.input', updateOutput);
    $scope.$watch('model.indentSize', updateOutput);

    function updateOutput() {
        var parseTree;

        if ($scope.model.input && $scope.model.indentSize) {
            if (parseTree = xmlParser.parse($scope.model.input) || jsonParser.parse($scope.model.input)) {
                $scope.model.output =  parseTree.getFormattedString($scope.model.indentSize);
                $scope.model.errorMessage = null;
            }
            else {
                $scope.model.errorMessage = 'Parser error';
            }
        }
    }
};

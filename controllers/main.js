formatter.controllers.main = function ($scope, xmlParser) {
    $scope.model = {
        indentSize: 4,
        orderNodes: false,
        orderAttributes: false,
        attributesOnSeparateLines: false
    };

    $scope.$watch('model', updateOutput, true);

    function updateOutput() {
        var parseTree;
        if ($scope.model.input) {
            if (parseTree = xmlParser.parse($scope.model.input)) {
                $scope.model.output =  parseTree.getFormattedString(
                    $scope.model.indentSize, 
                    $scope.model.orderNodes, 
                    $scope.model.orderAttributes, 
                    $scope.model.attributesOnSeparateLines);
                $scope.model.errorMessage = null;
            }
            else {
                $scope.model.errorMessage = 'Parser error';
            }
        }
    }
};

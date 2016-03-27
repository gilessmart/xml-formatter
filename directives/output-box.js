formatter.directives.outputBox = function() {
    return {
        scope: {
            output: '='
        },
        templateUrl: 'views/output-box.html',
        link: function (scope, element, attributes) {
            var outputElement = element[0].querySelector('pre'),
                selection;

            scope.model = {};

            scope.$watch('output', function (output) {
                if (output) {
                    var formattedHtml = hljs.highlightAuto(output).value;

                    outputElement.innerHTML = formattedHtml;
                }
            });

            if (typeof window.getSelection === 'function') {
                selection = window.getSelection();

                scope.selectAll = function () {
                    selection.selectAllChildren(outputElement);
                }
            }
        }
    };
};

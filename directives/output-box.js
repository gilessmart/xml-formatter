angular.module('formatter')
    .directive('outputBox', function() {
        return {
            scope: {
                output: '='
            },
            template: '<pre>{{model.output}}</pre>',
            link: function (scope, element, attributes) {
                console.log('test');

                scope.model = {};

                scope.$watch('output', function (output) {
                    if (output) {
                        var html = hljs.highlightAuto(output).value;
                        element.children('pre').eq(0).html(html);
                    }
                    console.log('o');
                });
            }
        };
    });
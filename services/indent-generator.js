formatter.services.IndentGenerator = function () {
    var indentText = ' ';

    this.getIndent = function (indentLevel, indentAmount) {
        var result = '',
            i;

        for (i = 0; i < indentAmount * indentLevel; i++) {
            result += indentText;
        }

        return result;
    }
};

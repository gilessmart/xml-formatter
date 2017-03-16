formatter.services.IndentGenerator = function () {
    var indentText = ' ';

    this.getIndent = function (indentLevel, indentAmount, adjustment) {
        var result = '',
            i;

        adjustment = adjustment || 0;

        for (i = 0; i < indentAmount * indentLevel + adjustment; i++) {
            result += indentText;
        }

        return result;
    }
};

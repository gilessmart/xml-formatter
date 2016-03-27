formatter.services.JsonGenerator = function (indentGenerator) {
    this.getJson = function (parsedObject, indentAmount) {
        var result = '';

        if (Array.isArray(parsedObject)) {
            result += getArrayJson(parsedObject, 0, indentAmount);
        }
        else {
            result += getObjectJson(parsedObject, 0, indentAmount);
        }

        return result;
    };

    function getObjectJson (object, indentLevel, indentAmount) {
        var result = '';

        if (Object.keys(object).length) {
            result += '{\n';

            Object.keys(object).forEach(function (key, index, keys) {
                result += indentGenerator.getIndent(indentLevel + 1, indentAmount) + '"' + jsonEncode(key) + '": ';
                result += getPropertyValue(object[key], indentLevel, indentAmount);

                if (index < keys.length - 1) {
                    result += ',';
                }

                result += '\n';
            });

            result += indentGenerator.getIndent(indentLevel, indentAmount) + '}';
        }
        else {
            result += '{}';
        }

        return result;
    }

    function getArrayJson (value, indentLevel, indentAmount) {
        var result = '',
            i;

        if (value.length) {
            result += '[\n';

            for (i = 0; i < value.length; i++) {
                result += indentGenerator.getIndent(indentLevel + 1, indentAmount);
                result += getPropertyValue(value[i], indentLevel, indentAmount);

                if (i < value.length - 1) {
                    result += ',';
                }

                result += '\n';
            }

            result += indentGenerator.getIndent(indentLevel, indentAmount) + ']';
        }
        else {
            result += '[]';
        }

        return result;
    }

    function getPropertyValue(value, indentLevel, indentAmount) {
        var result = '';

        switch (typeof value) {
            case 'boolean':
                result += value ? 'true' : 'false';
                break;
            case 'number':
                result += value;
                break;
            case 'string':
                result += '"' + jsonEncode(value) + '"';
                break;
            case 'object':
                if (!value) {
                    result += 'null';
                }
                else if (Array.isArray(value)) {
                    result += getArrayJson(value, indentLevel + 1, indentAmount);
                }
                else {
                    result += getObjectJson(value, indentLevel + 1, indentAmount);
                }
                break;
        }

        return result;
    }

    function jsonEncode (input) {
        return input.replace(/"/g, '\\"');
    }
};

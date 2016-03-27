formatter.services.JsonParser = function (jsonGenerator) {
    this.parse = function (input) {
        var parsedObject;
        try {
            parsedObject = JSON.parse(input);
            return {
                getFormattedString: function (indentAmount) {
                    return jsonGenerator.getJson(parsedObject, indentAmount);
                }
            }
        }
        catch (error) {
            return null;
        }
    };
};

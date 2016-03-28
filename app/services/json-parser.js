formatter.services.JsonParser = function (jsonGenerator) {
    this.parse = function (input) {
        var parsedObject;
        try {
            parsedObject = JSON.parse(input);
            
            // JSON.parse() parses strings, numbers, bools, nulls by themselves
            // but I don't consider these to be JSON, 
            // so check we're only dealing with an object or an array
            if (typeof parsedObject !== 'object' || parsedObject === null) {
                throw 'JSON was not object or array';
            }
            
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

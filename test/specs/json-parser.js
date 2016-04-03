'use strict';

describe('json-parser', function () {
    var indentGenerator,
        jsonGenerator,
        jsonParser;
    
    beforeEach(function(){
        indentGenerator = new formatter.services.IndentGenerator();
        jsonGenerator = new formatter.services.JsonGenerator(indentGenerator);
        jsonParser = new formatter.services.JsonParser(jsonGenerator);
    });
    
    it('does not write invalid JSON', function () {
        expect(jsonParser.parse('"test string"')).toBeNull();
        expect(jsonParser.parse('100')).toBeNull();
        expect(jsonParser.parse('true')).toBeNull();
        expect(jsonParser.parse('null')).toBeNull();
        expect(jsonParser.parse('undefined')).toBeNull();
        expect(jsonParser.parse('{test:}')).toBeNull();
    });

    it('writes an empty object', function () {
        var input = '{}',
            expectedOutput = '{}',
            indentAmount = 1,
            output = jsonParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes an empty array', function () {
        var input = '[]',
            expectedOutput = '[]',
            indentAmount = 1,
            output = jsonParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
});

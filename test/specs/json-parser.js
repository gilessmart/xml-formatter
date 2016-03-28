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
    
    it('does not write a string', function () {
        expect(jsonParser.parse('"test string"')).toBeNull();
    });
    
    it('does not write a number', function () {
        expect(jsonParser.parse('100')).toBeNull();
    });
        
    it('does not write a bool', function () {
        expect(jsonParser.parse('true')).toBeNull();
    });
    
    it('does not write a null', function () {
        expect(jsonParser.parse('null')).toBeNull();
    });
    
    it('does not write an undefined', function () {
        expect(jsonParser.parse('undefined')).toBeNull();
    });
});

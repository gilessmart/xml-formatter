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
        var input = '"test string"',
            indentAmount = 1,
            output = jsonParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBeNull();
    });
    
    it('does not write a number', function () {
        var input = '100',
            indentAmount = 1,
            output = jsonParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBeNull();
    });
        
    it('does not write a bool', function () {
        var input = 'true',
            indentAmount = 1,
            output = jsonParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBeNull();
    });
    
    it('does not write a null', function () {
        var input = null,
            indentAmount = 1,
            output = jsonParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBeNull();
    });
    
    it('does not write a undefined', function () {
        var input = null,
            indentAmount = 1,
            output = jsonParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBeNull();
    });
});

'use strict';

describe('xml-parser', function () {
    var indentGenerator,
        xmlGenerator,
        xmlParser;
    
    beforeEach(function(){
        indentGenerator = new formatter.services.IndentGenerator();
        xmlGenerator = new formatter.services.XmlGenerator(indentGenerator);
        xmlParser = new formatter.services.XmlParser(xmlGenerator);
    });
    
    it('does not write invalid XML', function () {
        expect(xmlParser.parse('not xml')).toBeNull();
    });    
    
    it('writes empty elements', function () {
        var input = '<root></root>',
            expectedOutput = '<root />',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes elements with single line text content on one line', function () {
        var input = '<root>\ntest\n</root>',
            expectedOutput = '<root>test</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes comments', function () {
        var input = '<root><!-- test --></root>',
            expectedOutput = '<root>\n <!-- test -->\n</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes empty comments', function () {
        var input = '<root><!-- --></root>',
            expectedOutput = '<root>\n <!-- -->\n</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes CDATA', function () {
        var input = '<root><![CDATA[test]]></root>',
            expectedOutput = '<root>\n <![CDATA[test]]>\n</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes processing instructions', function () {
        var input = '<root><?name content?></root>',
            expectedOutput = '<root>\n <?name content ?>\n</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes stylesheet processing instructions', function () {
        var input = '<root><?xml-stylesheet type="text/xsl" href="style.xsl" ?></root>',
            expectedOutput = '<root>\n <?xml-stylesheet type="text/xsl" href="style.xsl" ?>\n</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('does not write empty text nodes between child nodes', function () {
        var input = '<root> <test1 /> <test2 /> </root>',
            expectedOutput = '<root>\n <test1 />\n <test2 />\n</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
});

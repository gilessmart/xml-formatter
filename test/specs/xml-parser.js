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
    
    it('writes empty comments', function () {
        var input = '<root><!-- --></root>',
            expectedOutput = '<root>\n <!-- -->\n</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes processing instructions', function () {
        var input = '<root><?xml-stylesheet type="text/xsl" href="style.xsl" ?></root>',
            expectedOutput = '<root>\n <?xml-stylesheet type="text/xsl" href="style.xsl" ?>\n</root>',
            indentAmount = 1,
            output = xmlParser.parse(input).getFormattedString(indentAmount);
        
        expect(output).toBe(expectedOutput);
    });
});

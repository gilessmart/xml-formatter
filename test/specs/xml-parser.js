'use strict';

describe('xml-parser', function () {
    var indentGenerator,
        XmlGenerator,
        xmlParser
    
    var indentSize,
        orderNodes;
    
    beforeEach(function(){
        indentGenerator = new formatter.services.IndentGenerator();
        XmlGenerator = formatter.services.xmlGenerator(indentGenerator);
        xmlParser = new formatter.services.XmlParser(XmlGenerator);
    });

    beforeEach(function(){
        indentSize = 1;
        orderNodes = false;
    });
    
    it('does not write invalid XML', function () {
        expect(xmlParser.parse('not xml')).toBeNull();
    });    
    
    it('writes empty elements', function () {
        var input = '<root></root>',
            expectedOutput = '<root />',
            output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes elements with single line text content on one line', function () {
        var input = '<root>\ntest\n</root>',
            expectedOutput = '<root>test</root>',
            output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);
        
        expect(output).toBe(expectedOutput);
    });

    it('writes comments', function () {
        var input = '<root><!-- test --></root>',
            expectedOutput = '<root>\n <!-- test -->\n</root>',
            output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes empty comments', function () {
        var input = '<root><!-- --></root>',
            expectedOutput = '<root>\n <!-- -->\n</root>',
            output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes CDATA', function () {
        var input = '<root><![CDATA[test]]></root>',
            expectedOutput = '<root>\n <![CDATA[test]]>\n</root>',
            output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes processing instructions', function () {
        var input = '<root><?name content?></root>',
            expectedOutput = '<root>\n <?name content ?>\n</root>',
            output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('writes stylesheet processing instructions', function () {
        var input = '<root><?xml-stylesheet type="text/xsl" href="style.xsl" ?></root>',
            expectedOutput = '<root>\n <?xml-stylesheet type="text/xsl" href="style.xsl" ?>\n</root>',
            output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);
        
        expect(output).toBe(expectedOutput);
    });
    
    it('does not write empty text nodes between child nodes', function () {
        var input = '<root> <test1 /> <test2 /> </root>',
            expectedOutput = '<root>\n <test1 />\n <test2 />\n</root>',
            output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);
        
        expect(output).toBe(expectedOutput);
    });

    describe('when set to order nodes', function () {
        beforeEach(function () {
            indentSize = 1;
            orderNodes = true;
        });

        it('produces ordered nodes', function () {
            var input = '<root><![CDATA[test]]><john /><!-- comment --><paul /><?name content?><george />text<ringo /></root>',
                expectedOutput = '<root>\n <!-- comment -->\n <?name content ?>\n <george />\n <john />\n <paul />\n <ringo />\n <![CDATA[test]]>\n text\n</root>',
                output = xmlParser.parse(input).getFormattedString(indentSize, orderNodes);

            expect(output).toBe(expectedOutput);
        });
    });
});

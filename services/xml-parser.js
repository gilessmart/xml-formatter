formatter.services.XmlParser = function (XmlGenerator) {
    this.parse = function (input) {
        var parser = new DOMParser(),
            dom;
        
        // IE11 (and probably previous versions..) throws errors if DOMParser can't parse the input
        try {
            dom = parser.parseFromString(input, 'text/xml');
        }
        catch (e) {
            return null;
        }

        // modern brosers parse the XML either way and return details of any parser error
        // in the parsererror element
        if (dom.getElementsByTagName('parsererror').length) {
            return null;
        }
        else {
            return {
                getFormattedString: function (indentSize, orderNodes) {
                    var xmlGenerator = new XmlGenerator(indentSize, orderNodes);
                    return xmlGenerator.getXml(dom);
                }
            }
        }
    };
};

formatter.services.XmlParser = function (xmlGenerator) {
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
                getFormattedString: function (indentAmount) {
                    return xmlGenerator.getXml(dom, indentAmount);
                }
            }
        }
    };
};

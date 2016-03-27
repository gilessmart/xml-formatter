formatter.services.XmlParser = function (xmlGenerator) {
    this.parse = function (input) {
        var parser = new DOMParser(),
            dom = parser.parseFromString(input, 'text/xml');

        if (dom.documentElement.getElementsByTagName('parsererror').length) {
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

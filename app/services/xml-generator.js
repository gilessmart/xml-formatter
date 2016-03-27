formatter.services.XmlGenerator = function (indentGenerator) {
    this.getXml = function (dom, indentAmount) {
        return getNodeText(dom.documentElement, 0, indentAmount);
    };

    function getNodeText(node, indentLevel, indentAmount) {
        var result = '';

        result += indentGenerator.getIndent(indentLevel, indentAmount);

        if (isTextNode(node)) {
            result += getTextNodeText(node);
        }
        else if (isCommentNode(node)) {
            result += '<!--';
            result += getCommentNodeText(node, indentLevel, indentAmount);
            result += '-->';
        }
        else if (isCDataNode(node)) {
            result += "<![CDATA[";
            result += node.textContent;
            result += "]]>";
        }
        else {
            result += '<';
            result += node.tagName;

            result += getAttributeMapText(node.attributes);

            if (!node.childNodes.length || node.childNodes.length === 1 && isEmptyTextNode(node.childNodes[0])) {
                result += ' />';
            }
            else {
                result += '>';

                // if the only child is a text node put it on the same line as the tag that contains it
                if (node.childNodes.length === 1 && isTextNode(node.childNodes[0])) {
                    result += getTextNodeText(node.childNodes[0]);
                }
                else {
                    result += getNodeListText(node.childNodes, indentLevel, indentAmount);
                    result += indentGenerator.getIndent(indentLevel, indentAmount);
                }

                result += '</';
                result += node.tagName;
                result += '>';
            }
        }

        return result;
    }

    function getTextNodeText (node) {
        return xmlEncode(node.textContent.trim());
    }

    function getCommentNodeText (node, indentLevel, indentAmount) {
        var lines = node.textContent.split('\n').map(function (line) {
                return line.trim();
            }).filter(function (line) {
                return line.length > 0;
            }),
            result = '';

        if (lines.length > 1) {
            result += '\n';
            lines.forEach(function (line) {
                result += indentGenerator.getIndent(indentLevel + 1, indentAmount);
                result += line;
                result += '\n';
            });
            result += indentGenerator.getIndent(indentLevel, indentAmount);
        }
        else {
            result += ' ';
            result += lines[0];
            result += ' ';
        }

        return result;
    }

    function xmlEncode (input) {
        return input.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    function isTextNode (node) {
        return node.constructor.name === 'Text';
    }

    function isEmptyTextNode (node) {
        return isTextNode(node) && node.textContent.trim() === '';
    }

    function isCommentNode (node) {
        return node.constructor.name === "Comment";
    }

    function isCDataNode (node) {
        return node.constructor.name === "CDATASection";
    }

    function getAttributeMapText (attributes) {
        var result = '',
            attributeIndex,
            attribute;

        for (attributeIndex = 0; attributeIndex < attributes.length; attributeIndex++) {
            attribute = attributes[attributeIndex];
            result += ' ';
            result += attribute.name;
            result += '="';
            result += xmlEncode(attribute.value);
            result += '"';
        }

        return result;
    }

    function getNodeListText(nodes, indentLevel, indentAmount) {
        var result = '',
            i;

        if (nodes.length) {
            result += '\n';
            for (i = 0; i < nodes.length; i++) {
                if (!isEmptyTextNode(nodes[i])) {
                    result += getNodeText(nodes[i], indentLevel + 1, indentAmount) + '\n';
                }
            }
        }

        return result;
    }
};

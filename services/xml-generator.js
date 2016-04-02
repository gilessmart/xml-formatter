formatter.services.XmlGenerator = function (indentGenerator) {
    this.getXml = function (dom, indentAmount) {
        return getNodeText(dom.documentElement, 0, indentAmount);
    };
    
    function getNodeText(node, indentLevel, indentAmount) {
        var result = '';

        result += indentGenerator.getIndent(indentLevel, indentAmount);
        
        switch (getNodeType(node)) {
            case Text:
                result += getTextNodeText(node);
                break;
            
            case CDATASection:
                result += "<![CDATA[";
                result += node.textContent;
                result += "]]>";
                break;
            
            case Comment:
                result += '<!--';
                result += getCommentNodeText(node, indentLevel, indentAmount);
                result += '-->';
                break;
            
            case ProcessingInstruction:
                result += '<?';
                result += node.target;
                if (node.data.trim()) {
                    result += ' '
                    result += node.data.trim();
                }
                result += ' ?>';
                break;
            
            case Element:
                result += '<';
                result += node.tagName;

                result += getAttributeMapText(node.attributes);

                // if there's no content then we'll output a self closing tag
                if (!node.childNodes.length || 
                    node.childNodes.length === 1 && isEmptyTextNode(node.childNodes[0])) {
                    result += ' />';
                }
                else {
                    result += '>';

                    // if the only child is a text node put it on the same line as the tag that contains it
                    if (node.childNodes.length === 1 && getNodeType(node.childNodes[0]) === Text) {
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
                break;    
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
            // write multiple lines
            result += '\n';
            lines.forEach(function (line) {
                result += indentGenerator.getIndent(indentLevel + 1, indentAmount);
                result += line;
                result += '\n';
            });
            result += indentGenerator.getIndent(indentLevel, indentAmount);
        }
        else {
            // write single line
            result += ' ';
            if (lines.length === 1) {
                result += lines[0];
                result += ' ';
            }
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
    
    function getNodeType (node) {
        if (node instanceof CDATASection) {
            return CDATASection;
        }
        // Text must come after CDATASection because CDATASection is derived from Text
        else if (node instanceof Text) {
            return Text;
        }
        else if (node instanceof Comment) {
            return Comment;
        }
        else if (node instanceof Element) {
            return Element;
        }
        else if (node instanceof ProcessingInstruction) {
            return ProcessingInstruction;
        }
    }
    
    function isEmptyTextNode (node) {
        return getNodeType(node) === Text && node.textContent.trim() === '';
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

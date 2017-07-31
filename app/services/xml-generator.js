formatter.services.xmlGenerator = function (indentGenerator) {
    return function XmlGenerator (indentAmount, orderNodes, orderAttributes, attributesOnSeparateLines) {
        this.getXml = function (dom) {
            return getNodeText(dom.documentElement, 0);
        };
        
        function getNodeText(node, indentLevel) {
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
                    result += getCommentNodeText(node, indentLevel);
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

                    result += attributesOnSeparateLines ? 
                        getMultiLineAttributeMapText(node.attributes, indentLevel, node.tagName.length) :
                        getSingleLiineAttributeMapText(node.attributes);

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
                            result += getNodeListText(node.childNodes, indentLevel);
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

        function getCommentNodeText (node, indentLevel) {
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

        function getSingleLiineAttributeMapText (attributes) {
            return getAttributeListText (attributes, ' ');
        }

        function getMultiLineAttributeMapText (attributes, indentLevel, tagNameLength) {
            var interAttributeWhiteSpace = '\n' + indentGenerator.getIndent(indentLevel, indentAmount, tagNameLength + 2);
            return getAttributeListText (attributes, interAttributeWhiteSpace);
        }

        function getAttributeListText (attributes, interAttributeWhiteSpace) {
            var attributesArray = Array.prototype.slice.call(attributes);

            if (orderAttributes) {
                attributesArray.sort(function (a, b) {
                    return a.name > b.name ? 1 : -1;
                });
            }

            return attributesArray.reduce(function (attributesText, currentAttribute, attributeIndex) {
                var attributeText = '';

                attributeText += attributeIndex > 0 ? interAttributeWhiteSpace : ' ';
                attributeText += currentAttribute.name;
                attributeText += '="';
                attributeText += xmlEncode(currentAttribute.value);
                attributeText += '"';
                
                return attributesText + attributeText;
            }, '');
        }

        function getNodeListText(nodes, indentLevel) {
            var result = '',
                nodesArray = Array.prototype.slice.call(nodes);

            if (nodes.length) {
                result += '\n';

                if (orderNodes) {
                    nodesArray = getOrderedNodes(nodesArray);
                }

                nodesArray.forEach(function (node) {
                    if (!isEmptyTextNode(node)) {
                        result += getNodeText(node, indentLevel + 1) + '\n';
                    }
                });
            }

            return result;
        }

        function getOrderedNodes(nodes) {
            return [].concat(
                getOrderedCommentNodes(nodes),
                getOrderedProcessingInstructionNodes(nodes),
                getOrderedElementNodes(nodes),
                getOrderedCDataNodes(nodes),
                getOrderedTextNodes(nodes));
        }

        function getOrderedCommentNodes(nodes) {
            return nodes.filter(function (node) { 
                return getNodeType(node) === Comment})
            .sort(function (a, b) {
                return a.text.trim() > b.text.trim() ? 1 : -1;
            });
        }

        function getOrderedProcessingInstructionNodes(nodes) {
            return nodes.filter(function (node) { 
                return getNodeType(node) === ProcessingInstruction})
            .sort(function (a, b) {
                return a.target > b.target ? 1 : -1;
            });
        }

        function getOrderedElementNodes(nodes) {
            return nodes.filter(function (node) { 
                return getNodeType(node) === Element})
            .sort(function (a, b) {
                return a.tagName > b.tagName ? 1 : -1;
            });
        }

        function getOrderedCDataNodes(nodes) {
            return nodes.filter(function (node) { 
                return getNodeType(node) === CDATASection})
            .sort(function (a, b) {
                return a.textContent > b.textContent ? 1 : -1;
            });
        }

        function getOrderedTextNodes(nodes) {
            return nodes.filter(function (node) { 
                return getNodeType(node) === Text})
            .sort(function (a, b) {
                return getTextNodeText(a) > getTextNodeText(b) ? 1 : -1;
            });
        }
    };    
};

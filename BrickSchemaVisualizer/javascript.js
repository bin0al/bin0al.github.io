function loadData() {
    const inData = document.getElementById('inText').value;
    const jsonld = ttl2jsonld.parse(inData);
    if (document.getElementById('saveJson').checked) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonld, '\t', 1));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "brick.json");
        dlAnchorElem.click();
    }
    document.getElementById('loadContainer').remove();
    const elemArr = [];
    //Converting to a schema fit to Cytoscape's requirements
    jsonld['@graph'].forEach(node => {
        if ((node['@id'] || false)) {
            for (prop in node) {
                if (prop == '@id') {
                    //Using ID as the node label; Removing the ID up to '#' to save space
                    const trimmedId = node['@id'].substring(node['@id'].indexOf('#'));
                    elemArr.push({
                        data: {
                            id: trimmedId,
                            scratch: {
                                'type': node['@type'] || '',
                                'label': node['rdfs:label'] || ''
                            }
                        }
                    });
                }
                //If relations are found in the node as an array, add them all to the final Cytoscape object
                else if (Array.isArray(node[prop]) && prop.indexOf('brick:') > -1 && prop.indexOf('hasTag') == -1) {
                    node[prop].forEach(ref => {
                        const trimmedSrc = node['@id'].substring(node['@id'].indexOf('#'));
                        const trimmedTgt = ref['@id'].substring(ref['@id'].indexOf('#'));
                        elemArr.push({
                            data: {
                                id: `${trimmedSrc} ${prop} ${trimmedTgt}`,
                                source: trimmedSrc,
                                target: trimmedTgt,
                                scratch: {
                                    'type': prop
                                }
                            }
                        });
                    })
                }
                //If a relation is found as a single object, add it to the final Cytoscape object
                else if ((node[prop]['@id'] || false) && prop.indexOf('brick:') > -1 && prop.indexOf('hasTag') == -1) {
                    const trimmedSrc = node['@id'].substring(node['@id'].indexOf('#'));
                    const trimmedTgt = node[prop]['@id'].substring(node[prop]['@id'].indexOf('#'));
                    elemArr.push({
                        data: {
                            id: `${trimmedSrc} ${prop} ${trimmedTgt}`,
                            source: trimmedSrc,
                            target: trimmedTgt,
                            scratch: {
                                'type': prop
                            }
                        }
                    });
                }
            }
        }
    });
    console.log(elemArr);
    var cy = cytoscape({
        container: document.getElementById('cyContainer'),
        elements: elemArr,
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': 'hsla(0,0%,0%,0.5)',
                    'label': 'data(id)'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
        ],
        layout: {
            name: 'breadthfirst',
            circle: true,
            nodeDimensionsIncludeLabels: true
        }
    });
}
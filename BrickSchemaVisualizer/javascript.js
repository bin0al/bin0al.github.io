function loadData() {
    //Load from the input text field and parse the (assumed) TTL as json
    const inData = document.getElementById('inText').value;
    let jsonld;
    let proceed = false;
    try {
        jsonld = ttl2jsonld.parse(inData);
        proceed = true;
    }
    catch (error) {
        alert(error.message);
    }
    if (proceed) {
        //Save a copy of the .json output if the option is chosen
        if (document.getElementById('saveJson').checked) {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonld, '\t', 1));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "brick.json");
            dlAnchorElem.click();
        }
        document.getElementById('loadContainer').remove();
        const elemArr = [];
        let validationObj = {};
        //Converting to a schema fit to Cytoscape's requirements
        jsonld['@graph'].forEach(node => {
            if ((node['@id'] || false)) {
                for (prop in node) {
                    if (prop == '@id') {
                        //Using ID as the node label; Removing the ID up to '#' to save space
                        const trimmedId = node['@id'].substring(node['@id'].indexOf('#'));
                        validationObj[trimmedId] = true;
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
                    else if (Array.isArray(node[prop])) {
                        node[prop].forEach(ref => {
                            if (ref['@id'] || false) {
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
                            }
                        })
                    }
                    //If a relation is found as a single object, add it to the final Cytoscape object
                    else if ((node[prop]['@id'] || false)) {
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
        validatedElemArr = [];
        elemArr.forEach(elem => {
            if (elem.data.target || false) {
                if ((validationObj[elem.data.target] || false) && (validationObj[elem.data.source] || false)) {
                    validatedElemArr.push(elem);
                }
            } else {
                validatedElemArr.push(elem);
            }
        });
        console.log(validatedElemArr);
        var cy = cytoscape({
            container: document.getElementById('cyContainer'),
            elements: validatedElemArr,
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
}
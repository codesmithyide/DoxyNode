# CodeSmithy DoxyNode

A node.js module to read the XML output produced by Doxygen.

```js
'use strict'
    
// The example refers to the local distribution but when using
// the npm package you would simply require "codesmithy-doxynode.js"
var doxynode = require("../../dist/codesmithy-doxynode.js")

// Create a new DoxygenXMLOutput instance and call initialize
// with the location of the directory that contains the XML 
// documentation
let xmloutput = new doxynode.DoxygenXMLOutput()
let initPromise = xmloutput.initialize("data/xml")

// initialize returns a promise, wait until it is
// fullfilled
initPromise.then(function() {

    // Get the list of classes
    let classesList = xmloutput.getListOfClasses()

    // The DoxygenXMLOutput object doesn't contain the full 
    // documentation for each class because the documentation
    // for each class is stored in a separate file.    

    // Load all the class documentation files now.
    let classDocumentationList = [ ]
    let readPromises = [ ]
    classesList.forEach(function(classDocumentation) {

        // The readClassDocumentation function will load the 
        // documentation for a specific class. It returns a promise
        // that we add to an array so we can wait until they are all
        // fullfilled. The documentation for each class is stored
        // in a instance of the ClassDocumentation class.
        readPromises.push(
            xmloutput.readClassDocumentation(classDocumentation)
                .then(function(classDocumentation) {
                    // Store each ClassDocumentation instance we
                    // loaded in the list
                    classDocumentationList.push(classDocumentation)
                })
            )
    })

    // Once the documentation for each class has been loaded, print
    // them to the console
    Promise.all(readPromises).then(function() {
        classDocumentationList.forEach(function(classDocumentation) {

            // Print the class name
            console.log("Name: " + classDocumentation.name)

            // Get the list of functions and print their names
            // The documentation for each function is stored in an 
            // instance of the FunctionDocumentation class.
            console.log("Methods:")
            classDocumentation.getListOfFunctions().forEach(
                function(functionDocumentation) {
                    console.log("\t" + functionDocumentation.name)
                }
            )
            console.log("")
        })
    })

})
```

## License

Copyright (c) 2017-2018 Xavier Leclercq

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

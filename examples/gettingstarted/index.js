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

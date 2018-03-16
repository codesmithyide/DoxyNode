'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("ClassDocumentation tests")

    new tf.FunctionBasedTest("Creation test 1", ClassDocumentationCreationTest1, testSequence)

    new tf.FunctionBasedTest("readFile test 1", ClassDocumentationReadFileTest1, testSequence)

    new tf.FunctionBasedTest("getBaseClasses test 1", ClassDocumentationGetBaseClassesTest1, testSequence)
    new tf.FunctionBasedTest("getBaseClasses test 2", ClassDocumentationGetBaseClassesTest2, testSequence)

    new tf.FunctionBasedTest("getListOfFunctions test 1", ClassDocumentationGetListOfFunctionsTest1, testSequence)
    new tf.FunctionBasedTest("getListOfFunctions test 2", ClassDocumentationGetListOfFunctionsTest2, testSequence)
}

function ClassDocumentationCreationTest1(resolve, reject) {
    let classdocumentation = new doxynode.ClassDocumentation()
    resolve(tf.TestResultOutcome.ePassed)
}

function ClassDocumentationReadFileTest1(resolve, reject) {
    let classdocumentation = new doxynode.ClassDocumentation()
    classdocumentation.readFile(__dirname + "/data/cpp-code-2/xml/class_polygon.xml")
        .then(function() {
            let outcome = tf.TestResultOutcome.eFailed
            if ((classdocumentation.name === "Polygon") &&
                (classdocumentation.briefdescription.toHTML() == "<p>This class represents a polygon.</p>")) {
                outcome = tf.TestResultOutcome.ePassed
            }
            resolve(outcome)
        })
}

function ClassDocumentationGetBaseClassesTest1(resolve, reject) {
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-2/xml")
        .then(function () {
            xmloutput.readClassDocumentation("Polygon")
                .then(function (classDocumentation) {
                    let outcome = tf.TestResultOutcome.eFailed
                    let baseclasses = classDocumentation.getBaseClasses()
                    if (baseclasses.length == 0) {
                        outcome = tf.TestResultOutcome.ePassed
                    }
                    resolve(outcome)
                })
        })
}

function ClassDocumentationGetBaseClassesTest2(resolve, reject) {
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-3/xml")
        .then(function () {
            xmloutput.readClassDocumentation("Rectangle")
                .then(function (classDocumentation) {
                    let outcome = tf.TestResultOutcome.eFailed
                    let baseclasses = classDocumentation.getBaseClasses()
                    if (baseclasses.length == 1) {
                        if (baseclasses[0].getBaseClassName() === "Polygon") {
                            outcome = tf.TestResultOutcome.ePassed
                        }
                    }
                    resolve(outcome)
                })
        })
}

function ClassDocumentationGetListOfFunctionsTest1(resolve, reject) {
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-2/xml")
        .then(function() {
            xmloutput.readClassDocumentation("Polygon")
                .then(function(classDocumentation) {
                    let outcome = tf.TestResultOutcome.eFailed
                    let functions = classDocumentation.getListOfFunctions()
                    if ((functions.length == 1) && 
                        (functions[0].name == "draw") &&
                        (functions[0].returnType.toHTML() == "void") &&
                        (functions[0].accessibility == doxynode.Accessibility.ePublic)) {
                        outcome = tf.TestResultOutcome.ePassed
                    }
                    resolve(outcome)
                })
        })
}

function ClassDocumentationGetListOfFunctionsTest2(resolve, reject) {
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-3/xml")
        .then(function () {
            xmloutput.readClassDocumentation("Rectangle")
                .then(function (classDocumentation) {
                    let outcome = tf.TestResultOutcome.eFailed
                    let functions = classDocumentation.getListOfFunctions()
                    if ((functions.length == 5) &&
                        (functions[3].name == "setWidth") &&
                        (functions[3].parameters.length == 1) &&
                        (functions[3].parameters[0].type == "int") &&
                        (functions[3].parameters[0].name == "w")) {
                        outcome = tf.TestResultOutcome.ePassed
                    }
                    resolve(outcome)
                })
        })
}

'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("Description tests")

    new tf.FunctionBasedTest("Creation test 1", DescriptionCreationTest1, testSequence)

    new tf.FunctionBasedTest("toHTML test 1", DescriptionToHTMLTest1, testSequence)
}

function DescriptionCreationTest1(resolve, reject)
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-2/xml")
        .then(function() {
            xmloutput.readClassDocumentation("Polygon")
                .then(function(classDocumentation) {
                    let outcome = tf.TestResultOutcome.eFailed
                    let functions = classDocumentation.getListOfFunctions()
                    if (functions.length == 1) {
                        let functionDocumentation = functions[0]
                        if (functionDocumentation.briefdescription &&
                            functionDocumentation.detaileddescription) {
                            outcome = tf.TestResultOutcome.ePassed
                        }
                    }
                    resolve(outcome)
                })
        })
}

function DescriptionToHTMLTest1(resolve, reject)
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-2/xml")
        .then(function() {
            xmloutput.readClassDocumentation("Polygon")
                .then(function(classDocumentation) {
                    let outcome = tf.TestResultOutcome.eFailed
                    let functions = classDocumentation.getListOfFunctions()
                    if (functions.length == 1) {
                        let functionDocumentation = functions[0]
                        if (functionDocumentation.briefdescription) {
                            let html = functionDocumentation.briefdescription.toHTML()
                            if (html == "<p>Draw the polygon. </p>") {
                                outcome = tf.TestResultOutcome.ePassed
                            }
                        }
                    }
                    resolve(outcome)
                })
        })
}

'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("DoxygenXMLOutput tests")

    new tf.FunctionBasedTest("Creation test 1", DoxygenXMLOutputCreationTest1, testSequence)
    new tf.FunctionBasedTest("initialize test 1", DoxygenXMLOutputInitializeTest1, testSequence)
}

function DoxygenXMLOutputCreationTest1()
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    return tf.TestResultOutcome.ePassed
}

function DoxygenXMLOutputInitializeTest1()
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-1/xml/index.xml")
    return tf.TestResultOutcome.ePassed
}

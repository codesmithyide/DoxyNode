'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("IndexFile tests")

    new tf.FunctionBasedTest("Creation test 1", IndexFileCreationTest1, testSequence)
    new tf.FunctionBasedTest("readFile test 1", IndexFileReadTest1, testSequence)
}

function IndexFileCreationTest1(resolve, reject)
{
    let indexfile = new doxynode.IndexFile()
    resolve(tf.TestResultOutcome.ePassed)
}

function IndexFileReadTest1(resolve, reject)
{
    let indexfile = new doxynode.IndexFile()
    indexfile.readFile(__dirname + "/data/cpp-code-1/xml/index.xml")
    resolve(tf.TestResultOutcome.ePassed)
}

const sinon = require('sinon');

/**
 * Wrapper to stub .exec() function of Model.findOne, etc.
 *
 * Usage:
 * ```
 * // resolve with something
 * MyModel.findOne = stubExec(sinon.stub().resolves(myThing))
 *
 * // reject with something
 * MyModel.findOne = stubExec(sinon.stub().rejects(myError))
 * ```
 */
function stubExec(execFn) {
  return sinon.stub().returns({
    exec: execFn,
  });
}


/**
 * Wrapper to stub .populate() function of Model.findOne, etc.
 *
 * Usage:
 * ```
 * // resolve with something
 * MyModel.findOne = stubPopulate(sinon.stub().resolves(myThing))
 *
 * // reject with something
 * MyModel.findOne = stubPopulate(sinon.stub().rejects(myError))
 * ```
 */
function stubPopulate(populateFn) {
  return sinon.stub().returns({
    populate: populateFn,
  });
}

module.exports = {
  stubExec,
  stubPopulate,
};

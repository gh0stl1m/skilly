// Http status codes
const responseCodes = {
  200: 'Success',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Time-out',
  500: 'Internal Server Error',
};

class ResponseCreator {
  constructor(ctx) {
    this.responseCodes = responseCodes;
    this.ctx = ctx;
  }

  /**
   * Method to add data to the body
   * @method
   * @param {Number} statusCode - Http status code
   * @param {Object} data - Data to returns
   * @param {Object} metadata - Additional information of the payload
   * @param {String} entity - Entity associated to the response
   * @returns {Object} - The method returns an object with the server response
   */
  addData({ statusCode = 200, data, metadata, entity } = {}) {
    this.ctx.status = (statusCode in this.responseCodes) ? statusCode : 200;
    // Build payload response
    const payload = {
      meta: {
        status: this.ctx.status,
        responseName: this.responseCodes[statusCode],
        ...metadata,
      },
    };
    if (!entity) {
      payload.data = data;
    } else {
      payload[entity] = data;
    }
    // Setup response in ctx
    this.ctx.body = payload;

    return this;
  }

  /**
   * Method to add error to the body
   * @method
   * @param {Number} statusCode - Http status code
   * @param {String} message - Message of error
   * @param {Object} metadata - Additional information of the payload
   * @returns {Object} - The method returns an object with the server response
   */
  addError({ statusCode = 400, message, metadata } = {}) {
    this.ctx.status = (statusCode in this.responseCodes) ? statusCode : 400;
    // Build payload response
    const payload = {
      meta: {
        status: this.ctx.status,
        responseName: this.responseCodes[statusCode],
        ...metadata,
      },
      error: {
        message,
      },
    };
    // Setup response in ctx
    this.ctx.body = payload;

    return this;
  }
}

module.exports = (ctx, next) => {
  ctx.serverResponse = () => new ResponseCreator(ctx);

  return next();
};

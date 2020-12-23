const ObjectID = require('mongoose').Types.ObjectId;

const {
  logger,
  BusinessError,
  constants: { errorTypes },
} = require('../utils');

/**
 * increaseUrlCounter sums up 1 when an URL is readed 
 * @param {urlID} ObjectID 
 */
const increaseUrlCounter = ({ StatisticsModel }) => async (urlID) => {
  if (!ObjectID.isValid(urlID)) {
    logger.error('[sk-statistics-module]: the URL provided is not an ID');
    throw new BusinessError(errorTypes.URL_ID_IS_REQUIRED, 'sk-statistics-module');
  }

  logger.info(`[sk-statistics-module]: Increasing the counter for URL ID ${urlID}`);
  const urlCounterStatus = await StatisticsModel.update({ url: urlID }, { $inc: { counter: 1 } });

  if ((urlCounterStatus.ok === 0) || (urlCounterStatus.nModified === 0)) {
    logger.error('[sk-statistics-module]: Something went wrong increasing the counter');

    throw new BusinessError(errorTypes.DATABASE_ERROR, 'sk-statistics-module'); 
  }
}

module.exports = {
  increaseUrlCounter,
}
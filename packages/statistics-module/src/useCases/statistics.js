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
  const urlCounterStatus = await StatisticsModel.updateOne({ url: urlID }, { $inc: { counter: 1 } }, { upsert: true });

  if (urlCounterStatus.ok === 0) {
    logger.error('[sk-statistics-module]: Something went wrong increasing the counter');

    throw new BusinessError(errorTypes.DATABASE_ERROR, 'sk-statistics-module'); 
  }
}

/**
 * This function allows to read the statistics of an URL based on the urlID 
 * @param {urlID} ObjectId
 * @param {Projection} Object - Parameters to be retrieved from the DB
 * 
 * @returns an Object with the data of the URL otherwise undefined  
 */
const readStatisticsByURlId = ({ StatisticsModel }) => async(urlID, projection = { _id: 1 }) =>  {
  if (!ObjectID.isValid(urlID)) {
    logger.error('[sk-statistics-module]: the URL provided is not an ID');
    throw new BusinessError(errorTypes.URL_ID_IS_REQUIRED, 'sk-statistics-module');
  }

  logger.info(`[sk-statistics-module]: Reading statistics for urlID ${urlID}`);
  const dataURL = await StatisticsModel.findOne({ url: urlID }, projection);

  return dataURL;
}

module.exports = {
  increaseUrlCounter,
  readStatisticsByURlId,
}
const { StatisticsModel } = require('./domains');
const { statisticsUseCases } = require('./useCases');

module.exports = {
  increaseUrlCounter: statisticsUseCases.increaseUrlCounter({ StatisticsModel }),
  readStatisticsByURlId: statisticsUseCases.readStatisticsByURlId({ StatisticsModel }),
};

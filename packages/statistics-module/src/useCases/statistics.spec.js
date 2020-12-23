const statisticsUseCases = require('./statistics');

describe('Statistics Use Cases', () => {
  describe('increaseUrlCounter', () => {
    it('Given a valid URL, then the function must increase its counter', async () => {
      // Arrange
      const urlID = '537eed02ed345b2e039652d2';
      const dependencies = {
        StatisticsModel: { updateOne: jest.fn(() => Promise.resolve({ ok: 1, nModified: 1 }))},
      };

      // Act
      const increaseCounter = statisticsUseCases.increaseUrlCounter(dependencies);
      await increaseCounter(urlID);
      
      // Asserts
      expect(dependencies.StatisticsModel.updateOne).toHaveBeenCalledWith({ url: urlID }, { $inc: { counter: 1 } }, { upsert: true });
    });

    it('Given an invalid URL, then the function must throws an error', async () => {
      // Arrange
      const urlID = 'some-id';
      const dependencies = {
        StatisticsModel: { update: jest.fn(() => Promise.reject())},
      };

      // Act
      const increaseCounter = statisticsUseCases.increaseUrlCounter(dependencies);
      
      // Asserts
      await expect(increaseCounter(urlID)).rejects.toThrow();
      expect(dependencies.StatisticsModel.update).not.toHaveBeenCalledWith({ url: urlID }, { $inc: { counter: 1 } });
    });

    it('Given a valid URL when the database operation fails, then the function must throws an error', async () => {
      // Arrange
      const urlID = 'some-id';
      const dependencies = {
        StatisticsModel: { update: jest.fn(() => Promise.resolve({ ok: 0, nModified: 0 }))},
      };

      // Act
      const increaseCounter = statisticsUseCases.increaseUrlCounter(dependencies);
      
      // Asserts
      await expect(increaseCounter(urlID)).rejects.toThrow();
      expect(dependencies.StatisticsModel.update).not.toHaveBeenCalledWith({ url: urlID }, { $inc: { counter: 1 } });
    });
  });

  describe('readStatisticsByURlId', () => {
    it('Given a valid urlID then the function must returns the statistics for that url', async () => {
      // Arrange
      const urlID = '537eed02ed345b2e039652d2'; 
      const urlObject = {
        _id: urlID,
        counter: 1,
      }
      const dependencies = {
        StatisticsModel: { findOne: jest.fn(() => Promise.resolve(urlObject)) },
      }

      // Act
      const getStatisticsUrl = statisticsUseCases.readStatisticsByURlId(dependencies);
      const dataUrl = await getStatisticsUrl(urlID, { counter: 1 });

      // asserts
      expect(dataUrl).toEqual(urlObject);
      expect(dependencies.StatisticsModel.findOne).toHaveBeenCalled();
    });

    it('Given an invalid URL ID then the function must thrown an error', async () => {
      // Arrange
      const urlID = '537eed02ed345b2e039652d2'; 
      const urlObject = {
        _id: urlID,
        counter: 1,
      }
      const dependencies = {
        StatisticsModel: { findOne: jest.fn(() => Promise.resolve(urlObject)) },
      }

      // Act
      const getStatisticsUrl = statisticsUseCases.readStatisticsByURlId(dependencies);

      // asserts
      await expect(getStatisticsUrl()).rejects.toThrow();
      expect(dependencies.StatisticsModel.findOne).not.toHaveBeenCalled();
    });
  });
});

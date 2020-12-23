const urlUseCases = require('./url');

describe('URL Use Cases', () => {
  describe('shortUrlGenerator', () => {
    it('Given a valid URL then the function must returns a short url', async () => {
      // Arrange
      const originalUrl = 'http://some-url.com';
      const fullHostname = 'http://localhost.com';
      const shortId = 'abc123';
      const urlObject = {
        _id: 'some-id',
        originalUrl,
        hash: shortId,
      }
      const dependencies = {
        URLModel: { create: jest.fn(() => Promise.resolve(urlObject)) },
        idGenerator: { generate: jest.fn(() => shortId) },
      };

      // Act
      const shortURlGenerator = urlUseCases.shortUrlGenerator(dependencies);
      const shortUrl = await shortURlGenerator(originalUrl, fullHostname);

      // asserts
      expect(shortUrl).toBe(`${fullHostname}/${shortId}`);
      expect(dependencies.URLModel.create).toHaveBeenCalledWith({
        originalUrl: urlObject.originalUrl,
        hash: shortId,
      });
      expect(dependencies.idGenerator.generate).toHaveBeenCalled();
    });

    it('Given an invalid URL then the function must thrown an error', async () => {
      // Arrange
      const originalUrl = 'some-url.com';
      const fullHostname = 'http://localhost.com';
      const shortId = 'abc123';
      const urlObject = {
        _id: 'some-id',
        originalUrl,
        hash: shortId,
      }
      const dependencies = {
        URLModel: { create: jest.fn(() => Promise.resolve(urlObject)) },
        idGenerator: { generate: jest.fn(() => shortId) },
      };

      // Act
      const shortURlGenerator = urlUseCases.shortUrlGenerator(dependencies);

      // asserts
      await expect(shortURlGenerator(originalUrl, fullHostname)).rejects.toThrow();
      expect(dependencies.URLModel.create).not.toHaveBeenCalledWith({
        originalUrl: urlObject.originalUrl,
        hash: shortId,
      });
      expect(dependencies.idGenerator.generate).not.toHaveBeenCalled();
    });
  });

  describe('readUrlByHash', () => {
    it('Given a valid hash then the function must returns the url object', async () => {
      // Arrange
      const originalUrl = 'some-url.com';
      const shortId = 'abc123';
      const urlObject = {
        _id: 'some-id',
        originalUrl,
      }
      const dependencies = {
        URLModel: { findOne: jest.fn(() => Promise.resolve(urlObject)) },
      }

      // Act
      const getUrlByHash = urlUseCases.readUrlByHash(dependencies);
      const dataUrl = await getUrlByHash(shortId, { hash: 1 });

      // asserts
      expect(dataUrl).toEqual(urlObject);
      expect(dependencies.URLModel.findOne).toHaveBeenCalled();
    });

    it('Given an invalid URL then the function must thrown an error', async () => {
      // Arrange
      const originalUrl = 'some-url.com';
      const urlObject = {
        _id: 'some-id',
        originalUrl,
      }
      const dependencies = {
        URLModel: { findOne: jest.fn(() => Promise.resolve(urlObject)) },
      }

      // Act
      const getUrlByHash = urlUseCases.readUrlByHash(dependencies);

      // asserts
      await expect(getUrlByHash()).rejects.toThrow();
      expect(dependencies.URLModel.findOne).not.toHaveBeenCalled();
    });
  });
});

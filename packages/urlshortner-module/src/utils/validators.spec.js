const validators = require('./validators');

describe('validators', () => {
  describe('isValidUrl', () => {
    it('Given a valid URL then the function must returns true', () => {
      // Arrange
      const url = 'http://some-url.com';

      // Act
      const isValid = validators.isValidUrl(url);

      // Asserts
      expect(isValid).toBe(true);
    });

    it('Given a not valid URL, then the fuction must returns false', () => {
       // Arrange
      const url = 'some-url.com';

      // Act
      const isValid = validators.isValidUrl(url);

      // Asserts
      expect(isValid).toBe(false);     
    });

    it('Not given an URL, then the fuction must returns false', () => {
      // Act
      const isValid = validators.isValidUrl();

      // Asserts
      expect(isValid).toBe(false);     
    })
  });
})
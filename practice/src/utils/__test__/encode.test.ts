import {decryptAccessToken, encryptAccessToken} from '../encode';

describe('encryptAccessToken', () => {
  test('Encrypts the given access token by shifting each character Unicode value by 1.', () => {
    const accessToken = 'access123';
    const expectedEncryptedPassword = 'bddftt234';
    const encryptedAccessToken = encryptAccessToken(accessToken);

    expect(encryptedAccessToken).toBe(expectedEncryptedPassword);
  });
});

describe('decryptAccessToken', () => {
  test('decryptAccessToken the given access token by shifting each character Unicode value by 1.', () => {
    const accessToken = 'bddftt234';
    const expectedDecryptedPassword = 'access123';
    const decryptedAccessToken = decryptAccessToken(accessToken);

    expect(decryptedAccessToken).toBe(expectedDecryptedPassword);
  });
});

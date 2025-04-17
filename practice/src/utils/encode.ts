/**
 * Encrypts the given access token by shifting each character's Unicode value by 1.
 * @param {string} accessToken - The access token to be encrypted.
 * @returns {string} - The encrypted access token.
 */
export const encryptAccessToken = (accessToken: string): string => {
  let encryptedAccessToken = '';

  for (let i = 0; i < accessToken?.length; i++) {
    const encryptedCharCode = accessToken.charCodeAt(i) + 1;

    encryptedAccessToken += String.fromCharCode(encryptedCharCode);
  }

  return encryptedAccessToken;
};

/**
 * Decrypts the given access token by shifting each character's Unicode value by 1.
 * @param {string} accessToken - The access token to be decrypted.
 * @returns {string} - The decrypted access token.
 */
export const decryptAccessToken = (accessToken: string): string => {
  let decryptedAccessToken = '';

  for (let i = 0; i < accessToken.length; i++) {
    const decryptedCharCode = accessToken.charCodeAt(i) - 1;

    decryptedAccessToken += String.fromCharCode(decryptedCharCode);
  }

  return decryptedAccessToken;
};

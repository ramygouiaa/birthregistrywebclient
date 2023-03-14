// Get identity from server
async function testRequest() {
    try {
      const response = await fetch('http://localhost:3000');
      const text = await response.text();
      return text
    } catch (error) {
      console.error(error);
    }
  }

  /* 
  {
    "privateKey": "0xd5e9d89af2ebd14d0cddd45b74bf6c6245f3ee9444cc5c40b0e285571ccb4ea4",
    "publicKey": "05b3ef07de3d49491f7459202ba96fa215abbba696300710ae78837f47652cf8844cbbeb84b552e3d06c1624c1d2cabe98da16b525b102914eb7fbe7b3f8a23f",
    "address": "0x0eF62f18b3675959390bdB544ebf822f7E61092c"
  }
  
  */

  /**
   * 
   * @param {*} publicKey the publicKey to encrypt the data
   * @param {*} payload the data object
   * @returns encrypted data object 
   */
  async function sendPayloadToEncryptionService(publicKey, payload) {
    try {
      const response = await fetch('http://localhost:3000/encryptpayload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          publicKey: publicKey,
          payload: payload
        })
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }
    
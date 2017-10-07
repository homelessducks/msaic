const fs = require('fs');

class Encoder {
  constructor() {
    this.filePath = `${__dirname}/files/`;
  }

  /**
   * @param data {array}
   * @param fileName {string}
   *
   * @return {String, Error}
  * */
  encode(data, fileName) {
    if (!data || !fileName) return new Error('No arguments');

    const file = `${fileName}.json`;

    fs.writeFileSync(this.filePath + file, JSON.stringify(data));

    return file;
  }

  /**
   * @param fileName {string}
   *
   * @return {Array, Error}
  * */
  decode(fileName) {
    try {
      if (!fileName) return new Error('No arguments');

      return JSON.parse(fs.readFileSync(this.filePath + fileName, 'utf8'));
    } catch (e) {
      return e;
    }
  }
}

module.exports = Encoder;

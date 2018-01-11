const Credential = require('./credential');

class CredentialBuilder {

    /**
     * create a instance of Credential from raw data
     * @param rawData
     * @return {Credential}
     */
    build(rawData) {
        return new Credential(rawData);
    }
}

module.exports = CredentialBuilder;


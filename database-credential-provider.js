const VError     = require('verror');

class DatabaseCredentialProvider {

    /**
     *
     * @param database
     * @param hash
     * @param config
     * @param credentialBuilder
     */
    constructor(database, hash, config, credentialBuilder) {
        this.hash     = hash;
        this.database = database;
        this.config   = config;
        this.credentialBuilder = credentialBuilder;
    }

    /**
     *
     * @param {string} username
     * @param {string} password
     * @return {Promise<Credential>}
     */
    async provide(username, password) {
        const identityField   = this.config.session.identityField;
        const passwordField = this.config.session.passwordField;

        const raw = (await this.database.table(this.config.session.credentialTable)
            .where({[identityField]: username}).limit(1))[0]
        ;

        // check password
        if ( ! raw || ! await this.hash.check(password, raw[passwordField])) {
            throw new VError('E_AUTH: Invalid username or password');
        }

        return this.credentialBuilder.build(raw)
    }

}

module.exports = DatabaseCredentialProvider;
const VError = require('verror');

class DatabaseCredentialProvider {

    /**
     *
     * @param database
     * @param hash
     * @param config
     * @param builder
     */
    constructor(database, hash, config, builder) {
        this.hash     = hash;
        this.database = database;
        this.config   = config;
        this.builder  = builder;
    }

    /**
     *
     * @param {string} username
     * @param {string} password
     * @return {Promise<Credential>}
     */
    async provide(username, password) {
        const identityField = this.config.session.identityField;
        const passwordField = this.config.session.passwordField;

        // get credential via username
        const raw = (await this.database.table(this.config.session.credentialTable)
            .where({[identityField]: username}).limit(1))[0]
        ;

        // if credential exists check the password is valid
        if ( ! raw || ! await this.hash.check(password, raw[passwordField])) {
            throw new VError('E_AUTH: Invalid username or password');
        }

        return this.builder.build(raw)
    }
}

module.exports = DatabaseCredentialProvider;

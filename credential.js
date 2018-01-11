class Credential {

    /**
     *
     * @param identity
     */
    constructor(identity) {
        this.identity = identity;
    }

    /**
     *
     * @return {*}
     */
    getIdentity() {
        return this.identity;
    }
}

module.exports = Credential;
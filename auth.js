class Auth {

    /**
     *
     * @param {string} sessionAuthKey
     */
    constructor(sessionAuthKey) {
        this.sessionAuthKey = sessionAuthKey;
        this.session        = null;
    }

    /**
     * set session for auth service as a dependence
     * @param session
     * @return {Auth}
     */
    setSession(session) {
        this.session = session;
        return this;
    }

    /**
     * login with a credential
     * store credential to session
     * @param credential
     * @return {Auth}
     */
    login(credential) {
        this.session.set(this.sessionAuthKey, credential);
        return this;
    }

    /**
     * logout
     * @return {Auth}
     */
    logout() {
        this.session.unset(this.sessionAuthKey);
        return this;
    }

    /**
     * check user is guest
     * @return {boolean}
     */
    guest() {
        return !this.loggedIn();
    }

    /**
     * check user is logged
     * @return {boolean}
     */
    loggedIn() {
        return this.session.has(this.sessionAuthKey);
    }

    /**
     * get back credential from session
     * @return {Credential}
     */
    getCredential() {
        return this.session.get(this.sessionAuthKey);
    }
}

module.exports = Auth;

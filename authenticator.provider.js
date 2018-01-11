const Auth                 = require('./auth');
const CredentialProvider   = require('./database-credential-provider');
const CredentialBuilder    = require('./credential.builder');
const Credential           = require('./credential');

module.exports.register = async (container) => {
    const config = await container.make('config');

    container.singleton('auth', async () => {
        let auth = new Auth(config.auth.session.credentialKey);
        let events = await container.make('events');

        // authenticator set session as a dependence when session already started
        events.on('session.started', session => auth.setSession(session));

        return auth;
    });

    container.singleton('auth.credential-provider', async () => {
        return new CredentialProvider(
            await container.make('database'),
            await container.make('hash'),
            config.auth,
            await container.make('auth.credential-builder')
        );
    });

    container.singleton('auth.credential-builder', async () => {
        return new CredentialBuilder();
    })
};

module.exports.boot = async (container) => {
    const serializer = await container.make('serializer');

    /**
     * register Credential type
     */
    serializer.forType(Credential, (credential) => {
        return credential.getIdentity();
    }, (raw) => {
        return new Credential(raw)
    });
};


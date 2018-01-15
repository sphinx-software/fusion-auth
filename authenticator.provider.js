const Auth                 = require('./auth');
const CredentialProvider   = require('./database-credential-provider');
const CredentialBuilder    = require('./credential.builder');
const Credential           = require('./credential');

module.exports.register = async (container) => {
    
    container.singleton('auth', async () => {
        const config = await container.make('config');
        
        return new Auth(config.auth.session.credentialKey);
    });

    container.singleton('auth.credential-provider', async () => {
        const config = await container.make('config');
        
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
    const auth       = await container.make('auth');
    const events     = await container.make('events');

    // authenticator set session as a dependence when session already started
    events.on('session.started', session => auth.setSession(session));

    // register Credential type
    serializer.forType(Credential, (credential) => {
        return credential.getIdentity();
    }, (raw) => {
        return new Credential(raw)
    });
};


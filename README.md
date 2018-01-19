# Fusion Authenticator
    
 Fusion authenticator is authentication package for [Sphinx Software Fusion](https://github.com/sphinx-software/sphinx-web-skeleton)
 framework.
   
## Install

    $ npm install @sphinx-software/fusion-auth

## Usage

#### Configure session authentication  

- authenticate with username and password
```json
{
    "session": {
        "credentialTable": "credentials",
        "identityField": "username",
        "passwordField": "password",
        "credentialKey": "sphinx-credential"
    }
}
```
- authenticate with email and password
```json
{
    "session": {
        "credentialTable": "user",
        "identityField": "email",
        "passwordField": "password",
        "credentialKey": "sphinx-credential"
    }
}
```

#### Register authentication service
```javascript
    module.exports = {
    
        // Services will be used for the application
        providers: [
            // Extended providers
            require('@sphinx-software/fusion-auth/authenticator.provider'),
        ],
    
        // Services related configuration
        auth: require('./auth'),
    };

```


#### Auth Controller
```javascript
    module.exports = {
        //...
        injects: [
            // Injects dependencies by its metadata here
            require('app/http/welcome.controller'),
            require('app/http/auth.controller'),
            require('app/command/quotes.command')
        ],
    }
```
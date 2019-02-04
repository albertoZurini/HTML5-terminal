# HTML5 terminal emulator

Control your PC terminal from the browser.

# How to use

On your server run 

```npm install```

Then

```cd keys; ./keys/gen_keys.sh```

And finally

```node app.js```

# Configuration

Into app.js you can config two parameters:
```USE_SSL```

Which set to true will use HTTPS, and set to false will use HTTP
```PORT```
to choose which port to use
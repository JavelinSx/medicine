const winston = require('winston')
const expressWinston = require('express-winston')

const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({filename: 'request.log'})
    ],
    format: winston.format.combine(
        winston.format.json()
      ),
      requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query', 'headers', 'body'],
      requestFilter: (req, propName) => {
        if (propName === 'password') {
          return undefined;
        }
        return req[propName];
      },
});

const errorLogger = expressWinston.errorLogger({
    transports:[
        new winston.transports.File({filename: 'error.log'})
    ],
    format: winston.format.json()
})

module.exports = {
    requestLogger,
    errorLogger,
};
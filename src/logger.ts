import {transports,Logger} from 'winston';

export const logger = new (Logger)({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'NodeWithMongo.log' })
      ],
      exceptionHandlers: [
        new transports.File({ filename: 'NodeWithMongo_exceptions.log' })
      ]
});
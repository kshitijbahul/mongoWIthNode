'use strict';

import * as express from 'express';
import * as mongo from 'mongodb';
import {logger} from './logger';
import * as _ from 'lodash';
import * as path from 'path';


let app = express();
app.listen('3011',()=>{logger.info('Express is up')})
app.use(express.json());
const MongoClient = mongo.MongoClient;
let db =null;
let getMongoConnection = (callback)=>{
    if (!db) {
        logger.info('Here in mongo the first if condition');
        MongoClient.connect('mongodb://192.168.1.231:32768',(err,client)=>{
            logger.info('Here in mongo connection the info is ',err);
            
            db = client.db('testDB');
            callback(db);
        });
    }
    else{
        callback(db);
    }
    
}



app.post('/insertrec',(req,res)=>{
    logger.info('Came here in the end point',req.body);
    logger.info('The mongo are');
    getMongoConnection((db)=>{
        logger.info('Entered the Callback Function');
        let collection = db.collection('test');
        const allVars = []
        collection.insertOne({name:"same"},(error,result)=>{
            logger.info('result after insert one is ',result.result);
        });
        logger.info('The mongo are');
        res.send('Got you ');
    });
    
});
app.post('/insertAllRecord',(req,res)=>{
    getMongoConnection((db)=>{
        logger.info('Entered the Callback Function insertAllRecord');
        let collection = db.collection('test');
        const allVars = [{"name":103},{"name":104},{"name":130},{"name":140}]
        //var bulk = collection.initializeUnorderedBulkOp();
        collection.bulkWrite({insertMany:allVars},{"ordered":false},(error,result)=>{
            logger.info('result after insert all is ',result);
            logger.info('error after insert all is ',JSON.stringify(error));
            logger.info('The mongo are');
            res.send('Got you ');
        });
        /*bulk.insert({"name":10});
        bulk.insert({"name":100});
        bulk.insert({"name":130});
        bulk.insert({"name":140});
        bulk.execute();
        */
        
    });
});




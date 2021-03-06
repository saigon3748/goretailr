import { EventEmitter } from 'events';
import mongoose from 'mongoose';

export default class MongoDb extends EventEmitter {
  init() {
    mongoose.connect(process.env.MONGODB);
    
    mongoose.connection.on('connected', () => {  
      this.emit('MONGODB_CONNECTED');
    }); 

    mongoose.connection.on('disconnected', () => {  
      this.emit('MONGODB_DISCONNECTED');
    });

    mongoose.connection.on('error', err => {  
      this.emit('MONGODB_ERROR', err);
    }); 
  }
}

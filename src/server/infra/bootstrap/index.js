import { EventEmitter } from 'events';
import MongoDb from './mongodb';

export default class Bootstrap extends EventEmitter {
  start() {
    new MongoDb().init();
  }
}

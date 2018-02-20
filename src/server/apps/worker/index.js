import Bootstrap from '../../infra/bootstrap';
import Database from './database';

new Bootstrap().start();

Database.run();

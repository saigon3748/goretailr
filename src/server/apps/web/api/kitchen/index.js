import express from 'express';
import controller from './controller';
import middleware from '../../middleware';

export default express.Router()
  .get('/', 
    middleware.authenticate, 
    middleware.intercept(controller, 'find'))

  .get('/today', 
    middleware.authenticate, 
    middleware.intercept(controller, 'getToday'))

  .put('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'updateById'))

  .post('/markCompleted', 
    middleware.authenticate, 
    middleware.intercept(controller, 'markCompleted'))

  .post('/markUncompleted', 
    middleware.authenticate, 
    middleware.intercept(controller, 'markUncompleted'))

  .delete('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'deleteById'))

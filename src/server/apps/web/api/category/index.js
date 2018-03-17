import express from 'express';
import controller from './controller';
import middleware from '../../middleware';

export default express.Router()
  .get('/', 
    middleware.authenticate, 
    middleware.intercept(controller, 'find'))

  .post('/', 
    middleware.authenticate, 
    middleware.intercept(controller, 'create'))

  .get('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'findById'))

  .put('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'updateById'))

  .delete('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'deleteById'))

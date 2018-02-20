import pipeline from '../../../libs/pipeline';
import Tenant from './tenant';
import User from './user';

export default {
  run: function() {
    return pipeline([
        Tenant.do,
        User.do
      ]).catch(err => {
        console.log("An error occured in database worker", err);
      })
  }
}

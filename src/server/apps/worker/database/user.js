import _ from 'lodash';
import mongodb from 'mongodb';
import pipeline from '../../../libs/pipeline';
import UserSchema from '../../../domain/user/schema';

export default {
  do: function() {
    let doSeedData = () => {
      UserSchema.findOne({ username: 'sudo' })
        .then(item => {
          if (!item) {
            UserSchema.create({
              username: 'sudo',
              password: 'nemo',
              name: 'sudo'
            });
          }
        });
    }

    return pipeline([
        doSeedData
      ]).catch(err => {
        console.log("An error occured in user database worker", err);
      })
  }
}

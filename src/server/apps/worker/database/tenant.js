import _ from 'lodash';
import mongodb from 'mongodb';
import pipeline from '../../../libs/pipeline';
import UserSchema from '../../../domain/user/schema';

export default {
  do: function() {
    let doIndexText = () => {
      // mongodb.MongoClient.connect(process.env.MONGODB, function (err, db) {
      //   db.collection('tenants').ensureIndex({
      //     name: "text", 
      //     code: "text"
      //   }, {
      //     name: "text"
      //   })
      // })
    }

    return pipeline([
        doIndexText
      ]).catch(err => {
        console.log("An error occured in tenant database worker", err);
      })
  }
}

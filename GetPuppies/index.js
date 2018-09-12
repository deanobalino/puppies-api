const conn = require('./../shared/utils');
const handleError = require('./../shared/error');
module.exports = function(context) {
  conn
    .connect()
    .then(client => {
      query(client);
    })
    .catch(err => handleError(500, err, context));

  const query = client => {
    const db = client.db('admin');

    db.collection('Puppies')
      .find()
      .toArray()
      .then(res => {
        context.log('This is a happy moment');
        res.forEach(puppy => delete puppy._id);

        context.res = {
          //status: 200,
          body: res
        };
        context.done();
      })
      .catch(err => handleError(500, err.stack, context));
  };
};

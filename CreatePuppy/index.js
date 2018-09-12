const conn = require('./../shared/utils');
const handleError = require('./../shared/error');
module.exports = function(context, req) {
  conn
    .connect()
    .then(client => {
      query(client);
    })
    .catch(err => handleError(500, err, context));

  const query = client => {
    let puppy = ({ id, name, saying } = context.req.body);
    const db = client.db('admin');

    db.collection('Puppies')
      .insertOne({
        id: puppy.id,
        name: puppy.name,
        saying: puppy.saying
      })
      .then(res => {
        context.res = {
          body: puppy
        };
        context.done();
      })
      .catch(err => {
        context.log('Failed to query');
        context.res = { status: 500, body: err.stack };
        context.done();
      });
  };
};

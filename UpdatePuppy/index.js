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
    const db = client.db('admin');
    const puppy = ({ id, name, saying } = context.req.body);
    db.collection('Puppies')
      .findOneAndUpdate(
        { id: context.req.params.id },
        { id: puppy.id, name: puppy.name, saying: puppy.saying }
      )
      .then(puppy => {
        context.res = {
          body: puppy
        };
        context.done();
      })
      .catch(err => handleError(500, err, context));
  };
};

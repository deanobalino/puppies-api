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
    db.collection('Puppies')
      .findOneAndDelete({ id: context.req.params.id })
      .then(res => {
        context.res = {
          status: 200,
          body: { message: 'Puppy deleted successfully!' }
        };
        context.done();
      })
      .catch(err => handleError(500, err, context));
  };
};

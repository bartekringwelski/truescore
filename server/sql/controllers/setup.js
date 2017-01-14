// Copyright <2017> <Michael Thelen, Bartek Rigngwelski, Niel Romana, Nikshala Velayutham>

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const db = require('../db/db_index');
const seedDatabase = require('./seedDatabase');
const stats = require('./stats');
const seedWinLoss = require('../../../docs/tests/winloss');


module.exports = {
  dangerwipedatabase: {

    get: function(req, res){
      db.database.dropAllSchemas()
      .then(result => {
        db.User.sync();

        db.Choice.sync();

        db.Prompt.sync()

        .then(() =>
          db.Comparison.sync()
          .then(() => {
            seedDatabase();
            res.send("Done");

          })
        );

      });
    }
  },

  seedwinloss: {

    get: function(req, res){
      seedWinLoss();
      res.send('comparisons seeded');
    }
  },

  testroute: {
    get: function(req, res){

      // db.database.query(`select winnerId, count(*) from comparisons
      // where promptId = 1 group by winnerId`)
      // .spread((results, metadata) => res.send(results))

      const derp = 1;


      db.database.query(`select c.id, c.name, w.wins, l.losses from
      choices as c left join
      (select winnerId, count(*) as wins from comparisons where promptId = ${derp} group by winnerId)
      as w on c.id = w.winnerId
      left join
      (select loserId, count(*) as losses from comparisons where promptId = ${derp} group by loserId)
      as l on c.id = l.loserId`)
      .spread((results, metadata) => res.send(results));



    }

  }

};

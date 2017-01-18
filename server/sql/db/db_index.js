// Copyright <2017> <Michael Thelen, Bartek Rigngwelski, Neil Romana, Nikshala Velayutham>

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const Sequelize = require('sequelize');


if(process.env.CLEARDB_DATABASE_URL){

  var db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    dialect: 'mysql'
  })

} else {


   var db = new Sequelize('truescore', 'root', 'abc', {
      dialect: 'mysql',
      port: 3306,
      host: 'localhost'
    }) // DB, user, password

}

  console.log("PROCESS.ENV", process.env.CLEARDB_DATABASE_URL);

/////////////////
//   Tables    //
/////////////////

const User = db.define('user', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  fbId: {
    type: Sequelize.STRING,
    unique: true
  }
  // token: {
  //   type: Sequelize.STRING,
  //   unique: true
  // },
  // name: {
  //   type: Sequelize.STRING,
  //   unique: true
  // },
  // minifbPhoto: {
  //   type: Sequelize.STRING,
  //   unique: true
  // },
  // bigfbPhoto: {
  //   type: Sequelize.STRING,
  //   unique: true
  // },
  // email: {
  //   type: Sequelize.STRING,
  //   unique: true
  // }
});

const Choice = db.define('choice', {
  name: Sequelize.STRING,
  imageUrl: Sequelize.STRING
});

const Prompt = db.define('prompt', {
  text: Sequelize.STRING,
  title: Sequelize.STRING,
  tileImage: Sequelize.STRING,
  sensitive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

const Comparison = db.define('comparison', {});


///////////////////////
//   Relationships   //
///////////////////////

//Puts userId as foreign key on Comparison
//Then enables getComparisons on the User Model with the has many call
Comparison.belongsTo(User);
User.hasMany(Comparison);

Comparison.belongsTo(Prompt);
Prompt.hasMany(Comparison);

//puts choiceId on Comparison aliased as Winner
//then enables Choice.getWinner so collect all the comparisons it won
Comparison.belongsTo(Choice, {as: 'winner'});
//Choice.hasMany(Comparison, {as: 'winner'});

Comparison.belongsTo(Choice, {as: 'loser'});
//Choice.hasMany(Comparison, {as: 'loser'});


/////////////////////
//  Create Tables  //
/////////////////////

// add {force: true} to have syncs drop tables
User.sync();
Choice.sync();
Prompt.sync();
Comparison.sync();



/////////////////////
//  Export Models  //
/////////////////////
exports.database = db;
exports.User = User;
exports.Choice = Choice;
exports.Prompt = Prompt;
exports.Comparison = Comparison;

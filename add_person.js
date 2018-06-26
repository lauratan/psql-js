const pg = require("pg");
const settings = require("./settings");
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const dob = process.argv[4];

knex('famous_people')
.insert({first_name: firstName, last_name: lastName, birthdate: dob})
    .asCallback(function(err, rows) {
        if (err) return console.error(err);
        return knex.destroy()
    });
// knex.select('first_name', 'last_name', 'birthdate').from('famous_people')
// .insert({first_name: firstName, last_name: lastName, birthdate: dob}).into('famous_people')
// .catch(function(error){
//     console.error(error)
//     return knex.destroy();
// });




  

const pg = require("pg");
const settings = require("./settings");
const moment = require('moment');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
});

const name = process.argv[2];
knex.select('*').from('famous_people')
.where('first_name', '=', name) 
.asCallback(function(err, rows) {
    if (err) return console.error(err);
    // console.log(rows);
    console.log("Searching...");
    console.log(`Found ${(rows.length)} person(s) by the name of ${name}:`);
    //   console.log(result.rows);
    const printUsers = (item, index) => {
        let year = item.birthdate;
        console.log(`-${index + 1}: ${name} ${item.last_name}, born '${moment(item.birthdate).format('YYYY-MM-DD')}'`);}

    rows.forEach(printUsers);
    return knex.destroy();
});


  

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
    let name = process.argv[2];
    if (err) {
      return console.error("Connection Error", err);
    }
    console.log("Searching...");
    client.query("SELECT * FROM famous_people WHERE first_name = $1", [name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
    //   console.log(Object.keys(result.rows).length);
      console.log(`Found ${result.rowCount} person(s) by the name of ${name}:`);
    //   console.log(result.rows);
      const printUsers = (item, index) => {
        let year = item.birthdate;
        console.log(`-${index + 1}: ${name} ${item.last_name}, born '${item.birthdate}'`)};
        
      result.rows.forEach(printUsers);
      client.end();
    });
  });





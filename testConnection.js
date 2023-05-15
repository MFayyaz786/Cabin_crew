const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'pass1234',
  database: 'Airport_Cabin_Crew_dev',
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database successfully');
  }

  client.end();
});

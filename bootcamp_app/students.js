const month = process.argv[2];
const output = process.argv[3];

const {Pool} = require('pg');

const pool = new Pool({
  user : 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT students.id AS student_id, students.name AS student_name, cohorts.name
  FROM students 
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`)
.then(res => {
  // console.log(res.rows);
  for (let i = 0; i < output; i++) {
    console.log(`${res.rows[i]["student_name"]} has an id of ${res.rows[i]["student_id"]} and was in the ${res.rows[i]["name"]} cohort`);
    
  }
})
.catch(err => console.error('query error', err.stack));
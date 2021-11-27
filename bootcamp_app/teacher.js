const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const month = [process.argv[2]];
const sql =  `
  SELECT 
    teachers.name AS teacher,
    cohorts.name AS cohort,
    COUNT(*) AS total_assist
  FROM assistance_requests
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  JOIN teachers ON teacher_id = teachers.id
  WHERE cohorts.name = $1
  GROUP BY teachers.name, cohorts.name
  ORDER BY teacher;
`

pool.query(sql, month)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
})
.catch(err => {
  console.error('query error', err.stack);
});
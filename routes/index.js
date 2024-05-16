var express = require('express');
var router = express.Router();

const mysql = require("mysql2/promise");
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '123456789',  // <== ระบุให้ถูกต้อง
    database: 'student_database',
    port: '9900'  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ระบบลงทะเบียนเรียน' });
});

router.get('/register', async (req, res, next) => {

  const connection = await dbConn;
  const regs = await connection.query('SELECT * from students');
  // res.send(regs);
  console.log(regs[0]);
  res.render('register', { title: 'ระบบลงทะเบียนเรียน', status_txt: 1 , regs : regs[0] ,txt_show : ''});
});

router.post('/register', async (req, res, next) => {

  console.log(req.body);
  var name = req.body.name;
  var age = req.body.age;
  var phone = req.body.phone;
  var email = req.body.email;
  var status = 0;
  var regs = "";

  if(name != '' && age != '' && phone != '' && email != '')
  {
    
    const connection = await dbConn;
    const rows = await connection.query("INSERT INTO students (name,age,phone,email) values('"+name+"','"+age+"','"+phone+"','"+email+"')");
    
    if(rows.length > 0)
    {
      status = 1
      regs = await connection.query('SELECT * from students')
    }
  }


  console.log(regs);
  res.render('register', { title: 'ระบบลงทะเบียนเรียน', status_txt: status , regs : regs[0] });
});

module.exports = router;

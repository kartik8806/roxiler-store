const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt  =  require('jsonwebtoken')



const app = express();
app.use(cors())
app.use(express.json());

app.get('./', (req, res) => {
    return res.json("from the Backend");
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"root",
    database:"signup"
 
   
});

app.post('/signup', (req, res) => {
    const {name,
        email,
        password,
        address} = req.body;
        const role = 'user';
    const sql = 'INSERT INTO User(`name`, `email`, `password`, `address`,`role`) VALUES (?,?,?,?,?)';
    const values = [
      name,
      email,
      password,
      address,
      role
    ];
  
    connection.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error");
      }
      return res.json(data);
    });
  });

  


//   for login
  app.post('/login', (req, res) => {
    const {
        email,
        password,
        } = req.body;

        console.log(email);
        
    
        const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
      
   
  
     connection.query(sql,[email,password], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error");
      }
      console.log(data);

      const user = {id: data[0].id, email:email}
      
       if(data.length > 0){
        const token = jwt.sign({
            id:user.id,email:user.email,role: user.role
        }, "asdfghjkl",{expiresIn:'7d'})
        return res.json({data,token});
       }else {
            return res.json("failed")
       }
       
    });
   
  });

  // Get TotalUserData
  app.get("/get-UserData", (req, res, next) => {
  const sql = "SELECT * FROM user"; 
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("User data fetch error:", err);
      return next(new ErrorHandler("Error fetching user data", 500));
    }
    return res.status(200).json(data);
  });
});


  // create store 

  app.post('/create-store', (req, res) => {
    const {store_name,
        store_address,
        store_email,
        rating
      } = req.body;
    const sql = 'INSERT INTO store(`store_name`, `store_email`, `store_address`) VALUES (?,?,?)';
    const values = [
      store_name,
      store_email,
      store_address,
      rating
      
    ];
    connection.query(sql,values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error");
      }
      return res.json(data);
    });
  });


  app.get("/get-all-store",(req,res)=>{
    const sql = 'select * from store' ;



     connection.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error");
      }
      return res.json(data);
    });
  })

   app.get("/get-all-user",(req,res)=>{
    const sql = 'select * from user' ;
    


     connection.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error");
      }
      return res.json(data);
    });
  })



// Create Rating (POST /new-rating)
app.post("/new-rating", async (req, res) => {
  const { rating, user_id, store_id } = req.body;

  
  const sql = `INSERT INTO rating (store_id, user_id, rating) VALUES (?, ?, ?)`;
  const values = [store_id, user_id, rating];
   
   connection.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error");
      }
      return res.json(data);
    });
 
});



// Get All Ratings (GET /all-ratings)
app.get("/all-ratings", async (req, res) => {
  const sql = `SELECT * FROM rating`;

  connection.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error");
      }
      return res.json(data);
    });
});


// update password in profile
app.put("/update-password/:id", (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const sql = `UPDATE user SET password = ? WHERE id = ?`;
  connection.query(sql, [password, id], (err, result) => {
    if (err) {
      console.error("Error updating password:", err);
      return next(new ErrorHandler("Error updating password", 500));
    }
    return res.status(200).json({ message: "Password updated successfully" });
  });
});






app.listen(8081, () => {
    console.log("server listing  on 8081");
});
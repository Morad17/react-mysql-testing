const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employee'
})

app.post('/create', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const nationality = req.body.nationality
    const gender = req.body.gender

    db.query('INSERT INTO employee_table (name, age, nationality, gender) VALUES (?,?,?,?)', 
    [name, age, nationality, gender], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Inserted Values")
        }
    })

})

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employee_table", (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.delete('/delete/:name', (req, res) => {
    const name = req.params.name
    const sqlDelete = 
        "DELETE FROM employee_table WHERE name = ?"

    db.query(sqlDelete, name, (err,res) => {
        if (err){
            console.log(err);
        }else {

        }
    })
})

// app.put('/update', (req, res) => {
//     const name = req.params.name
//     const employee = req.body.
//     const sqlUpdate= "UPDATE SET employee_table employee = ? WHERE name = ?"

//     db.query(sqlUpdate, [], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {

//         }
//     })
// })

app.listen(3001, ()=> {
    console.log('successfully running on port 3001')
})
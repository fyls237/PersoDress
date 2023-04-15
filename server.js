const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_dressing'
})

db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('connection reussi avec la base de donnee')
})

app.get('/api/vetements', (req, res) => {
  const sql = 'SELECT * FROM vetements'
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

app.post('/api/vetements', (req, res) => {
  const { cathegorie, taille, marque, couleur } = req.body
  const sql = 'INSERT INTO vetements (cathegorie, taille, marque, couleur) VALUES (?, ?, ?, ?)'
  db.query(sql, [cathegorie, taille, marque, couleur], (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`)
})
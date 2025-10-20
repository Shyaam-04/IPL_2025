import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});

db.connect(error => {
  if (error) throw error;
  console.log("MySQL connected!");
});

// Get all teams
app.get('/teams', (req, res) => {
  db.query('SELECT * FROM teams', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get players for a team
app.get('/teams/:teamId/players', (req, res) => {
  const teamId = req.params.teamId;
  const sql = 'SELECT * FROM player WHERE TeamID = ?';
  db.query(sql, [teamId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get player details and stats
app.get('/players/:playerId', (req, res) => {
  const playerId = req.params.playerId;
  db.query('SELECT * FROM player WHERE PlayerID = ?', [playerId], (err, playerResults) => {
    if (err) return res.status(500).send(err);
    db.query('SELECT * FROM battingstats WHERE PlayerID = ?', [playerId], (err2, battingResults) => {
      if (err2) return res.status(500).send(err2);
      db.query('SELECT * FROM bowlingstats WHERE PlayerID = ?', [playerId], (err3, bowlingResults) => {
        if (err3) return res.status(500).send(err3);
        res.json({ player: playerResults[0], batting: battingResults[0], bowling: bowlingResults[0] });
      });
    });
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

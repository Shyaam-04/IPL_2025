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
app.get('/', (req, res) => {
  db.query('SELECT * FROM teams', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get players for a team
app.get('/:TeamID/players', (req, res) => {
  const TeamID = req.params.TeamID;
  const sql = 'SELECT * FROM players WHERE TeamID = ?';
  db.query(sql, [TeamID], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get player details and stats
app.get('/players/:PlayerID', (req, res) => {
  const playerId = req.params.PlayerID;

  db.query('SELECT * FROM players WHERE PlayerID = ?', [playerId], (err, playerResults) => {
    if (err) return res.status(500).send(err);
    if (playerResults.length === 0) return res.status(404).json({error: 'Player not found'});
    return res.json({ player: playerResults[0] });
  });
});

app.get('/players/:PlayerID/batting_stats', (req, res) => {
  const playerId = req.params.PlayerID;
  db.query('SELECT * FROM batting_stats WHERE PlayerID = ?', [playerId], (err, battingResults) => {
    if (err) return res.status(500).send(err);
    if (battingResults.length === 0) return res.status(404).json({error: 'Batting stats not found for this player'});
    res.json({ batting: battingResults[0] });
  });
});

app.get('/players/:PlayerID/bowling_stats', (req, res) => {
  const playerId = req.params.PlayerID;
  db.query('SELECT * FROM bowling_stats WHERE PlayerID = ?', [playerId], (err, bowlingResults) => {
    if (err) return res.status(500).send(err);
    if (bowlingResults.length === 0) return res.status(404).json({error: 'Bowling stats not found for this player'});
    res.json({ bowling: bowlingResults[0] });
  });
});


    

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

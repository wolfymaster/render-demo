const { Client } = require('pg')
const cors = require('cors')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors());

const connectionString = process.env.DATABASE_URL || 'https://postgres:password@localhost:5433/dev-db';

const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });
 
app.get('/', async (req, res) => {
    const dbResponse = await client.query('SELECT $1::text as message', ['Hello twitch!'])
    
    res.send(dbResponse.rows[0].message)
})

app.get('/api', (req, res) => {
  res.json({
    status: 'success'
  })
})

app.listen(port, async () => {
  await client.connect()
  console.log(`Example app listening on port ${port}`)
});
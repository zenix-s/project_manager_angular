import mysql from 'mysql2/promise'

// const conn = await mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'rootpassdev',
// })

export async function createConnection () {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpassdev'
  })
  return conn
}

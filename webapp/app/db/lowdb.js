const low = require('lowdb');
const storage = require('lowdb/file-sync');
 
const db = low('db.json', { storage });
db('users').push({ name: 'typicode' });
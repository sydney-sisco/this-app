// ProjectsDB.js
import Dexie from "dexie";

const db = new Dexie("ProjectsDB");
db.version(1).stores({ projects: '++id,title,text' });

db.on('ready', function () {
  return db.projects.count().then(function (count) {
    if (count === 0) {
      // Database is empty, add placeholder item
      return db.projects.add({ title: 'Placeholder', text: 'Initial Placeholder Project' });
    }
  });
});

db.open().catch(function (err) {
  console.error('Failed to open db: ' + (err.stack || err));
});

export default db;

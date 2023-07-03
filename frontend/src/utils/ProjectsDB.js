// ProjectsDB.js
import Dexie from "dexie";

const db = new Dexie("ProjectsDB");
db.version(1).stores({ projects: '++id,name,description' });

export default db;

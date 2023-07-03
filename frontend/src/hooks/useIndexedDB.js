import { useEffect, useState } from 'react';
import db from '../utils/ProjectsDB.js';

const useIndexedDB = (tableName) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await db[tableName].toArray();
      setData(allData);
    };

    fetchData();
  }, [tableName]);

  const addItem = async (item) => {
    await db[tableName].add(item);
    const allData = await db[tableName].toArray();
    setData(allData);
  };

  const updateItem = async (id, updatedItem) => {
    await db[tableName].update(id, updatedItem);
    const allData = await db[tableName].toArray();
    setData(allData);
  }

  const deleteItem = async (id) => {
    await db[tableName].delete(id);
    const allData = await db[tableName].toArray();
    setData(allData);
  };

  return { data, addItem, updateItem, deleteItem }
}

export default useIndexedDB;

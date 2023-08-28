import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textDB=await openDB("editor",1);
  const tx=textDB.transaction("editor","readwrite");
  const store=tx.objectStore("editor")
  const request=store.put({id:1,value:content})
  const result=await request;
  console.log(result.value)
};


export const getDb = async () => {
  const textDB=await openDB("editor",1);
  const tx=textDB.transaction("editor","readonly");
  const store=tx.objectStore("editor")
  const request=store.get(1)
  const result=await request;
  console.log(result.value)
  return result.value

}

initdb();

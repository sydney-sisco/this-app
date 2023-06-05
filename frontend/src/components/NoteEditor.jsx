import React, { useState } from 'react';
import styles from './NoteEditor.module.css';

const NoteEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className={styles.editor}>
      <input
        className={styles.titleInput}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
      />
      <textarea
        className={styles.contentTextarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
      />
    </div>
  );
};

export default NoteEditor;

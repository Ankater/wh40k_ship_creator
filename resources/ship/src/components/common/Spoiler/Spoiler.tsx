import React, { useState } from 'react';
import styles from './Spoiler.module.css';

interface SpoilerProps {
  title: string;
  children: React.ReactNode;
}

const Spoiler: React.FC<SpoilerProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.spoiler}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={styles.button}
      >
        <span>{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Spoiler;
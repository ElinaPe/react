import { useState } from 'react';
import './App.css';

const Laskuri = ({huomio}) => {

const [luku, setLuku] = useState(0)

  return (
    <div className='laskuriDiv'>
        <h3>{luku}</h3>
        <button className='btnn vihreäBtn' onClick={() => setLuku(luku + 1)}>+</button>
        <button className='btnn punainenBtn' onClick={() => setLuku(luku - 1)}>-</button>
        <button className='btnn sininenBtn' onClick={() => setLuku(0)}>Clear</button>
    </div>
  );
  }

export default Laskuri;

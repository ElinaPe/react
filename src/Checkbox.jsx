import React from 'react';
import { useState } from 'react';

// function CheckboxComponent({ isChecked, onCheckboxChange }) {
//     const handleCheckboxChange = () => {
//       // Kutsu onCheckboxChange-funktiota uuden tilan kanssa
//       onCheckboxChange(!isChecked); // Vaihda tila päinvastaiseksi
//     };
  
//     return (
//       <input
//         type="checkbox"
//         checked={isChecked}
//         onChange={handleCheckboxChange}
//       />
//     );
//   }
  
// export default CheckboxComponent;


export const Checkbox = () => {
    const [isChecked, setIsChecked] = useState(false)
    const [newDiscontinued, setNewDiscontinued] = useState(false)

  
    const checkHandler = () => {
      setIsChecked(!isChecked)
    }
  
    return (
      <div>
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={checkHandler}
          isChecked={newDiscontinued}
        />
        <label htmlFor="checkbox">I agree to Terms of Service </label>
        <p>The checkbox is {isChecked ? "checked" : "unchecked"}</p>
      </div>
    )
  }
export default Checkbox;
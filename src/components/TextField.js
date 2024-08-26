import React from 'react';

const TextField = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}  
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder}
    />
  );
};

export default TextField;

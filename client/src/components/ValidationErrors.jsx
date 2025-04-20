import React from 'react';

const ValidationErrors = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="validation--errors">
      <h3>Validation Errors</h3>
      <ul>
        {errors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
    </div>
  );
};

export default ValidationErrors;
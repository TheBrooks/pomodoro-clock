import React from 'react';

export default function LabeledNumber(props) {
  return (
    <div className="LabeledNumber">
      <h3 className="Number">{props.number}</h3>
      <p className="Label">{props.label}</p>
    </div>
  );
}
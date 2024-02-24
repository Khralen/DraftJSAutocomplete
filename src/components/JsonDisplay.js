import React from 'react';

const JsonDisplay = ({ data }) => {
  return (
    <div>
      {data ?(Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      ))): (
        <p>No data available</p>
      )
      }
    </div>
  );
};

export default JsonDisplay;
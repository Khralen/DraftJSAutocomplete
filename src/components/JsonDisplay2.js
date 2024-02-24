import React from 'react';

const JsonDisplay2 = (props) => {
  const data = props.data;
  const selectedItem = props.selectedItem;
  return (
    <div>
      <h4>Selected data source: {selectedItem}</h4>
      {data ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.display}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default JsonDisplay2;
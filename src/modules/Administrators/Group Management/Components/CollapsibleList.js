import React from "react";
import Nestable from 'react-nestable';

const CollapsibleList = () => {
  const items = [
    { id: 0, text: 'Andy' },
    {
      id: 1, text: 'Harry',
      children: [
        { id: 2, text: 'David' }
      ]
    },
    { id: 3, text: 'Lisa' }
  ];

  const renderItem = ({ item }) => <div style={{
    width: '100%',
    height: '40px',
    backgroundColor: 'lightGray',
    borderRadius: '8px',
    paddingLeft: '10px',
    display: 'flex',
    alignItems: 'center'
  }}>{item.text}</div>;

  return (
    <Nestable
      items={items}
      renderItem={renderItem}
    />
  )
}

export default CollapsibleList
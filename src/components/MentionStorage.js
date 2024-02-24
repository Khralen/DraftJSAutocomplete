import React from 'react';

const MentionStorage = (id) => {
    const map = new Map([]);
    
    return map.get(id);
};

export default MentionStorage;
import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';

const MentionTrigger = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState([
    { name: 'John Doe', id: 1 },
    { name: 'Jane Smith', id: 2 },
    // Other suggestions from your JSON array or object
    // ...
  ]);

  const mentionPlugin = createMentionPlugin({
    mentionTrigger: '.', // Set the trigger here (e.g., using a dot)
    mentionPrefix: '', // Customize as needed, like '@' or ''
    supportWhitespace: true, // Allow whitespace after the trigger
    mentionComponent: ({ mention, theme, isFocused, searchValue }) => (
      <div className={theme.mention} data-is-focused={isFocused}>
        {mention.name}
      </div>
    ),
  });

  const { MentionSuggestions } = mentionPlugin;

  const onSearchChange = ({ value }) => {
    // Filter suggestions based on the search value
    const filteredSuggestions = yourFilterLogic(value); // Implement your filtering logic here
    setSuggestions(filteredSuggestions);
  };

  const yourFilterLogic = (searchValue) => {
    // Implement your filter logic based on your JSON array or object
    // For example, filter suggestions based on 'searchValue' and your JSON data
    const filtered = suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filtered;
  };

  const plugins = [mentionPlugin];
  
  const onEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <h1>Draft.js Mention Plugin Example</h1>
      <Editor
        editorState={editorState}
        onChange={onEditorChange}
        plugins={plugins}
      />
      <MentionSuggestions
        onSearchChange={onSearchChange}
        suggestions={suggestions}
        onAddMention={() => {}}
      />
    </div>
  );
};

export default MentionTrigger;

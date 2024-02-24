import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-mention-plugin/lib/plugin.css';

const MyDraftJSComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  // Mention plugin setup
  const mentionPlugin = createMentionPlugin();
  const { MentionSuggestions } = mentionPlugin;
  
  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={[mentionPlugin]}
      />
    </div>
  );
};

export default MyDraftJSComponent;

import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import editorStyles from './editorStyles.css';
import mentions from './mentions';
import inputData from "../../data/dataSongsMain1v3.js";
//import SingleLine from '../SingleLine.js';

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

export default class SimpleMentionEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: inputData, //mentions
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, inputData), //mentions
    });
  };

  onAddMention = (mention) => {
    // get the mention object selected
  }

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
      </div>
    );
  }
}

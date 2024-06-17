import React, { Component } from "react";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import { convertToRaw } from "draft-js";
import mentions from "./mentions1";
//import pluginStyles from "../node_modules/draft-js-mention-plugin/lib/plugin.css";
import data from "./data.json";

export default class SimpleMentionEditor extends Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin();

    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: props.inputData // použij inputData nebo fallback na původní data
    };
  }
/*
  this.state = {
    editorState: EditorState.createEmpty(),
    suggestions: data //mentions
  };
*/
  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: this.props.inputData || data //defaultSuggestionsFilter(value, data) //mentions
    });
  };

  onAddMention = () => {
    // get the mention object selected
  };

  focus = () => {
    this.editor.focus();
  };

  renderContentAsRawJs() {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    return JSON.stringify(raw, null, 2);
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div onClick={this.focus}>
        <div style={{ border: "1px solid #000" }}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={this.onAddMention}
          />
        </div>
        <br />
        <h3>editor content as json</h3>
        <pre id="raw-display">{this.renderContentAsRawJs()}</pre>
      </div>
    );
  }
}

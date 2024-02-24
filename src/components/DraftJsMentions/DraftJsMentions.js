"use strict";
import { defaultTheme } from 'draft-js-mention-plugin';
import editorStyles from './SimpleMentionEditor.module.css';

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var draft_js_1 = require("draft-js");
var editor_1 = require("@draft-js-plugins/editor");
var mention_1 = require("@draft-js-plugins/mention");

var Mentions_1 = require("./Mentions");
function DraftJsMentions() {
    var ref = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(function () {
        return draft_js_1.EditorState.createEmpty();
    }), editorState = _a[0], setEditorState = _a[1];
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    var _c = (0, react_1.useState)(Mentions_1.default), suggestions = _c[0], setSuggestions = _c[1];
    var _d = (0, react_1.useMemo)(function () {
        var mentionPlugin = (0, mention_1.default)();
        // eslint-disable-next-line no-shadow
        var MentionSuggestions = mentionPlugin.MentionSuggestions;
        // eslint-disable-next-line no-shadow
        var plugins = [mentionPlugin];
        return { plugins: plugins, MentionSuggestions: MentionSuggestions };
    }, []), MentionSuggestions = _d.MentionSuggestions, plugins = _d.plugins;
    var onOpenChange = (0, react_1.useCallback)(function (_open) {
        setOpen(_open);
    }, []);
    var onSearchChange = (0, react_1.useCallback)(function (_a) {
        var value = _a.value;
        setSuggestions((0, mention_1.defaultSuggestionsFilter)(value, Mentions_1.default));
    }, []);
    return (<div 
    className={editorStyles.editor}
    onClick={function () {
            ref.current.focus();
        }}>
        <editor_1.default editorKey={'editor'} editorState={editorState} onChange={setEditorState} plugins={plugins} ref={ref}/>
        <MentionSuggestions open={open} onOpenChange={onOpenChange} suggestions={suggestions} onSearchChange={onSearchChange} onAddMention={function () {
            // get the mention object selected
        }}/>
      </div>);
}
//exports.default = SimpleMentionEditor;
export default DraftJsMentions;

import './App.js';
import MentionTrigger from './components/MentionTrigger.js';
import MyDraftJSComponent from './components/MyDraftJSComponent.js';
import SingleLine from './components/SingleLine.js';
//import DraftJsMentions from './components/DraftJsMentions/DraftJsMentions.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Suggestions helper plugin</h1>
        <SingleLine />
      </header>
    </div>
  );
}

export default App;
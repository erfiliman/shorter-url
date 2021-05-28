import logo from './logo.svg';
import './App.css';
import FormShorter from "./FormShorter/FormShorter";

function App() {
  return (
    <div className="app">
        <div className="content">
            <div className="container">
                <div className="title">
                    <h1 className="retro-h1">shorter</h1>
                    <h3 className="retro-h3">url</h3>
                </div>

                <FormShorter/>
            </div>
        </div>
    </div>
  );
}

export default App;

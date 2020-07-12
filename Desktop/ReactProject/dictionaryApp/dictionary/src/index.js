import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import makeRequest from './App.js';
import * as serviceWorker from './serviceWorker';

class DictionaryApp extends React.Component{
    

  render(){
    return(
      <div>
      <div className="wrap">
        <h1 className= "text">ADE'S DICTIONARY</h1>
        <div className="search">
        <input type="text" id="textbox" className="searchTerm" placeholder="Enter a word..."/>
        <button type="submit" className="searchButton" onClick={makeRequest}>GO</button>        
     </div>
        <div id="mainbody">
          <h2 id="word">word</h2>
          <p id="pos"></p>
          <p id="audio"></p>
          <h3 id="definition">def</h3>
          <p id="word_meaning"></p>
          <h2 id="syn">Synonyms:</h2>
          <p id="synonyms"></p>
          <h2 id="sentence">Sentences:</h2>
          <p id="example"></p>
        </div>
      </div>
     
   </div>
    );
    }
}

ReactDOM.render(<DictionaryApp/>,
  document.getElementById('root')
);

serviceWorker.unregister();

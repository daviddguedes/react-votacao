import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyBN7pG3sYNng4ECFX4M6r5tIoIIW4w72QwPaOs4WwW",
  databaseURL: "https://upload-cropped.firebaseio.com/",
  authDomain: "upload-cropped.firebaseapp.com",
  storageBucket: "upload-cropped.appspot.com"
};

class App extends Component {

  constructor() {
    super()
    this.state = { topicos: [] }
    firebase.initializeApp(config);
  }

  componentWillMount() {
    const db = firebase.database();
    const dbRef = db.ref().child('topicos');
    dbRef.on('value', (snapshot) => {
      this.setState({
        topicos: snapshot.val()
      })
      console.log(this.state.topicos)
    })
  }

  render() {
    return (
      <div className="App">
      {this.state.topicos ? this.state.topicos.map(res => <p>{res.titulo}</p>) : ''}
      </div>
    );
  }
}

export default App;

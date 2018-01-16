import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { Button,FormGroup,Label,Input,Alert } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

let config = {
  apiKey: "AIzaSyBN7pG3sYNng4ECFX4M6r5tIoIIW4w72Qw",
  databaseURL: "https://upload-cropped.firebaseio.com/",
  authDomain: "upload-cropped.firebaseapp.com",
  storageBucket: "upload-cropped.appspot.com"
};

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      topicos: [], 
      selecionado: null,
      selectedTopico: false,
      confirmationMessage: {
        message: '',
        color: ''
      }
    }
    firebase.initializeApp(config);
  }

  componentWillMount() {
    const db = firebase.database();
    const dbRef = db.ref().child('topicos');
    dbRef.on('value', (snapshot) => {
      this.setState({
        topicos: snapshot.val()
      })
    })
  }

  selTopico() {
    if (this.state.selecionado) {
      const db = firebase.database();
      const dbRefActive = db.ref().child('votacao_active');
      dbRefActive.set(this.state.topicos[this.state.selecionado])
        .then(response => this.setState({selectedTopico: true, confirmationMessage: {message: 'Tópico selecionado.', color: 'primary'}}))
        .catch(error => this.setState({selectedTopico: true, confirmationMessage: {message: 'Erro selecionando o tópico.', color: 'danger'}}))
    }else {
      this.setState({selectedTopico: true, confirmationMessage: {message: 'Erro selecionando o tópico.', color: 'danger'}})
    }
  }

  handleTopico(e) {
    this.setState({selecionado: e.target.value})
  }

  render() {
    return (
      <div className="App">
      <FormGroup tag="fieldset">
          <legend>Selecione o tópico: </legend>
          {this.state.topicos ? this.state.topicos
            .map( (res, index) =>
              <FormGroup check>
                <Label check>
                  <Input type="radio" key={index} value={index} onChange={(e) => this.handleTopico(e)} name="topico" />{' '}
                  {res.titulo}
                </Label>
              </FormGroup>
        ) : ''}
      </FormGroup> 

      <Button onClick={() => this.selTopico()}>Ativar</Button>

      {this.state.selectedTopico ? 
        <div>
          <Alert color={this.state.confirmationMessage.color}>
            {this.state.confirmationMessage.message}
          </Alert>
        </div>
      : ''}
      </div>
    )
  }
}

class Resultado extends Component {
  render() {
    return (
      <h1>Resultado</h1>
    )
  }
}

class App extends Component {

  // constructor() {
  //   super()
  //   this.state = { 
  //     topicos: [], 
  //     selecionado: null,
  //     selectedTopico: false,
  //     confirmationMessage: {
  //       message: '',
  //       color: ''
  //     }
  //   }
  //   firebase.initializeApp(config);
  // }

  // componentWillMount() {
  //   const db = firebase.database();
  //   const dbRef = db.ref().child('topicos');
  //   dbRef.on('value', (snapshot) => {
  //     this.setState({
  //       topicos: snapshot.val()
  //     })
  //   })
  // }

  // selTopico() {
  //   if (this.state.selecionado) {
  //     const db = firebase.database();
  //     const dbRefActive = db.ref().child('votacao_active');
  //     dbRefActive.set(this.state.topicos[this.state.selecionado])
  //       .then(response => this.setState({selectedTopico: true, confirmationMessage: {message: 'Tópico selecionado.', color: 'primary'}}))
  //       .catch(error => this.setState({selectedTopico: true, confirmationMessage: {message: 'Erro selecionando o tópico.', color: 'danger'}}))
  //   }else {
  //     this.setState({selectedTopico: true, confirmationMessage: {message: 'Erro selecionando o tópico.', color: 'danger'}})
  //   }
  // }

  // handleTopico(e) {
  //   this.setState({selecionado: e.target.value})
  // }

  render() {
    return (
      <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/resultado">Resultado</Link></li>
        </ul>
  
        <hr/>
  
        <Route exact path="/" component={Home}/>
        <Route path="/resultado" component={Resultado}/>
      </div>
    </Router>
    );
  }
}

export default App;

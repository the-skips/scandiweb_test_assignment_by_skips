import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={name: "", result: ""};
    this.submitFunction = this.submitFunction.bind(this);
    this.successfulCallback = this.successfulCallback.bind(this);
    this.unsuccessfulCallback = this.unsuccessfulCallback.bind(this);
  }

  submitFunction() {
    debugger;
    let sendData = new URLSearchParams();
    sendData.append ('name', this.state.name);
    let sent = fetch("http://localhost:8000/server.php", {
      method:"POST",
      mode: 'cors',
      body: sendData
    })
    .then((response) => {return response.text();})
    .then((data)=>this.setState({result: data}));
  }

  successfulCallback(data) {
    debugger;
    console.log("Successful callback: " + data);

  }
  unsuccessfulCallback(e){
    debugger;
    console.log("Unsuccessful callback: " + e);
  }


  render() {
    return(
    <div className="App">
      <form onSubmit={this.submitFunction}>
        <label htmlFor="nameInput">Name: </label>
        <input 
        type="text"
        id="nameInput"
        name="name"
        value={this.state.name}
        onChange={(e) => this.setState({name: e.target.value})}
        />
        <br/>
        <button type='submit'>Send</button>
      </form>
      <h1>Your result: {this.state.result}</h1>
    </div>);
  }
}

export default App;

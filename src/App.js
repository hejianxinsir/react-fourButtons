import React, {Component} from 'react';

class App extends React.Component {
  constructor(){
    super()
  }

  add1(){
    this.props.onAdd1()
  }
  add2(){
    this.props.onAdd2()
  }
  addif(){
    this.props.onAddif()
  }
  addAfter(){
    this.props.onAddAfter()
  }

  render(){
    return (
      <div className="App">
        <div>你点击了{this.props.value}次</div>
        <button onClick={()=>this.add1()}>+1</button>
        <button onClick={()=>this.add2()}>+2</button>
        <button onClick={()=>this.addif()}>单数则+1</button>
        <button onClick={()=>this.addAfter()}>一秒后+1</button>
      </div>
    )
  }
}

export default App;

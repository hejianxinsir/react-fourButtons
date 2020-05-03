import React, {Component} from 'react';
import { connect } from 'react-redux';


class App extends Component {
  render(){
    return (
      <div className="App">
        <div>你点击了{this.props.n}次</div>
        <button onClick={()=>this.props.add1()}>+1</button>
        <button onClick={()=>this.props.add2()}>+2</button>
        <button>单数则+1</button>
        <button>一秒后+1</button>
      </div>
    )
  }
}

// connect 返回一个新的函数，所以要加两个括号，分别给参数
// 前面的部分叫做偏函数，这里的偏函数是：connect()
function getPartialStore(state){
  return {
    n: state.n
  }
}

const actionCreator = {
  add1: ()=>{
    console.log('add1')
    return {type: 'add', payload: 1}
  },
  add2: ()=>{
    console.log('add2')
    return {type: 'add', payload: 2}
  }
}


export default connect(getPartialStore,actionCreator)(App);

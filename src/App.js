import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from './components/button';
import './css/App.css';


class App extends Component {
  render(){
    let recordN = this.props.n
    return (
      <div className="App">
        <div className="plus">
          <div>你点击了{this.props.n}次</div>
          <button onClick={()=>this.props.add1()}>+1</button>
          <button onClick={()=>this.props.add2()}>+2</button>
          <button onClick={()=>{this.props.add3(recordN)}}>单数则+1</button>
          <button onClick={()=>this.props.add4()}>一秒后+1</button>
        </div>

        <div className="btns">
          <Button value="点我啊" onClick={this.z.bind(this)}></Button>
          <Button value="点我别点它" onClick={this.t.bind(this)}></Button>
          <Button value="先点我再说" onClick={this.p.bind(this)}></Button>
        </div>
      </div>
    )
  }

  z(x){
    console.log(x,'第一个 button 被点击了')
  }

  t(x){
    console.log(x,'点击了第二个 button ')
  }

  p(x){
    console.log(x,'点击了第三个 button')
  }
}

// connect 返回一个新的函数，所以要加两个括号，分别给参数
// 前面的部分叫做偏函数，这里的偏函数是：connect()

// mapStateToProps 必须是一个函数，文档说的
function mapStateToProps(state){
  return {
    n: state.n
  }
}

// mapDispatchToProps 可以是函数或对象
// const mapDispatchToProps = {
//   add1: ()=>{
//     console.log('add1')
//     return {type: 'add', payload: 1}
//   },
//   add2: ()=>{
//     console.log('add2')
//     return {type: 'add', payload: 2}
//   }
// }
function mapDispatchToProps(dispatch){
  return {
    add1: ()=> dispatch({type: 'add', payload: 1}),
    add2: ()=> dispatch({type: 'add', payload: 2}),
    add3: (x)=> {
      if(x%2 === 1){
        dispatch({type: 'add', payload: 1})
      }else{
        console.log('不是单数，不操作')
      }
    },
    add4: ()=> {
      setTimeout(()=>{
        dispatch({type: 'add', payload: 1})
      },1000)
    }
  }
}

// connect 的作用是，把 mapStateToProps  mapDispatchToProps 合并
// 起来作为 props 传给 App 组件。
export default connect(mapStateToProps, mapDispatchToProps)(App);


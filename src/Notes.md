## 用 Context API 传值

如下代码，n 的值是一层一层传到 f1 f2 f3 f4 的
如果我只要 f4 拿到 n 的值，可不可以不通过层层传递的方式？
在这个代码中，目前看来不行。

但是我们可以把 n 提到代码最上面（全局变量的方式），这样就能达到目的。但是这样很不安全，如果别人修改了这个 n，代码就有问题了。

所以，全局变量尽量不用。

那怎么办？

英雄登场了：Context 。

Context 可以理解成局部的全局变量。往下看 Context 的代码。
```
// let n = 100

function f1(n){
  console.log(1,n)
  f2(n)
}
function f2(n){
  console.log(2,n)
  f3(n)
}
function f3(n){
  console.log(3,n)
  f4(n)
}
function f4(n){
  console.log(4,n)
}

{
  f1(n)
  console.log('done')
}
```

Context 代码:
这里的 Context 就是局部的全局变量。
```
{
  let Context = {}
  // 暴露全句方法
  window.setContext = function(key, value){
    context[key] = value
  }
  window.f1 = function (){
    console.log(1)
  }
}

{
  // 调用全局方法
  window.setContext('n', 100)
  setTimeout(()=>{
    window.f1()
  }, 1000)

  console.log('down')
}
```

**一句话总结：不想层层传递，就用 Context 。(局部的全局变量。不必每个组件都显式地通过 props 传递数据)**

部分代码：
```
...

function F3(){
  return (
    <div>
      333
      <nContext.Consumer>
      { (x)=> <F4 n4={x}>}
      </nContext.Consumer>
    </div>
  )
}

class App extends React.Conponent{
  render(){
    return (
      <div>
        <nContext.Provider value="67">
          <F1/>
        </nContext>
      </div>
    )
  }
}
```

## Codesandbox 换肤代码
```
import React from "react";
import "./styles.css";
const themeContext = React.createContext();

function Button() {
  return <button>btn</button>;
}
function Input() {
  return <input />;
}
function Box(props) {
  return <div className={`box ${props.theme}`}>{props.children}</div>;
}

class App extends React.Component {
  change = ()=>{
    if(this.state.theme === 'green'){
      this.setState({theme: 'red'})
    }else{
      this.setState({theme: 'green'})
    }
  }
  constructor() {
    super();
    this.state = {
      theme: "green"
    };
  }
  render() {
    return (
      <themeContext.Provider value={this.state.theme}>
        <div className="App">
        <button onClick={this.change}>change</button>
        <themeContext.Consumer>
        {(theme)=>
         <div>
          <Box theme={theme}>
            <Button />
          </Box>
          <Box theme={theme}>
            <Input />
          </Box>
         </div>
        }
        </themeContext.Consumer>
        </div>
      </themeContext.Provider>
    );
  }
}

export default App;

```


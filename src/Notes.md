# React-Router / codesandbox 里执行代码

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

## Hooks API

useState 实例
```
function App(){
  const [x /*值*/, y /*更新函数*/] = useState(0)
  const [user, setUser] = useState({
    name: 'janson',
    age: 18,
    hobbies: ['lol', 'dog', 'code']
  })
  const add = ()=>{
    y(x+1)
  }
  const minus = ()=>{
    y(x-1)
  }

  return (
    <div>
      <div>{x}</div>
      <div>
        <button onClick={add}>+1</button>
        <button onClick={minus}>-1</button>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App/>, rootElement)

```

## 副作用
副作用指什么？比如 function fn(){ console.log(1)}，此时你依赖了 console.log 这个天然存在的函数，如果别人把 console.log 函数改了。比如改成 console.log = function(){}  改成了空函数，这时候你就打印不出 1 了。

这时候我们说，fn 是个有副作用的函数，因为你依赖了你自己不能控制的东西。

与之相比，function fn2(a,b){return a+b} 这个函数就是没有副作用的函数，因为它不依赖其他不知道哪来的函数，这是我们能完全控制的，所以我们把它叫纯函数。

## useEffect
如果你的函数有副作用，就把它写在 useEffect 里面。

## 用 hash 做路由：点击登录注册按钮
```
import React, { useState } from "react";
import "./styles.css";

function Box1() {
  return <div className="act">注册</div>;
}
function Box2() {
  return <div className="act">登录</div>;
}

export default function App() {
  let hash = window.location.hash;
  let initUi = hash === "signUp" ? "注册" : "登录";
  let [ui, setUi] = useState(initUi);
  let onClickSignIn = () => {
    setUi("登录");
    window.location.hash = "logIn";
  };
  let onClickSignUp = () => {
    setUi("注册");
    window.location.hash = "signUp";
  };

  return (
    <div className="App">
      <button onClick={onClickSignUp}>注册</button>
      <button onClick={onClickSignIn}>登录</button>
      <div>{ui === "注册" ? <Box1 /> : <Box2 />}</div>
    </div>
  );
}
```

跳转的方法：
1. window.location.hash = 'xxx' 可以用。hash 就是前端路由。
2. window.location.pathname = ’xxx' 基本不考虑用，因为会刷新页面。
3. window.history.pushState(obj, 'title', '/path') 如果后端会将所有路径都指向首页，我们就能用这种方法；否则后端傻逼的话，这种就不要用；或者你自己做后端。

## 用 window.history.pushState(null, '', '/logIn') 做路由
```
import React, { useState } from "react";
import "./styles.css";

function Box1() {
  return <div className="act">注册</div>;
}
function Box2() {
  return <div className="act">登录</div>;
}

export default function App() {
  let path = window.location.pathname;
  let initUi = path === "/signUp" ? "注册" : "登录";
  let [ui, setUi] = useState(initUi);
  let onClickSignIn = () => {
    setUi("登录");
    // window.location.hash = "logIn";
    window.history.pushState(null, "", "/logIn");
  };
  let onClickSignUp = () => {
    setUi("注册");
    // window.location.hash = "signUp";
    window.history.pushState(null, "", "/signUp");
  };

  return (
    <div className="App">
      <button onClick={onClickSignUp}>注册</button>
      <button onClick={onClickSignIn}>登录</button>
      <div>{ui === "注册" ? <Box1 /> : <Box2 />}</div>
    </div>
  );
}

```

## React-Router 的用法
```
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <div>
          <Link to="/"><button>welcome</button></Link>
          <br />
          <Link to="/logIn">logIn</Link>
          <br />
          <Link to="/signUp">signUp</Link>
        </div>

        <Switch>
          <Route path="/logIn">
            <Box1 />
          </Route>
          <Route path="/signUp">
            <Box2 />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Welcome() {
  return <h2 className="act">Welcome</h2>;
}

function Box1() {
  return <h2 className="act">signIn</h2>;
}

function Box2() {
  return <h2 className="act">signUp</h2>;
}
```

## 生命周期 / 面试题

1. shouldComponentUpdate 的作用是什么，为什么重要？
答：它允许我们手动判断是否要更新组件，根据组件应用场景设置合理的返回值能帮我们避免不必要的更新。

2. 性能优化是哪个周期函数？shouldComponentUpdate.

3. 有哪些生命周期？...

4. 在生命周期哪一步应该发送 ajax 请求？
答: 一般放到 componentDidMount 里面。google 一下原因。

5. setState 合并状态后的几个生命周期函数的调用顺序是？
shouldComponentUpdate > componentWillUpdate > render > componentDidUpdate

## React 的 CSS 解决方案


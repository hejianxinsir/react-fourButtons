import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';

const stateChanger = (state, action)=>{
  if(state === undefined){
    return 0
  }else{
    if(action.type === 'add'){
      var newState = state + action.payload
      return newState
    }else{
      return state
    }
  }
}

let store = createStore(stateChanger)

render()
store.subscribe(()=>{
  render()
})

function addIfSingle(){
  if(store.getState() % 2 === 1){
    store.dispatch({type: 'add', payload: 1})
  }
}

function addAfter(){
  setTimeout(function(){
    store.dispatch({type: 'add', payload: 1})
  }, 1000)
}

function render(){
  ReactDOM.render(
    <React.StrictMode>
      <App value={store.getState()}
        onAdd1={()=>{store.dispatch({type:'add', payload: 1})}}
        onAdd2={()=>{store.dispatch({type:'add', payload: 2})}}
        onAddif={addIfSingle}
        onAddAfter={addAfter}
      />
    </React.StrictMode>,
    document.getElementById('root')
  )
}


serviceWorker.unregister();

import React, {Component} from 'react';
import '../css/button.css';

export default class Button extends Component{
  constructor(props){
    super(props)
    this.state = {
      active: false,
      deltaX: 0,
      deltaY: 0
    }
    this.myRef = React.createRef();
  }

  x(e){
    let {x, y} = this.myRef.current.getBoundingClientRect()
    let {clientX, clientY} = e
    let deltaX = clientX - x -3
    let deltaY = clientY - y -3
    console.log(deltaX, deltaY)

    this.setState({
      active: true,
      deltaX: deltaX,
      deltaY: deltaY
    })

    this.props.onClick.call(null, 'hello')
  }

  y(){
    this.setState({
      active: false
    })
  }

  render(props){
    return (
      <div>
        <button
          ref={this.myRef}
          className="btn1"
          onClick={this.x.bind(this)}
        >
          <span className="btn-font">{this.props.value}</span>
          {
            this.state.active === true ? <span className="span"
              onAnimationEnd={this.y.bind(this)}
              style={{left: this.state.deltaX, top: this.state.deltaY}}></span> : ''
          }
        </button>
      </div>
    )
  }
}

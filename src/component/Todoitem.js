import React, { Component } from 'react';
import '../css/style.css';
import checkImg from '../image/check.svg';
import checkDoneImg from '../image/check-done.svg';
//import classNames from 'classnames/bind';
class Todoitem extends Component{
  isDone(){
    const onClick = this.props.onClick;
    if(this.props.isComplete){
      return(
        <div className="TodoItem Todo-complete">
          <img onClick={onClick} src={checkImg} alt="checkImg" width={32}></img>
          <p className="ml-4">{ this.props.title }</p>
        </div> 
      )
    }
    else{
      return(
        <div className="TodoItem">
          <img onClick={onClick} src={checkDoneImg} alt="checkDoneImg" width={32}></img>
          <p className="ml-4">{ this.props.title}</p>
        </div> 
      )
    }
  }
  render(){
    return(
      <div>
        {this.isDone()}
      </div>
    )
  }
}

export default Todoitem;
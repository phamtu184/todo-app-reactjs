import React, { Component } from 'react';
import '../css/style.css';
import checkImg from '../image/check.svg';
import checkDoneImg from '../image/check-done.svg';
//import classNames from 'classnames/bind';
class Todoitem extends Component{
  isDone(){
    const selectItem = this.props.selectItem;
    if(this.props.isComplete){
      return(
        <div className="TodoItem Todo-complete">
          <img onClick={selectItem} src={checkImg} alt="checkImg" width={32}></img>
          <p className="ml-4">{ this.props.title }</p>
        </div> 
      )
    }
    else{
      return(
        <div className="TodoItem">
          <img onClick={selectItem} src={checkDoneImg} alt="checkDoneImg" width={32}></img>
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
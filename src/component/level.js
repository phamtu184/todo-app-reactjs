import React, { Component } from 'react';
import '../css/style.css'
//import classNames from 'classnames/bind';
class Level extends Component{
  level(){
    if(this.props.level === "low"){
      return(
        <div className="low">
          <p>{ this.props.level }</p>
        </div> 
      )
    }
    else if(this.props.level === "medium"){
      return(
        <div className="medium">
          <p>{ this.props.level }</p>
        </div> 
      )
    }
    else{
      return(
        <div className="risk">
          <p>{ this.props.level }</p>
        </div> 
      )
    }
  }
  render(){
    return(
      <div>
        {this.level()}
      </div>
      
    )
    
  }
}

export default Level;
import React, { Component } from 'react';
import Todoitem from './Todoitem';
import Level from './level';
import checkAll from '../image/check-all.svg';
class Tablelisttask extends Component{
  constructor(){
    super();
    this.newItem = this.newItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      clearItem: '',
      todoItems: [
        {title:'hoc react', isComplete: true, level: 'low'},
        {title:'uong nuoc', isComplete: false, level: 'risk'},
        {title:'an com', isComplete: true, level: 'medium'}
      ]
    }
  }
  selectItem(item){
    return () => {
      const index = this.state.todoItems.indexOf(item);
      this.setState({
        todoItems:[
          ...this.state.todoItems.slice(0, index),
          {
            ...item,
            isComplete: !item.isComplete
          },
          ...this.state.todoItems.slice(index + 1)
        ]
        //todoItems: this.state.todoItems.map(i => i !== item ? {...i} : {...i, isComplete: !item.isComplete})
      })
    }
  }
  newItem(event){
    let newTaskvl = this.refs.newTask.value;
    let newLevelvl = this.refs.newLevel.value;
    if(!newTaskvl){return;}
    newTaskvl = newTaskvl.trim();
    if(!newTaskvl){return;}
    this.setState({
      clearItem: '',
      todoItems:[
        {
          title: newTaskvl, isComplete: false, level: newLevelvl
        },
        ...this.state.todoItems
      ]
    })
  }
  handleChange(e){
    this.setState({
      clearItem: e.target.value
    })
  }
  render(){
    let {clearItem,todoItems} = this.state;
    let listItem = todoItems.map((item, index)=>
      <tr key={index}>
        <td>
          <p>{index+1}</p>
        </td>
        <td>
          <Todoitem title={item.title} isComplete={item.isComplete} onClick={this.selectItem(item)}></Todoitem>
        </td>
        <td>
          <Level level={item.level}></Level>
        </td>
        <td>
          <button type="button" className="btn btn-danger">Delete</button>
        </td>
      </tr>
    )
    return(
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p>0</p></td>
            <td>
              <img src={checkAll} width={32} height={32} alt="checkAll"></img>
              <input type='text' className="ml-4" placeholder="Add a new item" ref="newTask" value={clearItem} onChange={this.handleChange} size={32} maxLength={32}></input>
            </td>
            <td>
              <div className="select">
                <select ref="newLevel">
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="risk">risk</option>
                </select>
              </div>
            </td>
            <td>
              <button type="button" className="btn btn-primary" onClick={this.newItem}>Add</button>
            </td>
          </tr>
          {listItem}
        </tbody>
      </table>
    )
  }
}

export default Tablelisttask;
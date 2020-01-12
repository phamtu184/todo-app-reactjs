import React, { Component } from 'react';
import {orderBy} from 'lodash';
import Todoitem from './Todoitem';
import Search from './search';
import Level from './level';
import checkAll from '../image/check-all.svg';
import sortIcon from '../image/sort.svg';
class Tablelisttask extends Component{
  constructor(){
    super();
    this.state = {
      clearItem: '',
      strValue: '',
      sortTask: true,
      sortLevel: true,
      todoItems : JSON.parse(localStorage.getItem('todoItems'))
      // todoItems: [
      //   {title:'hoc react', isComplete: true, level: 'low'},
      //   {title:'uong nuoc', isComplete: false, level: 'risk'},
      //   {title:'an com', isComplete: true, level: 'medium'}
      // ]
    }
    this.newItem = this.newItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.sortTask = this.sortTask.bind(this);
    this.sortLevel = this.sortLevel.bind(this);
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
      localStorage.setItem('todoItems', JSON.stringify(this.state.todoItems.map(i => i !== item ? {...i} : {...i, isComplete: !item.isComplete})))
    }
  }
  newItem(event){
    let newTaskvl = this.refs.newTask.value;
    let newLevelvl = this.refs.newLevel.value;
    if(!newTaskvl){return;}
    newTaskvl = newTaskvl.trim();
    if(!newTaskvl){return;}
    if(!this.state.todoItems){
      this.setState({
        clearItem: '',
        todoItems:[
          {
            title: newTaskvl, isComplete: false, level: newLevelvl
          }
        ]
      })
      localStorage.setItem('todoItems', JSON.stringify([
        {
          title: newTaskvl, isComplete: false, level: newLevelvl
        }
      ]))
    }
    else{
      this.setState({
        clearItem: '',
        todoItems:[
          {
            title: newTaskvl, isComplete: false, level: newLevelvl
          },
          ...this.state.todoItems
        ]
      })
      localStorage.setItem('todoItems', JSON.stringify([
        {
          title: newTaskvl, isComplete: false, level: newLevelvl
        },
        ...this.state.todoItems
      ]))
    }
  }
  deleteItem(item){
    return () => {
      const index = this.state.todoItems.indexOf(item);
      this.setState({
        todoItems:[
          ...this.state.todoItems.slice(0, index),
          ...this.state.todoItems.slice(index + 1)
        ]
      })
      localStorage.setItem('todoItems', JSON.stringify([
        ...this.state.todoItems.slice(0, index),
        ...this.state.todoItems.slice(index + 1)
      ]))
    }
  }
  handleChange(e){
    this.setState({
      clearItem: e.target.value
    })
  }
  handleSearch(value){
    console.log(value)
    let itemsOrigin = this.state.todoItems;
    let items =[];
    this.setState({
      strValue: value
    })
    if(value.length > 0){
      itemsOrigin.forEach((item) => {
        if(item.title.toLowerCase().indexOf(value) > -1){
          items.push(item);
        }
      })
      this.setState({
        todoItems: items
      })
    }
    else{
      this.setState({
        todoItems: JSON.parse(localStorage.getItem('todoItems'))
      })
    }
  }
  clearSearch(){
    this.setState({
      todoItems: JSON.parse(localStorage.getItem('todoItems'))
    })
  }
  sortTask(){
    if(this.state.sortTask === true){
      let rs = orderBy(this.state.todoItems, ['title'], ['asc']);
      this.setState({
        sortTask: !true,
        todoItems: rs
      })
      localStorage.setItem('todoItems', JSON.stringify(rs))
    }
    else{
      let rs = orderBy(this.state.todoItems, ['title'], ['desc']);
      this.setState({
        sortTask: !false,
        todoItems: rs
      })
      localStorage.setItem('todoItems', JSON.stringify(rs))
    }
  }
  sortLevel(){
    if(this.state.sortLevel === true){
      let rs = orderBy(this.state.todoItems, ['level'], ['asc']);
      this.setState({
        sortLevel: !true,
        todoItems: rs
      })
      localStorage.setItem('todoItems', JSON.stringify(rs))
    }
    else{
      let rs = orderBy(this.state.todoItems, ['level'], ['desc']);
      this.setState({
        sortLevel: !false,
        todoItems: rs
      })
      localStorage.setItem('todoItems', JSON.stringify(rs))
    }
  }
  render(){
    let {clearItem,todoItems} = this.state;
    let listItem;
    if(!todoItems){
      listItem = null;
    }
    else{
      listItem = todoItems.map((item, index)=>
      <tr key={index}>
        <td>
          <p>{index+1}</p>
        </td>
        <td>
          <Todoitem title={item.title} isComplete={item.isComplete} selectItem={this.selectItem(item)}></Todoitem>
        </td>
        <td>
          <Level level={item.level}></Level>
        </td>
        <td>
          <button type="button" className="btn btn-danger" onClick={this.deleteItem(item)}>Delete</button>
        </td>
      </tr>
      )
    }
    
    return(
      <div>
        <Search handleSearch={this.handleSearch} clearSearch={this.clearSearch}></Search>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Task <button className='btn'><img src={sortIcon} onClick={this.sortTask} width={20} alt='sortIcon'></img></button></th>
              <th>Level <button className='btn'><img src={sortIcon} onClick={this.sortLevel} width={20} alt='sortIcon'></img></button></th>
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
      </div>
    )
  }
}

export default Tablelisttask;
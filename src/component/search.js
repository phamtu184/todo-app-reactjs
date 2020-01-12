import React, { Component } from 'react';
import '../css/style.css'
class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      isCollapsed: true,
      strValue: ''
    }
    this.collapsedSearch = this.collapsedSearch.bind(this);
    this.search = this.search.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }
  collapsedSearch(){
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }
  search(event){
    //this.setState({strValue: event.target.value});
    this.setState({strValue: event.target.value}, function() {
      this.props.handleSearch(this.state.strValue);
    });
  }
  clearSearch(){
    this.setState({strValue: ''}, function() {
      this.props.clearSearch();
    })
  }
  render(){
    const {isCollapsed} = this.state;
    return(
      <div className="mb-2">
        <button type="button" className="btn btn-primary mr-2 mb-2 btnSearch" onClick={this.collapsedSearch}>Search</button>
        {!isCollapsed && <div className="inputSearch"><input type="text" onChange={this.search} ref='searchvl' value={this.state.strValue}></input>
        <button type="button" className="btn btn-info ml-2" onClick={this.clearSearch}>Clear</button></div>}
      </div>
    )
  }
}
export default Search;
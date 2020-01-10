import React from 'react';
import Tablelisttask from './component/tableListTake'

function App() {
  return (
    <div className="App container">
      <h2 className="text-center mt-2 mb-2">Todo List</h2>
      <button type="button" className="btn btn-primary mb-2 mt-2">Add</button>
      <Tablelisttask></Tablelisttask>
    </div>
  );
}

export default App;

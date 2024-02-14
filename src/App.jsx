import { useState } from "react";

import Navbar from "./components/Navbar";

import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const handleEdit = () => {

  }
  const handleDelete = (e, id) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
    }
  };

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(),todo, iscompleted: false}])
    setTodo("")
    console.log(todos)
    
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted
    setTodos(newTodos)
  }

  

  return (
    <>
      <Navbar />
      <div className=" container my-5 rounded-xl p-5 bg-violet-100 mx-auto min-h-[80vh]">
          <div className="addTodo my-5">
            <h2 className="text-lg font-bold">Add a Todo</h2>
            <input onChange={handleChange} value={todo} type="text" className="w-1/2"/>
            <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold text-sm py-1 text-white rounded-md mx-6 ">Add</button>
          </div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length===0 && <div className="m-5">No Todos</div>}
            {todos.map(item => {

            return <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.iscompleted}  id="" />
              <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={handleEdit} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold text-sm py-1 text-white rounded-md mx-1">Edit</button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold text-sm py-1 text-white rounded-md mx-1">Delete</button>
              </div>
            </div>
            })}
          </div>
      </div>
    </>
  );
}

export default App

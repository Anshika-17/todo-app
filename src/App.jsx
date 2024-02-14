import { useState } from "react";

import Navbar from "./components/Navbar";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const handleEdit = () => {

  }
  const handleDelete = () => {

  }

  const handleAdd = () => {
    setTodos([...todos, {todo, iscompleted: false}])
    setTodo("")
    console.log(todos)
    
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
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
            {todos.map(item => {

            return <div key={todo} className="todo flex w-1/2 my-3 justify-between">
              <input type="checkbox" value={todo.iscompleted} name="" id="" />
              <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
              <div className="buttons">
                <button onClick={handleEdit} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold text-sm py-1 text-white rounded-md mx-1">Edit</button>
                <button onClick={handleDelete} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold text-sm py-1 text-white rounded-md mx-1">Delete</button>
              </div>
            </div>
            })}
          </div>
      </div>
    </>
  );
}

export default App

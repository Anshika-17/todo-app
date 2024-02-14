import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import Navbar from "./components/Navbar";
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("normal"); // default priority
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [date, setDate] = useState(""); // state for storing the date

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.find(item => item.id === id);
    if (t) {
      setTodo(t.todo);
      setPriority(t.priority);
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLs();
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLs();
    }
  };

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo: todo.trim(), iscompleted: false, priority: priority, date: date }]);
      setTodo("");
      setDate(""); // Reset date after adding todo
      saveToLs();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e, id) => {
    let index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
      let newTodos = [...todos];
      newTodos[index].iscompleted = !newTodos[index].iscompleted;
      setTodos(newTodos);
      saveToLs();
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Navbar />
      <div className={`container mx-auto my-5 p-5 rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-violet-100'} md:w-3/4 lg:w-2/3 xl:w-1/2`}>
        <h1 className="font-bold text-center text-xl mb-5">Manage Your Todos</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className={`w-full rounded-full px-5 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} focus:outline-none ${darkMode ? 'placeholder-gray-400' : 'focus:border-violet-800'}`} placeholder="Enter your todo..." />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Select
              options={[
                { value: 'low', label: 'Low', color: darkMode ? '#8257E6' : '#C7D2FE', fontWeight: 'normal' },
                { value: 'normal', label: 'Normal', color: darkMode ? '#6B46C1' : '#A78BFA', fontWeight: 'bold' },
                { value: 'high', label: 'High', color: darkMode ? '#4C1D95' : '#7F9CF5', fontWeight: 'bold' }
              ]}
              value={{ value: priority, label: priority.charAt(0).toUpperCase() + priority.slice(1), color: darkMode ? '#6B46C1' : '#A78BFA', fontWeight: 'bold' }}
              onChange={(selectedOption) => setPriority(selectedOption.value)}
              className="w-full"
              styles={{
                control: (styles) => ({
                  ...styles,
                  borderRadius: '9999px', // Make the dropdown rounded
                  backgroundColor: darkMode ? '#373737' : '#EDF2F7', // Background color of the dropdown
                  borderColor: darkMode ? '#4A5568' : '#E2E8F0', // Border color of the dropdown
                }),
                option: (styles, { data }) => ({
                  ...styles,
                  backgroundColor: data.color, // Set the background color of each option
                  color: '#FFFFFF', // Text color of each option
                  fontWeight: data.fontWeight // Font weight of each option
                }),
                singleValue: (styles, { data }) => ({
                  ...styles,
                  color: data.color, // Text color of the selected option
                  fontWeight: data.fontWeight // Font weight of the selected option
                }),
              }}
            />
          </motion.div>
          <input onChange={handleDateChange} value={date} type="date" className={`w-full rounded-full px-5 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} focus:outline-none ${darkMode ? 'placeholder-gray-400' : 'focus:border-violet-800'}`} placeholder="Enter due date..." />
          <button onClick={handleAdd} className={`w-full ${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-violet-800 hover:bg-violet-900'} text-white font-bold py-2 rounded-md ${todo.trim() === "" ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-900"}`}>Add Todo</button>
        </div>
        <div className="flex items-center mt-4">
          <input className="mr-2" onChange={toggleFinished} type="checkbox" checked={showFinished} />
          <label>Show Finished Todos</label>
        </div>
        <h2 className="text-lg font-bold mt-5">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className={`m-5 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No Todos</div>}
          {todos.map(item => (
            (showFinished || !item.iscompleted) &&
            <div key={item.id} className={`todo flex items-center justify-between border-b border-gray-200 py-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center gap-3">
                <input name={item.id} onChange={(e) => handleCheckbox(e, item.id)} type="checkbox" checked={item.iscompleted} />
                <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                <span className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{item.date}</span> {/* Display date */}
              </div>
              <div className="flex items-center gap-3"> {/* Adjusted priority badge alignment */}
                <span className={`px-2 py-1 text-sm font-bold rounded ${item.priority === 'high' ? 'bg-red-500 text-white' : item.priority === 'normal' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>{item.priority}</span>
                <div className="buttons flex gap-3">
                  <button onClick={() => handleEdit(item.id)} className={`bg-${darkMode ? 'gray' : 'violet'}-800 hover:bg-${darkMode ? 'gray' : 'violet'}-900 text-white py-1 px-2 rounded-md`}><FaEdit /></button>
                  <button onClick={() => handleDelete(item.id)} className={`bg-${darkMode ? 'gray' : 'violet'}-800 hover:bg-${darkMode ? 'gray' : 'violet'}-900 text-white py-1 px-2 rounded-md`}><AiFillDelete /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {/* Animated dark mode toggle */}
          <AnimatePresence>
            <motion.div
              className={`relative w-14 h-8 rounded-full cursor-pointer ${darkMode ? 'bg-gray-600' : 'bg-violet-800'}`}
              onClick={toggleDarkMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={`absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-md ${darkMode ? 'translate-x-full' : 'translate-x-0'}`}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <FiSun className={`absolute left-0 top-1/2 -translate-y-1/2 ml-1 text-yellow-300 ${darkMode ? 'opacity-0' : 'opacity-100'}`} />
              <FiMoon className={`absolute right-0 top-1/2 -translate-y-1/2 mr-1 text-yellow-300 ${darkMode ? 'opacity-100' : 'opacity-0'}`} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;

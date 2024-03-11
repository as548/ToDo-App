import { useEffect, useState } from 'react'
import './App.css'
import {TodoProvider} from './contexts/ToDoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

import { MdOutlineLightMode } from "react-icons/md";
import './style/styles.css'

const ThemeSwitcher = () => {
  useEffect(() => {
    // Your ThemeSwitcher class code goes here
    class ThemeSwitcher {
      constructor(themes, html) {
        this.themes = themes;
        this.html = html;
        this.init();
      }

      init() {
        const theme = this.getThemeFromLocalStorage();
        if (theme) {
          this.setTheme(theme);
        }

        this.addThemeEventListeners();
      }

      addThemeEventListeners() {
        this.themes.forEach((theme) => {
          theme.addEventListener("click", () => {
            const themeName = theme.getAttribute("theme");
            this.setTheme(themeName);
            this.saveThemeToLocalStorage(themeName);
          });
        });
      }

      setTheme(themeName) {
        this.html.setAttribute("data-theme", themeName);
        this.html.style.setProperty("--text-color", this.themes[0].style.color);
      }

      saveThemeToLocalStorage(themeName) {
        localStorage.setItem("theme", themeName);
      }

      getThemeFromLocalStorage() {
        return localStorage.getItem("theme");
      }
    }

    const themes = document.querySelectorAll(".theme-item");
    const html = document.documentElement; // You can adjust this selector based on your HTML structure

    new ThemeSwitcher(themes, html);
  }, []);

  return (
    <div className="theme-switcher">
      <div className="dropdown dropdown-left">
        <label tabIndex="0" className="btn m-1">
          <MdOutlineLightMode size={30}/>
        </label>
       
        <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li className="theme-item" theme="cupcake"><a>cupcake</a></li>
          <li className="theme-item" theme="pastel"><a>pastel</a></li>
          <li className="theme-item" theme="garden"><a>garden</a></li>
          <li className="theme-item" theme="synthwave"><a>synthwave</a></li> 
          <li className="theme-item" theme="corporate"><a>corporate</a></li>
          <li className="theme-item" theme="fantasy"><a>fantasy</a></li>
          <li className="theme-item" theme="dracula"><a>dracula</a></li>
          <li className="theme-item" theme="aqua"><a>aqua</a></li>
          <li className="theme-item" theme="autumn"><a>autumn</a></li>
          <li className="theme-item" theme="business"><a>business</a></li>
          <li className="theme-item" theme="lemonade"><a>lemonade</a></li>
          <li className="theme-item" theme="coffee"><a>coffee</a></li>
          <li className="theme-item" theme="winter"><a>winter</a></li>
          <li className="theme-item" theme="nord"><a>nord</a></li>         
          <li className="theme-item" theme="valentine"><a>valentine</a></li>
          <li className="theme-item" theme="retro"><a>retro</a></li>
          <li className="theme-item" theme="night"><a>night</a></li>
        </ul>
      </div>
    </div>
  );
};
function App() {
  
  const [todos,setTodos]=useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if todos are already stored in localStorage
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
  
        if (storedTodos && storedTodos.length > 0) {
          setTodos(storedTodos);
        } else {
          // Fetch todos from the API if not found in localStorage
          const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const data = await response.json();
          setTodos(data);
          localStorage.setItem('todos', JSON.stringify(data));
        }
  
        // Check and set the theme
        const theme = localStorage.getItem('theme');
        if (theme) {
          document.documentElement.setAttribute('data-theme', theme);
        }
  
        // Set loading to false once data is loaded
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };
  
    // Use a loading state to track whether data is being fetched
    
  
    // Only load data if the component is mounted and not loading
    if (!loading) {
      loadData();
    }
  }, []);
  
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev,])
    setCurrentFilter("all")
  }

  const updateTodo=(id,title)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id
      ?title:prevTodo)))
  }
 
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>
    prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
  }
  
  const deleteAll=()=>{
    setTodos([]);
  }
   useEffect(()=>{
      const todos=JSON.parse(localStorage.getItem("todos"));

      if(todos&&todos.length>0){
        setTodos(todos);
      }
   },[])

   useEffect(()=>{
     localStorage.setItem("todos",JSON.stringify(todos))
   },[todos])

   useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);
   const showAll = () => {
    setCurrentFilter("all");
  };

  const showPending = () => {
    setCurrentFilter("pending");
  };

  const showCompleted = () => {
    setCurrentFilter("completed");
  };

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "all") {
      return true;
    } else if (currentFilter === "pending") {
      return !todo.completed;
    } else if (currentFilter === "completed") {
      return todo.completed;
    }
    return true;
  });



  return (
    <>
    <TodoProvider  value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className>
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 ">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2 ">ToDo List</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                         <TodoForm/>
                    </div>
          <div className="todos-filter">
            <div className="dropdown">
                <label tabIndex="0" className="btn m-1">Filter{`(${currentFilter})`}</label>
                <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
                    <li onClick={showAll}><a>All {`(${todos.length})`}</a></li>
                    <li onClick={showPending}><a>Pending {`(${todos.filter(todo => !todo.completed).length})`}</a></li>
                    <li onClick={showCompleted}><a>Completed {`(${todos.filter(todo => todo.completed).length})`}</a></li>
                </ul>
            </div>
            <button onClick={deleteAll} className="btn btn-secondary delete-all-btn">
                Delete All
            </button>
        </div>

         <table className="table w-full">
            <thead>
                <tr>
                    <th className='task'>Task</th>
                    
                </tr>
            </thead>
            <tbody className="todos-list-body">
            </tbody>
        </table>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {filteredTodos.map((todo)=>(
                          <div key={todo.id} className='w-full'>

                          <TodoItem  todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
                <ThemeSwitcher/>
            </div>
    </TodoProvider>
    
    </>
    
  )
}

export default App

import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/ToDoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import AlertMessage from "./components/alertMessage";
import { MdOutlineLightMode } from "react-icons/md";
import "./style/styles.css";

const ThemeSwitcher = () => {
  useEffect(() => {
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
    const html = document.documentElement;

    new ThemeSwitcher(themes, html);
  }, []);

  return (
    <div className="theme-switcher">
      <div className="dropdown dropdown-left">
        <label tabIndex="0" className="btn m-1">
          <MdOutlineLightMode size={30} />
        </label>
        <ul
          tabIndex="0"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li className="theme-item" theme="cupcake">
            <a>cupcake</a>
          </li>
          <li className="theme-item" theme="pastel">
            <a>pastel</a>
          </li>
          <li className="theme-item" theme="garden">
            <a>garden</a>
          </li>
          <li className="theme-item" theme="synthwave">
            <a>synthwave</a>
          </li>
          <li className="theme-item" theme="corporate">
            <a>corporate</a>
          </li>
          <li className="theme-item" theme="fantasy">
            <a>fantasy</a>
          </li>
          <li className="theme-item" theme="dracula">
            <a>dracula</a>
          </li>
          <li className="theme-item" theme="aqua">
            <a>aqua</a>
          </li>
          <li className="theme-item" theme="autumn">
            <a>autumn</a>
          </li>
          <li className="theme-item" theme="business">
            <a>business</a>
          </li>
          <li className="theme-item" theme="lemonade">
            <a>lemonade</a>
          </li>
          <li className="theme-item" theme="coffee">
            <a>coffee</a>
          </li>
          <li className="theme-item" theme="winter">
            <a>winter</a>
          </li>
          <li className="theme-item" theme="nord">
            <a>nord</a>
          </li>
          <li className="theme-item" theme="valentine">
            <a>valentine</a>
          </li>
          <li className="theme-item" theme="retro">
            <a>retro</a>
          </li>
          <li className="theme-item" theme="night">
            <a>night</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
function App() {
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetching the todos
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );

        if (!response.ok) {
          // showAlertMessage("Failed to fetch the data");
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        //sorting them in descending order on basis of their Ids
        const sortedData = data.sort((a, b) => b.id - a.id);
        setTodos(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Set error message and type for display
        setErrorMessage("⚠ Failed to fetch data. Please try again.");
        setErrorType("error");
        console.error("Error fetching data:", error.message);
      }
    };

    // Load data when the component mounts
    fetchData();
  }, []);

  //adding new data to todos
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    setCurrentFilter("all");
  };

  //updating the todo
  const updateTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? title : prevTodo))
    );
  };

  //deleting todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  //marking completed and non-completed
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  //deleting all todos
  const deleteAll = () => {
    setTodos([]);
  };

  //storing data in local storage
  // useEffect(() => {
  //   const todos = JSON.parse(localStorage.getItem("todos"));

  //   if (todos && todos.length > 0) {
  //     setTodos(todos);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  //storing the theme in local storage
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  //Filter functionalities
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
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className>
        <AlertMessage message={errorMessage} type={errorType} />
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 ">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2 ">
            ToDo List
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="todos-filter">
            <div className="dropdown">
              <label tabIndex="0" className="btn m-1">
                Filter{`(${currentFilter})`}
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
              >
                <li onClick={showAll}>
                  <a>All {`(${todos.length})`}</a>
                </li>
                <li onClick={showPending}>
                  <a>
                    Pending{" "}
                    {`(${todos.filter((todo) => !todo.completed).length})`}
                  </a>
                </li>
                <li onClick={showCompleted}>
                  <a>
                    Completed{" "}
                    {`(${todos.filter((todo) => todo.completed).length})`}
                  </a>
                </li>
              </ul>
            </div>
            <button
              onClick={deleteAll}
              className="btn btn-secondary delete-all-btn"
            >
              Delete All
            </button>
          </div>

          <table className="table w-full">
            <thead>
              <tr>
                <th className="task">Task</th>
              </tr>
            </thead>
          </table>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
        <ThemeSwitcher />
      </div>
    </TodoProvider>
  );
}

export default App;

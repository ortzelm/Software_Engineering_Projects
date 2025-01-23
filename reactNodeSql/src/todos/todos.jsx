import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchServer } from '../service/server';
import './todos.css';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // לעקוב אחרי ה-Todo בעריכה
  const [tempTitle, setTempTitle] = useState(''); // לאחסן את הכותרת הזמנית לעריכה
  const [search, setSearch] = useState({ id: '', title: '', completed: '' }); // ערכי החיפוש לכל עמודה
  const [sortFunc, setSortFunc] = useState({ sortCriteria: '', sortDirection: '' });

  useEffect(() => {
    const fetchTodos = async () => {
      const allTodos = await fetchServer(`/todos?userId=${JSON.parse(localStorage.getItem('currentUserId'))}`);
      setTodos(allTodos);
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos?.length) {
      handleSearch();
    }
  }, [search, todos]);

 
  useEffect(() => {
    const sortedTodos = sortTodos();
    setFilteredTodos(sortedTodos); 
  }, [sortFunc]);

  const handleSaveTitle = async (todoId) => {      // עדכון בשרת
      await fetchServer(`/todos/${todoId}`, { title: tempTitle }, 'PATCH');
      // עדכון ב-UI
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === todoId ? { ...todo, title: tempTitle } : todo))
      );
      setEditingTodo(null); // יציאה ממצב עריכה
  };

  //מחיקה של משימה
  const handleDelete = async (todoId) => {
    try {
      await fetchServer(`/todos/${todoId}`, {}, 'DELETE');
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSearch = () => {
    let filtered = [...todos];
    if (search.id !== '') {
      filtered = filtered.filter(todo => todo.id.toString().includes(search.id));
    }
    if (search.title !== '') {
      filtered = filtered.filter(todo => todo.title.toLowerCase().includes(search.title.toLowerCase()));
    }
    if (search.completed !== '') {
      const completedStatus = search.completed === 'true';
      filtered = filtered.filter(todo => todo.completed === completedStatus);
    }
    setFilteredTodos(filtered);
  };
  const handleCheckboxChange = async (todoId, statusCompleted) => {
    await fetchServer(`/todos/${todoId}`, { completed: !statusCompleted }, 'PATCH');
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === todoId ? { ...todo, completed: !statusCompleted } : todo))
    );
  };


  const handleAddTodo = async () => {
    const newTitle = prompt('Enter todo title:');
    const isCompleted = confirm('Is this todo completed?');
    const newTodo = { userId: JSON.parse(localStorage.getItem('currentUserId')), title: newTitle, completed: isCompleted };
    const newTodoAfterServer = await fetchServer(`/todos`, newTodo, 'POST');
    setTodos((prevTodos) => [...prevTodos, newTodoAfterServer]);
  };

  const sortTodos = () => {
    const sortedTodos = [...filteredTodos]; // יוצרים עותק חדש של המערך
    return sortedTodos.sort((a, b) => {
      let compare = 0;
      if (sortFunc.sortCriteria === 'id') {
        compare = String(a.id).localeCompare(String(b.id));
      } else if (sortFunc.sortCriteria === 'title') {
        compare = a.title.localeCompare(b.title);
      } else if (sortFunc.sortCriteria === 'completed') {
        compare = a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      } else if (sortFunc.sortCriteria === 'random') {
        compare = Math.random();
      }
      return sortFunc.sortDirection === 'desc' ? -compare : compare
    });
  };

  // פונקציה שתופסת את שינויי המיון
  const handleSortChange = (e) => {
    const [criteria, direction] = e.target.value.split('-');
    setSortFunc({ sortCriteria: criteria, sortDirection: direction });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleAddTodo}>Add Todo</button>
      {/* Select for sorting */}
      <select onChange={(e) => handleSortChange(e, setSortFunc)}>
        <option value="id-asc">ID (Ascending)</option>
        <option value="id-desc">ID (Descending)</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="completed-asc">Completed (Yes first)</option>
        <option value="completed-desc">Completed (No first)</option>
        <option value="random-asc">Random</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>ID<br /><input type="text" placeholder="Search ID" value={search.id} onChange={(e) => setSearch({ ...search, id: e.target.value })} /> </th>
            <th> Title <br /> <input type="text" placeholder="Search Title" value={search.title} onChange={(e) => setSearch({ ...search, title: e.target.value })} /> </th>
            <th> Completed <br /> <select value={search.completed} onChange={(e) => setSearch({ ...search, completed: e.target.value })} >
              <option value="">All</option>
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{console.log(filteredTodos)}
          {filteredTodos?.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>
                {editingTodo === todo.id ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} autoFocus />
                    <button onClick={() => handleSaveTitle(todo.id)} style={{ marginLeft: '10px' }}> ✔</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {todo.title}
                    <button
                      onClick={() => {
                        setEditingTodo(todo.id);
                        setTempTitle(todo.title); // אתחול הכותרת הזמנית
                      }}
                      style={{ marginLeft: '10px' }}
                    >
                      ✏️
                    </button>
                  </div>
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.id, todo.completed)}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(todo.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todos;


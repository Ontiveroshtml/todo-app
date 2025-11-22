import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");

  // ⬅️ Cargar desde localStorage SIN useEffect
  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  });

  // ⬅️ Guardar en localStorage cuando cambien las tareas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(item));
  }, [item]);

  const getTask = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== "") {
      setItem([...item, task]);
    }
    setTask("");
  };

  const deleteTask = (index) => {
    const filterTask = item.filter((_, i) => i !== index);
    setItem(filterTask);
  };

  return (
    <>
      <h1>TODO APP</h1>

      <input
        type="text"
        value={task}
        onChange={getTask}
        className="bg-Purple-600 text-white"
      />
      <button onClick={addTask}>Agregar</button>

      {item.map((t, index) => (
        <div key={index} className="flex bg-Navy-900 text-white gap-8">
          <p>{t}</p>
          <button className="bg-green-700" onClick={() => deleteTask(index)}>
            Completar
          </button>
        </div>
      ))}
    </>
  );
}

export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoFormModal from "../components/TodoFormModal.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Toast from "../components/Toast.jsx";
import { PriorityText, StatusText } from "../components/Badges.jsx";
import { EyeIcon, TrashIcon } from "../components/Icons.jsx";

export default function TodoList() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  return (
    <main className="container">
      <header className="page-header">
        <h1>Todo List</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>
          Tambah Todo
        </button>
      </header>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th className="center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty">
                  Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas pertama 
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="truncate" title={todo.title}>{todo.title}</td>
                  <td><StatusText value={todo.status} /></td>
                  <td><PriorityText value={todo.priority} /></td>
                  <td>{todo.deadline}</td>
                  <td className="center">
                    <div className="actions">
                      <button
                        className="icon-btn btn-primary"
                        aria-label={`Lihat detail ${todo.title}`}
                        onClick={() => navigate(`/todo/${todo.id}`)}
                      >
                        <EyeIcon />
                      </button>
                      <button
                        className="icon-btn btn-soft"
                        aria-label={`Hapus ${todo.title}`}
                        onClick={() => setToDelete(todo)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <TodoFormModal onSubmit={addTodo} onClose={() => setShowAdd(false)} />
      )}

      {toDelete && (
        <ConfirmModal
          title="Hapus Todo"
          message={`Apakah kamu yakin ingin menghapus "${toDelete.title}"?`}
          onConfirm={() => deleteTodo(toDelete.id)}
          onClose={() => setToDelete(null)}
        />
      )}

      <Toast />
    </main>
  );
}

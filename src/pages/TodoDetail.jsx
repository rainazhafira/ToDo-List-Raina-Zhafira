import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoFormModal from "../components/TodoFormModal.jsx";
import Toast from "../components/Toast.jsx";
import { PriorityText, StatusText } from "../components/Badges.jsx";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodo, updateTodo } = useTodos();
  const [showEdit, setShowEdit] = useState(false);

  const todo = getTodo(id);

  if (!todo) {
    return (
      <main className="container narrow">
        <div className="card">
          <h2>Tugas tidak ditemukan</h2>
          <p className="muted">Tugas dengan ID {id} tidak ada atau sudah dihapus.</p>
          <button className="btn btn-soft btn-sm" onClick={() => navigate("/")}>Kembali</button>
        </div>
        <Toast />
      </main>
    );
  }

  return (
    <main className="container narrow">
      <div className="card detail floating">
        <div className="detail-left">
          <h3>Judul</h3>
          <p>{todo.title}</p>
          <h3>Deskripsi</h3>
          <div className="desc-box">{todo.description}</div>
        </div>

        <div className="detail-right">
          <h3>Status</h3>
          <p><StatusText value={todo.status} /></p>
          <h3>Prioritas</h3>
          <p><PriorityText value={todo.priority} /></p>
          <h3>Deadline</h3>
          <p>{todo.deadline}</p>
          <div className="row">
            <button className="btn btn-soft btn-sm" onClick={() => navigate("/")}>Kembali</button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowEdit(true)}>Update</button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoFormModal
          todo={todo}
          onSubmit={(data) => updateTodo(todo.id, data)}
          onClose={() => setShowEdit(false)}
        />
      )}

      <Toast />
    </main>
  );
}

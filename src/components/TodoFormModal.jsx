import { useState } from "react";
import Modal from "./Modal.jsx";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos.js";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoFormModal({ todo = null, onSubmit, onClose }) {
  const isEdit = Boolean(todo);
  const [form, setForm] = useState(
    todo
      ? {
          title: todo.title,
          description: todo.description,
          status: todo.status,
          priority: todo.priority,
          deadline: todo.deadline,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Judul wajib diisi !!";
    if (!form.description.trim()) err.description = "Deskripsi wajib diisi !!";
    if (!form.deadline) err.deadline = "Deadline wajib diisi !!";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
    onClose();
  };

  return (
    <Modal title={isEdit ? "Update Todo" : "Tambah Todo"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span>Judul</span>
          <input name="title" value={form.title} onChange={handleChange} autoFocus />
          {errors.title && <small className="error">{errors.title}</small>}
        </label>

        <label className="field">
          <span>Deskripsi</span>
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <small className="error">{errors.description}</small>}
        </label>

        <div className="row">
          <label className="field">
            <span>Status</span>
            <select name="status" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Prioritas</span>
            <select name="priority" value={form.priority} onChange={handleChange}>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="field">
          <span>Deadline</span>
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
          {errors.deadline && <small className="error">{errors.deadline}</small>}
        </label>

        <div className="row modal-actions">
          <button type="button" className="btn btn-soft" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Tambah"}</button>
        </div>
      </form>
    </Modal>
  );
}

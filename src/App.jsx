import { Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList.jsx";
import TodoDetail from "./pages/TodoDetail.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/todo/:id" element={<TodoDetail />} />
      <Route path="*" element={<TodoList />} />
    </Routes>
  );
}

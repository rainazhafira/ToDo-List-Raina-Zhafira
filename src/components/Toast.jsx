import { useEffect } from "react";
import { useTodos } from "../context/TodoContext.jsx";

export default function Toast() {
  const { toast, clearToast } = useTodos();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 2500);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.type}`} role="status" key={toast.key}>
      {toast.message}
    </div>
  );
}

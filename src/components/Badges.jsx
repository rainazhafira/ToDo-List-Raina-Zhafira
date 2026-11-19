export function PriorityText({ value }) {
  return (
    <span className={`priority priority-${value}`}>
      {value}
      {value === "high" ? "!" : ""}
    </span>
  );
}

export function StatusText({ value }) {
  if (value === "done") {
    return <span className="status-done">done :D</span>;
  }
  return <span>{value}</span>;
}

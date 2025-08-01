import Button from "./Button";

export default function TaskCard({
  activity,
  onSelection,
  selectedActivity,
  onDelete,
}) {
  const isSelected = selectedActivity?.id === activity.id;
  return (
    <div className="task-card">
      <div className="task-title">
        <span>{activity.title}</span>
        <span className="boton" onClick={() => onDelete(activity)}>
          &#88;
        </span>
      </div>

      <p className="task-description">{activity.description}</p>
      <div className="task-meta">
        <span>🕒 {activity.priority}</span>
        <span>👤 {activity.assignedTo}</span>
        <span>
          <Button
            text={isSelected ? "Close" : "Select"}
            onClick={() => onSelection(activity)}
          />
        </span>
      </div>
    </div>
  );
}

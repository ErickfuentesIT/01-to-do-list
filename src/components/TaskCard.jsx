import Button from "./Button";

export default function TaskCard({ activity, onSelection, selectedActivity }) {
  const isSelected = selectedActivity?.id === activity.id;
  return (
    <div className="task-card">
      <span className="task-title">{activity.title}</span>
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

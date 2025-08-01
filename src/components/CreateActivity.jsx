import { useEffect, useState } from "react";
import Button from "./Button";

export default function CreateActivity({
  onAddActivity,
  selectedActivity,
  onUpdateActivity,
  onCancelUpdate,
}) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [priority, setPriority] = useState("High");
  const [assignedTo, setAssignedTo] = useState(null);
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (selectedActivity) {
      setTitle(selectedActivity?.title);
      setDescription(selectedActivity?.description);
      setPriority(selectedActivity?.priority);
      setAssignedTo(selectedActivity?.assignedTo);
      setStatus(selectedActivity?.status);
    }
  }, [selectedActivity]);

  function handleInsertForm(e) {
    e.preventDefault();

    if (!title || !description || !priority || !assignedTo || !status) return;

    const id = crypto.randomUUID();

    const newActivity = {
      id,
      title,
      description,
      priority,
      assignedTo,
      status,
    };
    console.log(newActivity);
    onAddActivity(newActivity);

    setTitle("");
    setDescription("");
    setPriority("High");
    setAssignedTo("");
    setStatus("todo");
  }

  function handleUpdateFields(e) {
    e.preventDefault();

    if (!title || !description || !priority || !assignedTo || !status) return;

    const updatedActivity = {
      id: selectedActivity.id,
      title,
      description,
      priority,
      assignedTo,
      status,
    };
    console.log(updatedActivity);

    onUpdateActivity(updatedActivity);

    setTitle(null);
    setDescription(null);
    setPriority("High");
    setAssignedTo(null);
    setStatus("todo");
  }

  function handleClearFields() {
    setTitle("");
    setDescription("");
    setPriority("High");
    setAssignedTo("");
    setStatus("todo");
  }

  return (
    <form
      className="task-form"
      onSubmit={selectedActivity ? handleUpdateFields : handleInsertForm}
    >
      <label>📝 Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>📄 Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>📌 Priority</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <label>✈ Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="todo">To-do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>

      <label>👤 Assigned to</label>
      <input
        type="text"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />

      <Button text={selectedActivity ? "Update Task" : "Add Task"} />
      {(title || description || assignedTo || selectedActivity) && (
        <Button
          text={selectedActivity ? "Cancel" : "Clear"}
          onClick={selectedActivity ? onCancelUpdate : handleClearFields}
        />
      )}
    </form>
  );
}

import { useState } from "react";
import "./styles.css";

const initialActivities = [
  {
    id: 1,
    title: "Record demonstration video",
    description: "Content needs to be related with new project",
    priority: "High",
    assignedTo: "Erick Fuentes",
    status: "todo",
  },
  {
    id: 2,
    title: "Design login screen",
    description: "Create responsive layout for mobile and desktop",
    priority: "Medium",
    assignedTo: "Laura Méndez",
    status: "todo",
  },
  {
    id: 3,
    title: "Connect API to dashboard",
    description: "Integrate stats API with dashboard widgets",
    priority: "High",
    assignedTo: "Carlos Ramos",
    status: "doing",
  },
  {
    id: 4,
    title: "Fix mobile menu bug",
    description: "Issue with menu not closing on route change",
    priority: "Low",
    assignedTo: "Gabriela Torres",
    status: "done",
  },
];

function App() {
  const [activities, setActivities] = useState(initialActivities);
  const [selectedActivity, setSelectedActivity] = useState(null);

  function handleActivity(newActivity) {
    setActivities((activities) => [...activities, newActivity]);
  }

  function handleSelect(activity) {
    setSelectedActivity((cur) => (cur?.id === activity.id ? null : activity));
  }

  return (
    <div className="app">
      <div className="kanban-column">
        <Title text="Create Activity" />
        <CreateActivity
          activity={activities}
          selectedActivity={selectedActivity}
          onAddActivity={handleActivity}
        />
      </div>
      <div className="kanban-column">
        <Title text="To-do" />
        {activities
          .filter((activity) => activity.status === "todo")
          .map((activity) => (
            <TaskCard
              activity={activity}
              selectedActivity={selectedActivity}
              key={activity.id}
              onSelection={handleSelect}
            />
          ))}
      </div>
      <div className="kanban-column">
        <Title text="Doing" />
        {activities
          .filter((activity) => activity.status === "doing")
          .map((activity) => (
            <TaskCard
              activity={activity}
              selectedActivity={selectedActivity}
              key={activity.id}
              onSelection={handleSelect}
            />
          ))}
      </div>
      <div className="kanban-column">
        <Title text="Done" />
        {activities
          .filter((activity) => activity.status === "done")
          .map((activity) => (
            <TaskCard
              activity={activity}
              selectedActivity={selectedActivity}
              key={activity.id}
              onSelection={handleSelect}
            />
          ))}
        <Modal />
      </div>
    </div>
  );
}

function Title({ text }) {
  return <h2>{text}</h2>;
}

function TaskCard({ activity, onSelection, selectedActivity }) {
  const isSelected = selectedActivity?.id === activity.id;
  return (
    <div className="task-card">
      <span className="task-title">{activity.title}</span>
      <p className="task-description">{activity.description}</p>
      <div className="task-meta">
        <span>🕒 {activity.priority}</span>
        <span>👤 {activity.assignedTo}</span>
        <span>
          <Modal
            text={isSelected ? "Close" : "Select"}
            onClick={() => onSelection(activity)}
          />
        </span>
      </div>
    </div>
  );
}

function CreateActivity({ onAddActivity }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("todo");

  function handleForm(e) {
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

  function handleClearFields() {
    setTitle("");
    setDescription("");
    setPriority("High");
    setAssignedTo("");
    setStatus("todo");
  }

  return (
    <form className="task-form" onSubmit={handleForm}>
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

      <Button text="Add Task" />
      <Button text="Clear" onClick={handleClearFields} />
    </form>
  );
}

function Modal({ text }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <Button onClick={openModal} text={text} />

      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Este es el modal</h2>
            <p>Puedes poner cualquier contenido aquí.</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Button({ text, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default App;

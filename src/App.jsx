import { useState } from "react";
import "./styles.css";
import Title from "./components/Title";
import CreateActivity from "./components/CreateActivity";
import TaskCard from "./components/TaskCard";

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

  function handleUpdate(updatedActivity) {
    setActivities((activities) =>
      activities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );

    setSelectedActivity(null);
  }

  function handleCancelUpdate() {
    setSelectedActivity(null);
  }

  function handleDelete(activityToDelete) {
    setActivities((activities) =>
      activities.filter((activity) => activity.id !== activityToDelete.id)
    );
  }

  const updateActivity = selectedActivity?.id === activities.id;

  return (
    <div className="app">
      <div className="kanban-column">
        {updateActivity && (
          <>
            <Title text="Create Activity" />
            <CreateActivity
              selectedActivity={selectedActivity}
              onAddActivity={handleActivity}
              onUpdateActivity={handleUpdate}
              onCancelUpdate={handleCancelUpdate}
            />
          </>
        )}
        {!updateActivity && (
          <>
            <Title text="Update Activity" />
            <CreateActivity
              selectedActivity={selectedActivity}
              onAddActivity={handleActivity}
              onUpdateActivity={handleUpdate}
              onCancelUpdate={handleCancelUpdate}
            />
          </>
        )}
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
              onDelete={handleDelete}
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
              onDelete={handleDelete}
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
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { CheckCircle2, Clock, Circle, Edit3, Trash2, MoreVertical } from 'lucide-react';
import type { Task } from '../../types/types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onEdit, onDelete }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle2 className="task-icon" />;
      case 'in-progress':
        return <Clock className="task-icon" />;
      default:
        return <Circle className="task-icon" />;
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Pending';
    }
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-header">
        <div className="task-title-container">
          <div className={`task-status-badge ${task.status}`}>
            {getStatusIcon()}
            <span>{getStatusText()}</span>
          </div>
        </div>
        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="task-action-btn"
            title="Edit task"
          >
            <Edit3 className="task-icon" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="task-action-btn delete"
            title="Delete task"
          >
            <Trash2 className="task-icon" />
          </button>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value as Task['status'])}
          className="task-status-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        
        <div className="task-meta">
          <div className="task-date">
            <Clock className="task-icon" />
            <span>{new Date(task.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
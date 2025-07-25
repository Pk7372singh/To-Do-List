import React from 'react';
import { Circle, Clock, CheckCircle2, BarChart3 } from 'lucide-react';

interface TaskFiltersProps {
  filter: 'all' | 'pending' | 'in-progress' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'in-progress' | 'completed') => void;
  taskCounts: {
    all: number;
    pending: number;
    'in-progress': number;
    completed: number;
  };
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filter, onFilterChange, taskCounts }) => {
  const getFilterIcon = (status: string) => {
    switch (status) {
      case 'all':
        return <BarChart3 className="task-icon" />;
      case 'pending':
        return <Circle className="task-icon" />;
      case 'in-progress':
        return <Clock className="task-icon" />;
      case 'completed':
        return <CheckCircle2 className="task-icon" />;
      default:
        return <Circle className="task-icon" />;
    }
  };

  const getFilterText = (status: string) => {
    switch (status) {
      case 'all':
        return 'All Tasks';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'in-progress', label: 'In Progress', count: taskCounts['in-progress'] },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ] as const;

  return (
    <div className="filter-tabs">
      {filters.map((filterOption) => (
        <button
          key={filterOption.key}
          onClick={() => onFilterChange(filterOption.key)}
          className={`filter-tab ${filter === filterOption.key ? 'active' : ''}`}
        >
          {getFilterIcon(filterOption.key)}
          <span>{filterOption.label}</span>
          <span className="filter-count">{filterOption.count}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
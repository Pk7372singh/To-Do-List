// import React from 'react';
// import { AlertCircle } from 'lucide-react';
// interface EmptyStateProps {
//   filter: 'all' | 'pending' | 'in-progress' | 'completed';
// }
// const EmptyState: React.FC<EmptyStateProps> = ({ filter }) => {
//   return (
//     <div className="empty-state">
//       <div className="empty-icon">
//         <AlertCircle className="task-icon pending" />
//       </div>
//       <h3 className="empty-title">No tasks found</h3>
//       <p className="empty-description">
//         {filter === 'all' 
//           ? "Get started by creating your first task!" 
//           : `No ${filter.replace('-', ' ')} tasks at the moment.`
//         }
//       </p>
//     </div>
//   );
// };
// export default EmptyState;

import React from 'react';
import { Search, Circle, Clock, CheckCircle2, Plus } from 'lucide-react';

interface EmptyStateProps {
  filter: 'all' | 'pending' | 'in-progress' | 'completed';
  onCreateTask?: () => void;
  searchQuery?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filter, onCreateTask, searchQuery }) => {
  const getEmptyStateContent = () => {
    if (searchQuery) {
      return {
        icon: <Search className="task-icon" />,
        title: 'No tasks found',
        description: 'Try adjusting your search criteria or create a new task',
        showCreateButton: true
      };
    }

    switch (filter) {
      case 'pending':
        return {
          icon: <Circle className="task-icon" />,
          title: 'No pending tasks',
          description: 'All caught up! Create a new task or check other categories.',
          showCreateButton: true
        };
      case 'in-progress':
        return {
          icon: <Clock className="task-icon" />,
          title: 'No tasks in progress',
          description: 'Start working on a pending task or create a new one.',
          showCreateButton: true
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="task-icon" />,
          title: 'No completed tasks yet',
          description: 'Complete some tasks to see them here.',
          showCreateButton: false
        };
      default:
        return {
          icon: <Circle className="task-icon" />,
          title: 'No tasks yet',
          description: 'Get started by creating your first task and stay organized!',
          showCreateButton: true
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="empty-state">
      <div className="empty-icon">
        {content.icon}
      </div>
      <h3 className="empty-title">{content.title}</h3>
      <p className="empty-description">{content.description}</p>
      {content.showCreateButton && onCreateTask && (
        <button
          onClick={onCreateTask}
          className="btn btn-primary"
        >
          <Plus className="task-icon" />
          Create your first task
        </button>
      )}
    </div>
  );
};

export default EmptyState;
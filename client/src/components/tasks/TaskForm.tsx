import React, { useState } from 'react';
import { Plus, Edit3, X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (data: { title: string; description: string }) => void;
  onCancel: () => void;
  initialData?: { title: string; description: string };
  isEdit?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData, isEdit = false }) => {
  const [formData, setFormData] = useState(initialData || { title: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {isEdit ? <Edit3 className="task-icon" /> : <Plus className="task-icon" />}
            {isEdit ? 'Edit Task' : 'Create New Task'}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
              placeholder="Enter a descriptive task title..."
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="form-input"
              placeholder="Add task details, requirements, or notes..."
              style={{ resize: 'vertical', minHeight: '100px' }}
            />
          </div>
          
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formData.title.trim()}
            >
              {isEdit ? (
                <>
                  <Edit3 className="task-icon" />
                  Update Task
                </>
              ) : (
                <>
                  <Plus className="task-icon" />
                  Create Task
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              <X className="task-icon" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
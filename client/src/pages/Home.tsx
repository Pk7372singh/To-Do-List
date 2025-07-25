import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Circle, Clock, CheckCircle2, Users } from 'lucide-react';
import ApiService from '../api/ApiService';
import type { AuthData, Task, User } from '../types/types';
import Header from '../components/layout/Header';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilters from '../components/tasks/TaskFilters';
import EmptyState from '../components/ui/EmptyState';
import Loading from '../components/layout/Loading';
import AuthPage from './Auth';

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const apiService = new ApiService();

  useEffect(() => {
    const loadUserAndTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          apiService.setToken(token);
          await loadTasks();
        }
      } catch (error) {
        apiService.clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUserAndTasks();
  }, [user]);

  const loadTasks = async () => {
    try {
      const tasksData = await apiService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleLogin = async (authData: AuthData) => {
    apiService.setToken(authData.token);
    setUser(authData.user);
    try {
      const tasks = await apiService.getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleLogout = () => {
    apiService.clearToken();
    setUser(null);
    setTasks([]);
  };

  const handleCreateTask = async (taskData: { title: string; description: string }) => {
    try {
      const newTask = await apiService.createTask(taskData);
      setTasks([newTask, ...tasks]);
      setShowTaskForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskData: { title: string; description: string }) => {
    if (!editingTask) return;
    try {
      const updatedTask = await apiService.updateTask(editingTask._id, taskData);
      setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleStatusChange = async (id: string, status: Task['status']) => {
    try {
      const updatedTask = await apiService.updateTask(id, { status });
      setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiService.deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  // Filter tasks based on search query and status filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filter === 'all' || task.status === filter;
    return matchesSearch && matchesStatus;
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="main-content">
        {/* Controls Section */}
        <div className="controls-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => setShowTaskForm(true)}
            className="btn btn-primary"
          >
            <Plus className="task-icon" />
            New Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3>Total Tasks</h3>
                <p>{taskCounts.all}</p>
              </div>
              <div className="stat-icon total">
                <Circle className="task-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3>In Progress</h3>
                <p>{taskCounts['in-progress']}</p>
              </div>
              <div className="stat-icon in-progress">
                <Clock className="task-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3>Completed</h3>
                <p>{taskCounts.completed}</p>
              </div>
              <div className="stat-icon completed">
                <CheckCircle2 className="task-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3>Pending</h3>
                <p>{taskCounts.pending}</p>
              </div>
              <div className="stat-icon total">
                <Users className="task-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <TaskFilters 
          filter={filter} 
          onFilterChange={setFilter} 
          taskCounts={taskCounts} 
        />

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Search className="task-icon" />
            </div>
            <h3 className="empty-title">No tasks found</h3>
            <p className="empty-description">
              {searchQuery || filter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first task'}
            </p>
            <button
              onClick={() => setShowTaskForm(true)}
              className="btn btn-primary"
            >
              <Plus className="task-icon" />
              Create your first task
            </button>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showTaskForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowTaskForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
          initialData={{ title: editingTask.title, description: editingTask.description }}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default Home;
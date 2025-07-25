
import type { AuthData, Task, User } from '../types/types';
class ApiService {
  private baseURL = 'http://localhost:5000/api';
  private token: string | null = null;
  constructor() {
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` })
    };
  }
  async register(userData: { name: string; email: string; password: string }): Promise<AuthData> {
    const response = await fetch(`${this.baseURL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  }
  async login(credentials: { email: string; password: string }): Promise<AuthData> {
    const response = await fetch(`${this.baseURL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
  }
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${this.baseURL}/tasks`, {
      headers: this.getHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch tasks');
    return data;
  }
  async createTask(taskData: { title: string; description: string }): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(taskData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create task');
    return data;
  }
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await fetch(`${this.baseURL}/tasks/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update task');
    return data;
  }
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete task');
    }
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }
}
export default ApiService;
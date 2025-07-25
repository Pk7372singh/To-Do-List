export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdBy: string;
  collaborators: string[];
  createdAt: string;
  updatedAt: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
}
export interface AuthData {
  user: User;
  token: string;
}
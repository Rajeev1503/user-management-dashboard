import { create } from 'zustand';
import { User, UserFilters } from '@/types';

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  filters: UserFilters;
  setFilters: (filters: Partial<UserFilters>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, ...data } : user)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  filters: {
    search: '',
    status: 'All',
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    limit: 10,
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));

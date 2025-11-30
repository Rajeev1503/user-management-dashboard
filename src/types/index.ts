export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  avatarUrl: string;
  createdAt: string; // ISO date string
  lastLogin: string; // ISO date string
}

export interface AnalyticsData {
  signupTrend: {
    date: string;
    signups: number;
  }[];
  userDistribution: {
    status: UserStatus;
    count: number;
  }[];
}

export type SortField = 'name' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface UserFilters {
  search: string;
  status: UserStatus | 'All';
  sortBy: SortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

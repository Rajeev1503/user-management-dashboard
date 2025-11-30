import { User, AnalyticsData } from '@/types';

function generateUserName(i: number, pad: number = 2){
  return `User ${String(i + 1).padStart(pad, '0')}`;
}
export const MOCK_USERS: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: generateUserName(i),
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
  status: i % 4 === 0 ? 'Inactive' : 'Active',
  avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
}));

export const MOCK_ANALYTICS: AnalyticsData = {
  signupTrend: Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      signups: Math.floor(Math.random() * 50) + 10,
    };
  }),
  userDistribution: [
    { status: 'Active', count: MOCK_USERS.filter(u => u.status === 'Active').length },
    { status: 'Inactive', count: MOCK_USERS.filter(u => u.status === 'Inactive').length },
  ],
};

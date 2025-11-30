import { useQuery } from '@tanstack/react-query';
import { MOCK_USERS } from '@/lib/mock-data';
import { delay } from '@/lib/utils';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useRef } from 'react';

export function useUsersQuery() {
  const { users, setUsers, filters } = useUserStore();

  const {data, isLoading, isRefetching, isSuccess} = useQuery({
    queryKey: ['users'],
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: async () => {
      await delay(800);
      return MOCK_USERS;
    },
  });

  useEffect(() => {
    if (isSuccess && data && (!users || users.length === 0)) {
      setUsers(data);
    }
  }, [data, setUsers, isSuccess]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          user.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'All' || user.status === filters.status;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    const fieldA = a[filters.sortBy];
    const fieldB = b[filters.sortBy];
    
    if (filters.sortOrder === 'asc') {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  const totalPages = Math.ceil((filteredUsers?.length || 0) / filters.limit);
  const paginatedUsers = filteredUsers?.slice(
    (filters.page - 1) * filters.limit,
    filters.page * filters.limit
  );

  return {
    isLoading,
    data: paginatedUsers,
    totalPages,
    totalCount: filteredUsers?.length || 0,
  };
}

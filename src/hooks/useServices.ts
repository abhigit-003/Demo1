import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Service } from '@/data/mockData';

export const useServices = (params?: { limit?: number; sort?: string }) => {
  return useQuery({
    queryKey: ['services', params],
    queryFn: async () => {
      let url = '/services';
      if (params) {
        const query = new URLSearchParams();
        if (params.limit) query.append('limit', params.limit.toString());
        if (params.sort) query.append('sort', params.sort);
        const qs = query.toString();
        if (qs) url += `?${qs}`;
      }
      const { data } = await api.get<Service[]>(url);
      return data;
    },
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ['services', id],
    queryFn: async () => {
      const { data } = await api.get<Service>(`/services/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

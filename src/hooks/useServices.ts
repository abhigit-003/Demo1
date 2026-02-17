import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Service } from '@/data/mockData';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await api.get<Service[]>('/services');
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

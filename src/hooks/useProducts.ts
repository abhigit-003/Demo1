import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Product } from '@/data/mockData';

export const useProducts = (limit?: number) => {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: async () => {
      const { data } = await api.get<Product[]>(limit ? `/products?limit=${limit}` : '/products');
      return data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

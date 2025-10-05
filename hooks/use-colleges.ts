import { College } from '@/data/colleges';
import { ApiService } from '@/services/api';
import { useEffect, useState } from 'react';

export interface UseCollegesResult {
  colleges: College[];
  localColleges: College[];
  internationalColleges: College[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useColleges(): UseCollegesResult {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ApiService.getColleges();
      
      if (response.success && response.data) {
        setColleges(response.data);
      } else {
        setError(response.message || 'Failed to fetch colleges');
        // Fallback to local data if API fails
        const { getAllColleges } = await import('@/data/colleges');
        setColleges(getAllColleges());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      // Fallback to local data
      const { getAllColleges } = await import('@/data/colleges');
      setColleges(getAllColleges());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const localColleges = colleges.filter(college => college.type === 'local');
  const internationalColleges = colleges.filter(college => college.type === 'international');

  return {
    colleges,
    localColleges,
    internationalColleges,
    loading,
    error,
    refetch: fetchColleges,
  };
}

import { College } from '@/data/colleges';

const API_BASE_URL = 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export class ApiService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        data: null as T,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  static async getColleges(): Promise<ApiResponse<College[]>> {
    return this.makeRequest<College[]>('/items/getItem');
  }

  static async getLocalColleges(): Promise<ApiResponse<College[]>> {
    const response = await this.getColleges();
    if (response.success && response.data) {
      const localColleges = response.data.filter(college => college.type === 'local');
      return {
        success: true,
        data: localColleges,
      };
    }
    return response;
  }

  static async getInternationalColleges(): Promise<ApiResponse<College[]>> {
    const response = await this.getColleges();
    if (response.success && response.data) {
      const internationalColleges = response.data.filter(college => college.type === 'international');
      return {
        success: true,
        data: internationalColleges,
      };
    }
    return response;
  }
}

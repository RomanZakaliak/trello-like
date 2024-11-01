import { api } from '@/lib/api/api';
import { AccessToken } from '@/sсhemas/token.schema';
import { userLoginSchema, userRegisterSchema } from '@/sсhemas/user.schema';
import { z } from 'zod';

export class ApiUserService {
  private apiEndpoint: string;

  constructor() {
    this.apiEndpoint = '/auth';
  }

  async login(
    credentials: z.infer<typeof userLoginSchema>
  ): Promise<AccessToken> {
    const response = await api.post(this.apiEndpoint + '/login', credentials);
    return response.data;
  }

  async register(userData: z.infer<typeof userRegisterSchema>) {
    // temp fix to make backend math this object
    const newUserData = { ...userData, confirmPassword: undefined };
    await api.post(this.apiEndpoint + '/register', newUserData);
  }

  async refresh(): Promise<AccessToken> {
    const response = await api.get(this.apiEndpoint + '/refresh');
    return response.data;
  }

  async logout(): Promise<void> {
    await api.delete(this.apiEndpoint + '/logout');
  }
}

const apiUserService = new ApiUserService();
export { apiUserService };

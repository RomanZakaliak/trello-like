import {
  HttpContentType,
  HttpHeader,
  HttpMethod,
} from '@/common/enums/http.enum';
import { environment } from '@/config/environment';
import { userLoginSchema } from '@/sсhemas/user.schema';
import { z } from 'zod';

class ApiUserService {
  private apiEndpoint: string;
  constructor() {
    this.apiEndpoint = environment.apiBaseUrl + '/auth';
  }

  async login(credentials: z.infer<typeof userLoginSchema>) {
    const headers = new Headers();
    headers.append(HttpHeader.CONTENT_TYPE, HttpContentType.JSON);

    const response = await fetch(this.apiEndpoint + '/login', {
      headers: headers,
      method: HttpMethod.POST,
      body: JSON.stringify(credentials),
    });

    return response;
  }
}

const apiUserService = new ApiUserService();
export { apiUserService };

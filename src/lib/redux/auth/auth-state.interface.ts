export interface IAuthState {
  loading: boolean;
  userInfo: object;
  userToken: string | null;
  error: Error | string | null;
  success: boolean;
}

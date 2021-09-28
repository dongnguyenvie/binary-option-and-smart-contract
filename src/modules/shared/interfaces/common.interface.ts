export interface CurrentUser {
  email: string;

  wallet?: string;

  sub: string;

  id: string;

  scp: string[];
}

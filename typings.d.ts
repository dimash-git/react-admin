interface BackendTokens {
  access_token: string;
  refresh_token: string;
}

interface BackendTokensWE extends BackendTokens {
  expiresIn: number;
}
interface Event {
  event_id: string;
  img_url: string;
  is_online: boolean;
  name: string;
  timestamp: number;
}

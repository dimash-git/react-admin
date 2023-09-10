interface BackendTokens {
  access_token: string;
  refresh_token: string;
}

interface Event {
  event_id: string;
  img_url: string;
  is_online: boolean;
  name: string;
  timestamp: number;
}

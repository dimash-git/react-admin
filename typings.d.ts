interface BackendTokens {
  access_token: string;
  refresh_token: string;
}

interface BackendTokensWE extends BackendTokens {
  expiresIn: number;
}

type EventType = "online" | "offline";
interface _Event {
  event_id: string;
  is_online: boolean;
  name: string;
  desc: string;
  timestamp: number;
  img_url?: string;
}

interface EventForm {
  name: string;
  desc: string;
  type: EventType;
  date: Date;
  image?: File; // if image was chosen at form
  img_url?: string; // if image was fetched from backend
}

interface Promo {
  promo_id: string;
  name: string;
  img_url?: string;
  file_url?: string;
}

interface PromoForm {
  name: string;
  image?: File;
  file?: File;
}

interface NewsForm {
  name: string;
  tag: string;
  excerpt: string;
  desc: string;
  image?: File;
  url: string;
}

interface News {
  news_id: string;
  name: string;
  img: string;
  timestamp: number;
  desc: string;
  tags?: string[];
  url?: string;
}

interface Tags {
  tag_id: string;
  name: string;
}

interface SupportCat {
  category_id: string;
  name: string;
  img?: string;
}

interface Marketing {
  marketing_id: string;
  img_url: string;
  desc: string;
  name: string;
}

interface Product {
  product_id: string;
  img: string;
  name: string;
  price: number;
  discount: any;
  is_pack: boolean;
  is_robot: boolean;
  description: string;
  advantages: string[];
}

interface ProductCat {
  category_id: string;
  name: string;
}

interface Country {
  country_id: string;
  name: string;
}

interface Fiat {
  fiat_id: string;
  name: string;
}
interface Bank {
  bank_id: string;
  name: string;
}

interface Symbol {
  symbol_id: string;
  name: string;
  market?: string;
  is_euro: boolean;
  is_dollar: boolean;
}

interface Passport {
  passport_main: string;
  passport_living: string;
  user_id: string;
}

interface Mlm {
  qualification_id: string;
  name: string;
}

interface MlmDetails {
  qualification_id: string;
  name: string;
  team_sales: number;
  personal_sales: number;
  percent: number;
  matching: number;
  is_automatic_upgrade: boolean;
  robot_count: number;
}

interface WithdrawalInvoice {
  invoice_id: string;
  wallet: string;
  sum: number;
  user_id: string;
  network: string;
}

interface Question {
  category_id: string;
  question: string;
  answer: string;
}

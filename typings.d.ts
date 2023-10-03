interface BackendTokens {
  access_token: string;
  refresh_token: string;
}

interface BackendTokensWE extends BackendTokens {
  expiresIn: number;
}

type EvtType = "online" | "offline";
interface Evt {
  event_id: string;
  is_online: boolean;
  name: string;
  desc: string;
  timestamp: number;
  img_url?: string;
  media_blocks: {
    text?: string;
    media?: {
      type: string;
      url: string;
    };
  }[];
}

interface Promo {
  promo_id: string;
  name: string;
  img_url?: string;
  file_url?: string;
}

interface News {
  news_id: string;
  name: string;
  desc: string;
  img: string;
  tags?: string[];
  timestamp: number;
  media_blocks: {
    text?: string;
    media?: {
      type: string;
      url: string;
    };
  }[];
}

interface NewsTag {
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
  media_blocks: {
    text?: string;
    head_line?: string;
    media?: {
      type: string;
      url: string;
    };
  }[];
}

interface Product {
  product_id: string;
  category_id: string;
  img: string;
  name: string;
  price: number;
  discount: any;
  is_pack: boolean;
  is_robot: boolean;
  description: string;
  advantages: string[];
  pack_product_json?: {
    product_id: string;
    count: number;
  }[];
}

interface ProductCat {
  category_id: string;
  name: string;
}

interface Question {
  question_id: string;
  question: string;
  answer: string;
  article_id?: string;
}

interface QuestionCat {
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

interface Appeal {
  appeal_id: string;
  user_id: string;
  user_login: string;
  is_fixed: false;
  create_timestamp: number;
}

export interface Root {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id?: string;
  platforms: Platforms;
  detail_platforms: DetailPlatforms;
  block_time_in_minutes: number;
  hashing_algorithm?: string;
  categories: string[];
  preview_listing: boolean;
  public_notice?: string;
  additional_notices: unknown[];
  description: Description;
  links: Links;
  image: CoinDetailImage;
  country_origin: string;
  genesis_date: string | null;
  contract_address?: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_cap_rank_with_rehypothecated: number;
  market_data: MarketData;
  status_updates: StatusUpdate[];
  last_updated: string;
}

type Platforms = Record<string, string | null>;
type DetailPlatforms = Record<
  string,
  {
    decimal_place: number;
    contract_address: string;
    geckoterminal_url?: string;
  }
>;

// This in particular always returns "en", but we should validate multiple translations
export type Description = Record<string, string>;

export interface Links {
  homepage?: string[];
  whitepaper?: string;
  blockchain_site?: string[];
  official_forum_url?: string[];
  chat_url?: string[];
  announcement_url?: string[];
  snapshot_url?: string | null;
  twitter_screen_name?: string;
  facebook_username?: string;
  bitcointalk_thread_identifier?: number | null;
  telegram_channel_identifier?: string;
  subreddit_url?: string | null;
  repos_url: ReposUrl;
}

export interface ReposUrl {
  github: string[];
  bitbucket: string[];
}

export interface CoinDetailImage {
  thumb: string;
  small: string;
  large: string;
}

export interface MarketData {
  current_price: CurrencyValues;
  total_value_locked: TotalValueLocked | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: Roi | null;
  ath: CurrencyValues;
  ath_change_percentage: CurrencyValues;
  ath_date: CurrencyDates;
  atl: CurrencyValues;
  atl_change_percentage: CurrencyValues;
  atl_date: CurrencyDates;
  market_cap: CurrencyValues;
  market_cap_rank: number;
  outstanding_token_value_usd: number | null;
  market_cap_rank_with_rehypothecated: number;
  fully_diluted_valuation: CurrencyValues;
  market_cap_fdv_ratio: number;
  total_volume: CurrencyValues;
  high_24h: CurrencyValues;
  low_24h: CurrencyValues;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: CurrencyValues;
  price_change_percentage_1h_in_currency: CurrencyValues;
  price_change_percentage_24h_in_currency: CurrencyValues;
  price_change_percentage_7d_in_currency: CurrencyValues;
  price_change_percentage_14d_in_currency: CurrencyValues;
  price_change_percentage_30d_in_currency: CurrencyValues;
  price_change_percentage_60d_in_currency: CurrencyValues;
  price_change_percentage_200d_in_currency: CurrencyValues;
  price_change_percentage_1y_in_currency: CurrencyValues;
  market_cap_change_24h_in_currency: CurrencyValues;
  market_cap_change_percentage_24h_in_currency: CurrencyValues;
  total_supply: number;
  max_supply: number | null;
  max_supply_infinite: boolean;
  circulating_supply: number;
  outstanding_supply: number | null;
  last_updated: string;
}
interface TotalValueLocked {
  btc: number;
  usd: number;
}
interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface StatusUpdate {
  description: string;
  category: string;
  created_at: string;
  user: string;
  user_title: string;
  pin: boolean;
  project: Project;
}

export interface Project {
  type: string;
  id: string;
  name: string;
  symbol: string;
  image: ProjectImage;
}
export interface ProjectImage {
  thumb: string;
  small: string;
  large: string;
}

interface CurrencyValues {
  aed: number;
  ars: number;
  aud: number;
  bch: number;
  bdt: number;
  bhd: number;
  bmd: number;
  bnb: number;
  brl: number;
  btc: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  dot: number;
  eos: number;
  eth: number;
  eur: number;
  gbp: number;
  gel: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  ltc: number;
  mmk: number;
  mxn: number;
  myr: number;
  ngn: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  sol: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  usd: number;
  vef: number;
  vnd: number;
  xag: number;
  xau: number;
  xdr: number;
  xlm: number;
  xrp: number;
  yfi: number;
  zar: number;
  bits: number;
  link: number;
  sats: number;
}
interface CurrencyDates {
  aed: string;
  ars: string;
  aud: string;
  bch: string;
  bdt: string;
  bhd: string;
  bmd: string;
  bnb: string;
  brl: string;
  btc: string;
  cad: string;
  chf: string;
  clp: string;
  cny: string;
  czk: string;
  dkk: string;
  dot: string;
  eos: string;
  eth: string;
  eur: string;
  gbp: string;
  gel: string;
  hkd: string;
  huf: string;
  idr: string;
  ils: string;
  inr: string;
  jpy: string;
  krw: string;
  kwd: string;
  lkr: string;
  ltc: string;
  mmk: string;
  mxn: string;
  myr: string;
  ngn: string;
  nok: string;
  nzd: string;
  php: string;
  pkr: string;
  pln: string;
  rub: string;
  sar: string;
  sek: string;
  sgd: string;
  sol: string;
  thb: string;
  try: string;
  twd: string;
  uah: string;
  usd: string;
  vef: string;
  vnd: string;
  xag: string;
  xau: string;
  xdr: string;
  xlm: string;
  xrp: string;
  yfi: string;
  zar: string;
  bits: string;
  link: string;
  sats: string;
}

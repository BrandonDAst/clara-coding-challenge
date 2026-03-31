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
  current_price: Record<string, number>;
  total_value_locked: TotalValueLocked | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: Roi | null;
  ath: Record<string, number>;
  ath_change_percentage: Record<string, number>;
  ath_date: Record<string, string>;
  atl: Record<string, number>;
  atl_change_percentage: Record<string, number>;
  atl_date: Record<string, string>;
  market_cap: Record<string, number>;
  market_cap_rank: number;
  outstanding_token_value_usd: number | null;
  market_cap_rank_with_rehypothecated: number;
  fully_diluted_valuation: Record<string, number>;
  market_cap_fdv_ratio: number;
  total_volume: Record<string, number>;
  high_24h: Record<string, number>;
  low_24h: Record<string, number>;
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
  price_change_24h_in_currency: Record<string, number>;
  price_change_percentage_1h_in_currency: Record<string, number>;
  price_change_percentage_24h_in_currency: Record<string, number>;
  price_change_percentage_7d_in_currency: Record<string, number>;
  price_change_percentage_14d_in_currency: Record<string, number>;
  price_change_percentage_30d_in_currency: Record<string, number>;
  price_change_percentage_60d_in_currency: Record<string, number>;
  price_change_percentage_200d_in_currency: Record<string, number>;
  price_change_percentage_1y_in_currency: Record<string, number>;
  market_cap_change_24h_in_currency: Record<string, number>;
  market_cap_change_percentage_24h_in_currency: Record<string, number>;
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

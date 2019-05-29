import APIHeader from './apiHeader';

export interface Result {
  success: boolean,
  api?: APIHeader;
}


export interface SportJSONResult {
  success: boolean;
  data:    Sport[];
}

export interface Sport {
  key:     string;
  active:  boolean;
  group:   string;
  details: string;
  title:   string;
}

export interface SportResult extends Result {
  data:    Sport[];
}

export interface OddJSONResult {
  success: boolean;
  data:    Odd[];
}

export interface Odd {
  sport_key:     string;
  sport_nice:    string;
  teams:         string[];
  commence_time: number;
  home_team:     string;
  sites:         Site[];
  sites_count:   number;
}

export interface Site {
  site_key:    string;
  site_nice:   string;
  last_update: number;
  odds:        Odds;
}

export interface Odds {
  h2h: number[];
}

export interface OddResult extends Result {
  data:    Odd[];
}
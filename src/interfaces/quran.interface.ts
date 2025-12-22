// this file for response from show all surah's name
export interface Surah {
  id: number;
  name: string;
  start_page: number;
  end_page: number;
  makkia: number;
  type: number;
}

export interface SuwarResponse {
  suwar: Surah[];
}

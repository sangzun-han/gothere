export interface UserProfile {
  nickname: string;
  profile_url: string;
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile | null;
  message?: string;
}

export interface UserStats {
  postCount: number;
  favoritesCount: number;
}

export interface UserStatsResponse {
  success: boolean;
  data: UserStats | null;
  message?: string;
}

export interface UserProfile {
  nickname: string;
  profile_url: string;
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile | null;
  error?: string;
}

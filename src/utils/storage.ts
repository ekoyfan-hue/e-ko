export interface UserProfile {
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female';
  birthCity: string;
  currentCity: string;
}

const STORAGE_KEY = 'flying_star_user_profile';

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function getUserProfile(): UserProfile | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as UserProfile;
  } catch {
    return null;
  }
}

export function clearUserProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}

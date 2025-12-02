import { getCityLongitude } from './cityCoordinates';

export function calculateTrueSolarTime(
  birthDate: Date,
  birthTime: string,
  cityName: string
): Date {
  const longitude = getCityLongitude(cityName);

  const [hours, minutes] = birthTime.split(':').map(Number);

  const year = birthDate.getFullYear();
  const month = birthDate.getMonth();
  const day = birthDate.getDate();

  const trueSolarDate = new Date(year, month, day, hours, minutes, 0, 0);

  const standardLongitude = 120.0;
  const longitudeDifference = longitude - standardLongitude;
  const timeOffset = (longitudeDifference / 15) * 60;

  trueSolarDate.setMinutes(trueSolarDate.getMinutes() + timeOffset);

  return trueSolarDate;
}

export function formatTrueSolarTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

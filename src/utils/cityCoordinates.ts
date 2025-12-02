export interface CityCoordinate {
  name: string;
  longitude: number;
  latitude: number;
}

export const CITY_COORDINATES: Record<string, CityCoordinate> = {
  '北京': { name: '北京', longitude: 116.4074, latitude: 39.9042 },
  '上海': { name: '上海', longitude: 121.4737, latitude: 31.2304 },
  '天津': { name: '天津', longitude: 117.2008, latitude: 39.0842 },
  '重庆': { name: '重庆', longitude: 106.5516, latitude: 29.5630 },
  '哈尔滨': { name: '哈尔滨', longitude: 126.5340, latitude: 45.8038 },
  '长春': { name: '长春', longitude: 125.3235, latitude: 43.8171 },
  '沈阳': { name: '沈阳', longitude: 123.4328, latitude: 41.8057 },
  '呼和浩特': { name: '呼和浩特', longitude: 111.7519, latitude: 40.8414 },
  '石家庄': { name: '石家庄', longitude: 114.5149, latitude: 38.0428 },
  '太原': { name: '太原', longitude: 112.5489, latitude: 37.8706 },
  '济南': { name: '济南', longitude: 117.1205, latitude: 36.6519 },
  '郑州': { name: '郑州', longitude: 113.6254, latitude: 34.7466 },
  '西安': { name: '西安', longitude: 108.9398, latitude: 34.3416 },
  '兰州': { name: '兰州', longitude: 103.8343, latitude: 36.0611 },
  '银川': { name: '银川', longitude: 106.2586, latitude: 38.4872 },
  '乌鲁木齐': { name: '乌鲁木齐', longitude: 87.6168, latitude: 43.8256 },
  '南京': { name: '南京', longitude: 118.7969, latitude: 32.0603 },
  '合肥': { name: '合肥', longitude: 117.2272, latitude: 31.8206 },
  '杭州': { name: '杭州', longitude: 120.1551, latitude: 30.2741 },
  '南昌': { name: '南昌', longitude: 115.8581, latitude: 28.6832 },
  '福州': { name: '福州', longitude: 119.2965, latitude: 26.0745 },
  '武汉': { name: '武汉', longitude: 114.3055, latitude: 30.5931 },
  '长沙': { name: '长沙', longitude: 112.9388, latitude: 28.2282 },
  '广州': { name: '广州', longitude: 113.2644, latitude: 23.1291 },
  '南宁': { name: '南宁', longitude: 108.3661, latitude: 22.8172 },
  '海口': { name: '海口', longitude: 110.3312, latitude: 20.0311 },
  '成都': { name: '成都', longitude: 104.0668, latitude: 30.5728 },
  '贵阳': { name: '贵阳', longitude: 106.7135, latitude: 26.5783 },
  '昆明': { name: '昆明', longitude: 102.8329, latitude: 24.8801 },
  '拉萨': { name: '拉萨', longitude: 91.1320, latitude: 29.6470 },
  '深圳': { name: '深圳', longitude: 114.0579, latitude: 22.5431 },
  '青岛': { name: '青岛', longitude: 120.3826, latitude: 36.0671 },
  '大连': { name: '大连', longitude: 121.6147, latitude: 38.9140 },
  '厦门': { name: '厦门', longitude: 118.0894, latitude: 24.4798 },
  '三亚': { name: '三亚', longitude: 109.5122, latitude: 18.2528 },
  '苏州': { name: '苏州', longitude: 120.5954, latitude: 31.2989 },
  '无锡': { name: '无锡', longitude: 120.3019, latitude: 31.5747 },
  '宁波': { name: '宁波', longitude: 121.5440, latitude: 29.8683 },
  '温州': { name: '温州', longitude: 120.6994, latitude: 28.0006 },
  '佛山': { name: '佛山', longitude: 113.1220, latitude: 23.0218 },
  '东莞': { name: '东莞', longitude: 113.7518, latitude: 23.0205 },
  '珠海': { name: '珠海', longitude: 113.5765, latitude: 22.2707 },
  '中山': { name: '中山', longitude: 113.3927, latitude: 22.5171 },
  '惠州': { name: '惠州', longitude: 114.4152, latitude: 23.1115 },
  '江门': { name: '江门', longitude: 113.0816, latitude: 22.5789 },
  '烟台': { name: '烟台', longitude: 121.4478, latitude: 37.4638 },
  '潍坊': { name: '潍坊', longitude: 119.1619, latitude: 36.7067 },
  '临沂': { name: '临沂', longitude: 118.3564, latitude: 35.1045 },
  '常州': { name: '常州', longitude: 119.9740, latitude: 31.8109 },
  '南通': { name: '南通', longitude: 120.8945, latitude: 31.9809 },
  '徐州': { name: '徐州', longitude: 117.2838, latitude: 34.2044 },
  '扬州': { name: '扬州', longitude: 119.4128, latitude: 32.3975 },
  '泉州': { name: '泉州', longitude: 118.6754, latitude: 24.8741 },
  '保定': { name: '保定', longitude: 115.4648, latitude: 38.8737 },
  '唐山': { name: '唐山', longitude: 118.1802, latitude: 39.6304 },
  '廊坊': { name: '廊坊', longitude: 116.6838, latitude: 39.5376 }
};

export function getCityCoordinate(cityName: string): CityCoordinate | null {
  const normalizedName = cityName.trim();

  if (CITY_COORDINATES[normalizedName]) {
    return CITY_COORDINATES[normalizedName];
  }

  for (const key in CITY_COORDINATES) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return CITY_COORDINATES[key];
    }
  }

  return null;
}

export function getCityLongitude(cityName: string): number {
  const coordinate = getCityCoordinate(cityName);
  return coordinate ? coordinate.longitude : 120.0;
}

import { renderToString } from 'react-dom/server';
import App from './App';
import { GOOGLE_MAPS_URL, INSTAGRAM_URL } from './business';
import { SCHEDULE } from './hooks/useStoreHours';
import { categories } from './components/Menu';

export const pages = [
  { path: '/', title: 'Halal Lebanese Restaurant in Canton, MI | Lavash', description: 'Visit Lavash Lebanese Cuisine in Canton, MI for 100% Certified Halal shawarma, falafel, bowls, and Lebanese food. Open until 9 PM every day.' },
  { path: '/menu', title: 'Halal Lebanese Menu | Shawarma & Bowls | Lavash Canton', description: 'Explore Lavash’s Lebanese menu: chicken shawarma, shish tawook bowls, falafel, hommous, and more. See current prices and order online through Toast.' },
  { path: '/catering', title: 'Halal Lebanese Catering in Canton, MI | Lavash', description: 'Plan your next office lunch, family gathering, or event with Lavash Lebanese catering in Canton, Michigan. Call (734) 495-1115 for large orders.' },
  { path: '/location', title: 'Location & Hours | Lavash Lebanese Cuisine | Canton, MI', description: 'Find Lavash at 46042 Michigan Ave, Canton, MI 48188. See weekly hours, get directions, or call (734) 495-1115. Open until 9 PM every day.' },
  { path: '/404', title: 'Page Not Found | Lavash Lebanese Cuisine', description: 'Return to Lavash Lebanese Cuisine to browse our menu, catering, location, and hours.' },
];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const time = (hour: number) => `${Math.floor(hour).toString().padStart(2, '0')}:${hour % 1 ? '30' : '00'}`;
export const restaurantData = {
  '@type': 'Restaurant', '@id': 'https://lavashmi.com/#restaurant', name: 'Lavash Lebanese Cuisine',
  url: 'https://lavashmi.com/', telephone: '+1-734-495-1115',
  description: '100% Certified Halal Lebanese restaurant in Canton, Michigan serving shawarma, bowls, falafel, and catering.',
  image: ['https://lavashmi.com/new_lavash_tray.png', 'https://lavashmi.com/chicken-shawarma-bowl.png'],
  address: { '@type': 'PostalAddress', streetAddress: '46042 Michigan Ave', addressLocality: 'Canton', addressRegion: 'MI', postalCode: '48188', addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: 42.2715048, longitude: -83.4910604 },
  servesCuisine: ['Lebanese', 'Mediterranean'], hasMenu: 'https://lavashmi.com/menu', hasMap: GOOGLE_MAPS_URL,
  sameAs: [INSTAGRAM_URL, GOOGLE_MAPS_URL],
  openingHoursSpecification: Object.entries(SCHEDULE).filter(([, hours]) => hours !== null).map(([day, hours]) => ({
    '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${days[Number(day)]}`,
    opens: time(hours!.open), closes: time(hours!.close),
  })),
};
export const menuData = {
  '@type': 'Menu', '@id': 'https://lavashmi.com/menu#menu', name: 'Lavash Lebanese Cuisine Menu',
  url: 'https://lavashmi.com/menu',
  hasMenuSection: categories.map(category => ({
    '@type': 'MenuSection', name: category.label, url: `https://lavashmi.com/menu#${category.id}`,
    hasMenuItem: category.items.map(item => ({
      '@type': 'MenuItem', name: item.name, description: item.desc,
      ...(item.img ? { image: `https://lavashmi.com${item.img}` } : {}),
    })),
  })),
};
export const render = (path: string) => renderToString(<App path={path} />);

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const HERO_IMG =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&q=80";

const DESTINATIONS = [
  {
    city: "Kyoto",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    desc: "Temples, bamboo groves and quiet tea houses.",
    cost: "Moderate",
  },
  {
    city: "Santorini",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    desc: "Whitewashed cliffs over a sapphire caldera.",
    cost: "High",
  },
  {
    city: "Ubud",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    desc: "Rice terraces, jungle air and slow mornings.",
    cost: "Budget",
  },
  {
    city: "Reykjavik",
    country: "Iceland",
    img: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
    desc: "Glaciers, geysers and endless summer light.",
    cost: "High",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPLORE — RICH DESTINATION DATA                                    */
/* ------------------------------------------------------------------ */

// Budget tiers roughly map to a starting-cost bracket (INR)
const EXPLORE_DESTINATIONS = [
  { id: "kyoto", city: "Kyoto", country: "Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80",
    description: "Temples, bamboo groves and quiet tea houses.", startingBudget: 65000, dailyBudget: 5500, recommendedDays: [5, 7],
    bestTime: "Mar – May & Oct – Nov", rating: 4.8, tripTypes: ["Culture", "Food", "Nature"], budgetTier: "Moderate",
    activities: [
      { name: "Fushimi Inari Shrine", category: "Culture", cost: 500, duration: "2h" },
      { name: "Kiyomizu-dera", category: "Culture", cost: 400, duration: "1.5h" },
      { name: "Gion District Walk", category: "Culture", cost: 800, duration: "2h" },
      { name: "Arashiyama Bamboo Grove", category: "Nature", cost: 300, duration: "1.5h" },
      { name: "Tenryu-ji Temple", category: "Culture", cost: 500, duration: "1h" },
      { name: "Nishiki Market", category: "Food", cost: 1200, duration: "2h" },
      { name: "Kinkaku-ji (Golden Pavilion)", category: "Culture", cost: 400, duration: "1.5h" },
      { name: "Nijo Castle", category: "Culture", cost: 600, duration: "1.5h" },
      { name: "Philosopher's Path", category: "Nature", cost: 0, duration: "1.5h" },
      { name: "Uji Tea Experience", category: "Food", cost: 1500, duration: "2h" },
    ] },
  { id: "tokyo", city: "Tokyo", country: "Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80",
    description: "Neon streets, sushi counters and pockets of calm.", startingBudget: 78000, dailyBudget: 7000, recommendedDays: [5, 8],
    bestTime: "Mar – May & Sep – Nov", rating: 4.9, tripTypes: ["Culture", "Food", "Adventure"], budgetTier: "High",
    activities: [
      { name: "Senso-ji Temple", category: "Culture", cost: 300, duration: "1.5h" },
      { name: "Shibuya Crossing", category: "Culture", cost: 0, duration: "1h" },
      { name: "Tsukiji Outer Market", category: "Food", cost: 1800, duration: "2h" },
      { name: "TeamLab Planets", category: "Adventure", cost: 2800, duration: "2h" },
      { name: "Akihabara Electric Town", category: "Culture", cost: 500, duration: "2h" },
      { name: "Meiji Shrine", category: "Culture", cost: 0, duration: "1.5h" },
      { name: "Shinjuku Gyoen Garden", category: "Nature", cost: 500, duration: "1.5h" },
      { name: "Odaiba Waterfront", category: "Adventure", cost: 800, duration: "2h" },
      { name: "Ramen Street Tasting", category: "Food", cost: 1500, duration: "1.5h" },
      { name: "Tokyo Skytree", category: "Adventure", cost: 2100, duration: "1.5h" },
    ] },
  { id: "bali", city: "Ubud", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80",
    description: "Rice terraces, jungle air and slow mornings.", startingBudget: 38000, dailyBudget: 3200, recommendedDays: [5, 7],
    bestTime: "Apr – Oct", rating: 4.7, tripTypes: ["Relaxation", "Nature", "Couple"], budgetTier: "Budget",
    activities: [
      { name: "Tegallalang Rice Terraces", category: "Nature", cost: 400, duration: "1.5h" },
      { name: "Sacred Monkey Forest", category: "Nature", cost: 350, duration: "1h" },
      { name: "Ubud Traditional Market", category: "Food", cost: 500, duration: "1.5h" },
      { name: "Tirta Empul Water Temple", category: "Culture", cost: 300, duration: "1.5h" },
      { name: "Campuhan Ridge Walk", category: "Nature", cost: 0, duration: "1.5h" },
      { name: "Balinese Spa & Massage", category: "Relaxation", cost: 1500, duration: "2h" },
      { name: "Mount Batur Sunrise Trek", category: "Adventure", cost: 2500, duration: "5h" },
      { name: "Cooking Class", category: "Food", cost: 1800, duration: "3h" },
      { name: "Uluwatu Temple & Kecak Dance", category: "Culture", cost: 700, duration: "3h" },
      { name: "Beach Club Day", category: "Relaxation", cost: 2000, duration: "3h" },
    ] },
  { id: "paris", city: "Paris", country: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80",
    description: "Cafés, riverside walks and world-class art.", startingBudget: 95000, dailyBudget: 8500, recommendedDays: [5, 8],
    bestTime: "Apr – Jun & Sep – Oct", rating: 4.7, tripTypes: ["Culture", "Couple", "Food"], budgetTier: "Luxury",
    activities: [
      { name: "Eiffel Tower Summit", category: "Culture", cost: 2200, duration: "2h" },
      { name: "Louvre Museum", category: "Culture", cost: 1500, duration: "3h" },
      { name: "Seine River Cruise", category: "Relaxation", cost: 1400, duration: "1.5h" },
      { name: "Montmartre & Sacré-Cœur", category: "Culture", cost: 0, duration: "2h" },
      { name: "Notre-Dame & Île de la Cité", category: "Culture", cost: 0, duration: "1.5h" },
      { name: "Le Marais Café Crawl", category: "Food", cost: 1800, duration: "2h" },
      { name: "Palace of Versailles", category: "Culture", cost: 2500, duration: "4h" },
      { name: "Musée d'Orsay", category: "Culture", cost: 1300, duration: "2h" },
      { name: "Wine & Cheese Tasting", category: "Food", cost: 2200, duration: "2h" },
      { name: "Latin Quarter Evening Walk", category: "Culture", cost: 0, duration: "1.5h" },
    ] },
  { id: "london", city: "London", country: "UK", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80",
    description: "Royal history, museums and cosy pubs.", startingBudget: 92000, dailyBudget: 8200, recommendedDays: [5, 7],
    bestTime: "May – Sep", rating: 4.6, tripTypes: ["Culture", "Family", "Food"], budgetTier: "Luxury",
    activities: [
      { name: "Tower of London", category: "Culture", cost: 2800, duration: "2.5h" },
      { name: "British Museum", category: "Culture", cost: 0, duration: "2.5h" },
      { name: "London Eye", category: "Adventure", cost: 2400, duration: "1h" },
      { name: "Buckingham Palace Changing of the Guard", category: "Culture", cost: 0, duration: "1h" },
      { name: "Camden Market", category: "Food", cost: 1200, duration: "2h" },
      { name: "West End Show", category: "Culture", cost: 4500, duration: "2.5h" },
      { name: "Borough Market Food Crawl", category: "Food", cost: 1500, duration: "2h" },
      { name: "Greenwich & Royal Observatory", category: "Culture", cost: 800, duration: "3h" },
      { name: "Hyde Park Stroll", category: "Nature", cost: 0, duration: "1.5h" },
      { name: "Traditional Afternoon Tea", category: "Food", cost: 2500, duration: "1.5h" },
    ] },
  { id: "dubai", city: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",
    description: "Skyscrapers, desert dunes and souks.", startingBudget: 70000, dailyBudget: 7500, recommendedDays: [4, 6],
    bestTime: "Nov – Mar", rating: 4.6, tripTypes: ["Adventure", "Family", "Couple"], budgetTier: "High",
    activities: [
      { name: "Burj Khalifa Observation Deck", category: "Adventure", cost: 3200, duration: "1.5h" },
      { name: "Desert Safari & BBQ", category: "Adventure", cost: 4500, duration: "5h" },
      { name: "Dubai Mall & Fountain Show", category: "Culture", cost: 0, duration: "2.5h" },
      { name: "Palm Jumeirah & Atlantis", category: "Relaxation", cost: 3500, duration: "3h" },
      { name: "Old Dubai & Gold Souk", category: "Culture", cost: 600, duration: "2h" },
      { name: "Dhow Cruise Dinner", category: "Food", cost: 3800, duration: "2.5h" },
      { name: "Ski Dubai", category: "Adventure", cost: 4200, duration: "2h" },
      { name: "Museum of the Future", category: "Culture", cost: 3000, duration: "2h" },
      { name: "Jumeirah Beach Day", category: "Relaxation", cost: 500, duration: "3h" },
      { name: "Al Fahidi Historic District", category: "Culture", cost: 400, duration: "1.5h" },
    ] },
  { id: "bangkok", city: "Bangkok", country: "Thailand", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=900&q=80",
    description: "Golden temples, street food and river life.", startingBudget: 32000, dailyBudget: 2800, recommendedDays: [4, 7],
    bestTime: "Nov – Feb", rating: 4.5, tripTypes: ["Food", "Culture", "Adventure"], budgetTier: "Budget",
    activities: [
      { name: "Grand Palace & Wat Phra Kaew", category: "Culture", cost: 800, duration: "2.5h" },
      { name: "Wat Arun (Temple of Dawn)", category: "Culture", cost: 300, duration: "1.5h" },
      { name: "Chatuchak Weekend Market", category: "Food", cost: 1000, duration: "2.5h" },
      { name: "Chao Phraya River Cruise", category: "Relaxation", cost: 900, duration: "1.5h" },
      { name: "Street Food Tour, Chinatown", category: "Food", cost: 1200, duration: "2h" },
      { name: "Floating Market Day Trip", category: "Adventure", cost: 1800, duration: "4h" },
      { name: "Thai Massage & Spa", category: "Relaxation", cost: 900, duration: "1.5h" },
      { name: "Muay Thai Show", category: "Culture", cost: 1500, duration: "2h" },
      { name: "Khao San Road Evening", category: "Culture", cost: 700, duration: "2h" },
      { name: "Ayutthaya Ruins Day Trip", category: "Culture", cost: 2200, duration: "5h" },
    ] },
  { id: "singapore", city: "Singapore", country: "Singapore", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=80",
    description: "Futuristic gardens, hawker food and skyline views.", startingBudget: 68000, dailyBudget: 6500, recommendedDays: [4, 6],
    bestTime: "Feb – Apr", rating: 4.6, tripTypes: ["Family", "Food", "Culture"], budgetTier: "High",
    activities: [
      { name: "Gardens by the Bay", category: "Nature", cost: 1600, duration: "2.5h" },
      { name: "Marina Bay Sands SkyPark", category: "Adventure", cost: 2200, duration: "1.5h" },
      { name: "Hawker Centre Food Crawl", category: "Food", cost: 1200, duration: "2h" },
      { name: "Sentosa Island", category: "Family", cost: 2800, duration: "4h" },
      { name: "Singapore Zoo", category: "Family", cost: 2400, duration: "3h" },
      { name: "Chinatown & Buddha Tooth Relic Temple", category: "Culture", cost: 0, duration: "2h" },
      { name: "Universal Studios Singapore", category: "Family", cost: 5200, duration: "6h" },
      { name: "Clarke Quay Riverside Evening", category: "Culture", cost: 1500, duration: "2h" },
      { name: "Little India Walk", category: "Culture", cost: 500, duration: "1.5h" },
      { name: "Night Safari", category: "Adventure", cost: 2600, duration: "3h" },
    ] },
  { id: "santorini", city: "Santorini", country: "Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80",
    description: "Whitewashed cliffs over a sapphire caldera.", startingBudget: 88000, dailyBudget: 8200, recommendedDays: [4, 6],
    bestTime: "May – Sep", rating: 4.8, tripTypes: ["Couple", "Relaxation", "Culture"], budgetTier: "Luxury",
    activities: [
      { name: "Oia Sunset Walk", category: "Relaxation", cost: 0, duration: "2h" },
      { name: "Fira to Oia Caldera Hike", category: "Adventure", cost: 0, duration: "3h" },
      { name: "Wine Tasting Tour", category: "Food", cost: 3200, duration: "3h" },
      { name: "Catamaran Cruise & Volcano", category: "Relaxation", cost: 6500, duration: "5h" },
      { name: "Red Beach & Akrotiri Ruins", category: "Culture", cost: 900, duration: "3h" },
      { name: "Pyrgos Village Walk", category: "Culture", cost: 0, duration: "1.5h" },
      { name: "Traditional Greek Dinner", category: "Food", cost: 2500, duration: "2h" },
      { name: "Perissa Black Sand Beach", category: "Relaxation", cost: 500, duration: "2.5h" },
      { name: "Ammoudi Bay Seafood Lunch", category: "Food", cost: 2200, duration: "2h" },
      { name: "Museum of Prehistoric Thera", category: "Culture", cost: 600, duration: "1h" },
    ] },
  { id: "reykjavik", city: "Reykjavik", country: "Iceland", img: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=900&q=80",
    description: "Glaciers, geysers and endless summer light.", startingBudget: 105000, dailyBudget: 9500, recommendedDays: [5, 8],
    bestTime: "Jun – Aug", rating: 4.7, tripTypes: ["Nature", "Adventure", "Couple"], budgetTier: "Luxury",
    activities: [
      { name: "Golden Circle Tour", category: "Nature", cost: 4200, duration: "7h" },
      { name: "Blue Lagoon Geothermal Spa", category: "Relaxation", cost: 6500, duration: "3h" },
      { name: "South Coast Waterfalls", category: "Nature", cost: 3800, duration: "6h" },
      { name: "Northern Lights Hunt", category: "Adventure", cost: 5200, duration: "4h" },
      { name: "Reykjavik Harbour Walk", category: "Culture", cost: 0, duration: "1.5h" },
      { name: "Glacier Hike, Sólheimajökull", category: "Adventure", cost: 7500, duration: "5h" },
      { name: "Whale Watching Cruise", category: "Nature", cost: 6800, duration: "3h" },
      { name: "Hallgrímskirkja Church Tower", category: "Culture", cost: 900, duration: "1h" },
      { name: "Snæfellsnes Peninsula Day Trip", category: "Nature", cost: 5500, duration: "8h" },
      { name: "Local Food Market Tasting", category: "Food", cost: 2200, duration: "2h" },
    ] },
  { id: "newyork", city: "New York", country: "USA", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=80",
    description: "Skyscrapers, Broadway lights and endless energy.", startingBudget: 110000, dailyBudget: 9800, recommendedDays: [4, 7],
    bestTime: "Apr – Jun & Sep – Nov", rating: 4.6, tripTypes: ["Culture", "Adventure", "Food"], budgetTier: "Luxury",
    activities: [
      { name: "Statue of Liberty & Ellis Island", category: "Culture", cost: 1900, duration: "3h" },
      { name: "Top of the Rock Observation", category: "Adventure", cost: 2800, duration: "1.5h" },
      { name: "Central Park Stroll", category: "Nature", cost: 0, duration: "1.5h" },
      { name: "Broadway Show", category: "Culture", cost: 8500, duration: "2.5h" },
      { name: "Metropolitan Museum of Art", category: "Culture", cost: 2200, duration: "3h" },
      { name: "Times Square Evening", category: "Culture", cost: 0, duration: "1h" },
      { name: "Brooklyn Bridge Walk", category: "Adventure", cost: 0, duration: "1.5h" },
      { name: "High Line & Chelsea Market", category: "Food", cost: 1800, duration: "2.5h" },
      { name: "9/11 Memorial & Museum", category: "Culture", cost: 2400, duration: "2.5h" },
      { name: "Rooftop Dinner", category: "Food", cost: 4200, duration: "2h" },
    ] },
  { id: "switzerland", city: "Interlaken", country: "Switzerland", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=900&q=80",
    description: "Alpine peaks, lakes and postcard villages.", startingBudget: 120000, dailyBudget: 11000, recommendedDays: [5, 8],
    bestTime: "Jun – Sep", rating: 4.9, tripTypes: ["Nature", "Adventure", "Couple"], budgetTier: "Luxury",
    activities: [
      { name: "Jungfraujoch — Top of Europe", category: "Adventure", cost: 9500, duration: "6h" },
      { name: "Lake Thun Cruise", category: "Relaxation", cost: 2800, duration: "2h" },
      { name: "Harder Kulm Cable Car", category: "Adventure", cost: 3600, duration: "2h" },
      { name: "Grindelwald Village Walk", category: "Nature", cost: 0, duration: "2h" },
      { name: "Trümmelbach Falls", category: "Nature", cost: 1400, duration: "1.5h" },
      { name: "Paragliding over Interlaken", category: "Adventure", cost: 12000, duration: "1h" },
      { name: "Lauterbrunnen Valley Hike", category: "Nature", cost: 0, duration: "3h" },
      { name: "Swiss Chocolate & Cheese Tasting", category: "Food", cost: 2200, duration: "1.5h" },
      { name: "Schilthorn Piz Gloria", category: "Adventure", cost: 8200, duration: "4h" },
      { name: "Bern Old Town Day Trip", category: "Culture", cost: 2600, duration: "5h" },
    ] },
  { id: "seoul", city: "Seoul", country: "South Korea", img: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=900&q=80",
    description: "Palaces, K-culture and late-night street food.", startingBudget: 58000, dailyBudget: 5200, recommendedDays: [5, 7],
    bestTime: "Mar – May & Sep – Nov", rating: 4.7, tripTypes: ["Culture", "Food", "Adventure"], budgetTier: "Moderate",
    activities: [
      { name: "Gyeongbokgung Palace", category: "Culture", cost: 500, duration: "2h" },
      { name: "Bukchon Hanok Village", category: "Culture", cost: 0, duration: "1.5h" },
      { name: "Myeongdong Street Food", category: "Food", cost: 1200, duration: "2h" },
      { name: "N Seoul Tower", category: "Adventure", cost: 1500, duration: "1.5h" },
      { name: "Hongdae Nightlife Walk", category: "Culture", cost: 800, duration: "2h" },
      { name: "Han River Picnic & Bike", category: "Relaxation", cost: 600, duration: "2h" },
      { name: "Gwangjang Market Tasting", category: "Food", cost: 1000, duration: "1.5h" },
      { name: "DMZ Day Tour", category: "Culture", cost: 3200, duration: "6h" },
      { name: "K-pop Dance Class", category: "Adventure", cost: 2200, duration: "1.5h" },
      { name: "Jjimjilbang Spa Night", category: "Relaxation", cost: 900, duration: "2h" },
    ] },
  { id: "istanbul", city: "Istanbul", country: "Turkey", img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=80",
    description: "Where Europe meets Asia, over bazaars and bosphorus views.", startingBudget: 48000, dailyBudget: 4200, recommendedDays: [4, 7],
    bestTime: "Apr – May & Sep – Oct", rating: 4.6, tripTypes: ["Culture", "Food", "Couple"], budgetTier: "Moderate",
    activities: [
      { name: "Hagia Sophia", category: "Culture", cost: 1400, duration: "1.5h" },
      { name: "Blue Mosque", category: "Culture", cost: 0, duration: "1h" },
      { name: "Grand Bazaar", category: "Food", cost: 800, duration: "2h" },
      { name: "Bosphorus Sunset Cruise", category: "Relaxation", cost: 2200, duration: "2h" },
      { name: "Topkapi Palace", category: "Culture", cost: 1600, duration: "2.5h" },
      { name: "Turkish Bath (Hamam)", category: "Relaxation", cost: 2800, duration: "1.5h" },
      { name: "Spice Bazaar", category: "Food", cost: 500, duration: "1.5h" },
      { name: "Galata Tower & District", category: "Culture", cost: 1200, duration: "2h" },
      { name: "Turkish Street Food Crawl", category: "Food", cost: 1500, duration: "2h" },
      { name: "Princes' Islands Day Trip", category: "Nature", cost: 2000, duration: "5h" },
    ] },
  { id: "manali", city: "Manali", country: "India", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=80",
    description: "Snow peaks, pine forests and riverside cafés.", startingBudget: 18000, dailyBudget: 2200, recommendedDays: [3, 6],
    bestTime: "Oct – Feb & Mar – Jun", rating: 4.5, tripTypes: ["Adventure", "Nature", "Family"], budgetTier: "Budget",
    activities: [
      { name: "Solang Valley", category: "Adventure", cost: 1500, duration: "4h" },
      { name: "Hadimba Temple", category: "Culture", cost: 0, duration: "1h" },
      { name: "Old Manali Café Walk", category: "Food", cost: 600, duration: "2h" },
      { name: "Rohtang Pass Day Trip", category: "Adventure", cost: 2500, duration: "6h" },
      { name: "Vashisht Hot Springs", category: "Relaxation", cost: 300, duration: "1.5h" },
      { name: "River Rafting, Beas", category: "Adventure", cost: 1200, duration: "1h" },
      { name: "Manu Temple", category: "Culture", cost: 0, duration: "1h" },
      { name: "Jogini Waterfall Trek", category: "Nature", cost: 200, duration: "3h" },
      { name: "Local Himachali Thali", category: "Food", cost: 500, duration: "1h" },
      { name: "Naggar Castle", category: "Culture", cost: 400, duration: "2h" },
    ] },
];

function budgetTierFromValue(v) {
  if (v <= 30000) return "Budget";
  if (v <= 65000) return "Moderate";
  if (v <= 95000) return "High";
  return "Luxury";
}

// Build 3 predefined itinerary options (3-day / 5-day / 7-day) for a destination
function buildItineraries(dest) {
  const durations = [3, 5, 7];
  const titles = ["Essentials", "Explorer", "Complete"];
  return durations.map((days, idx) => {
    const dailyLiving = Math.round(dest.dailyBudget * 0.7);
    const itineraryDays = [];
    let cursor = idx; // stagger starting activity so each itinerary feels distinct
    for (let d = 1; d <= days; d++) {
      const slots = ["Morning", "Afternoon", "Evening"];
      const dayActivities = slots.map((time) => {
        const act = dest.activities[cursor % dest.activities.length];
        cursor++;
        return { time, name: act.name, category: act.category, cost: act.cost, duration: act.duration };
      });
      const activitiesCost = dayActivities.reduce((s, a) => s + a.cost, 0);
      const dailyCost = activitiesCost + dailyLiving;
      itineraryDays.push({
        day: d,
        title: d === 1 ? `Arrival in ${dest.city}` : d === days ? `Farewell to ${dest.city}` : `Discovering ${dest.city}`,
        activities: dayActivities,
        dailyCost,
      });
    }
    const activitiesTotal = itineraryDays.reduce((s, day) => s + day.activities.reduce((s2, a) => s2 + a.cost, 0), 0);
    const transportTotal = Math.round(dest.startingBudget * 0.3);
    const livingTotal = itineraryDays.length * dailyLiving;
    const accommodationTotal = Math.round(livingTotal * 0.55);
    const foodTotal = Math.round(livingTotal * 0.35);
    let miscTotal = Math.round(livingTotal * 0.10);
    const estimatedBudget = transportTotal + accommodationTotal + foodTotal + activitiesTotal + miscTotal;

    return {
      id: `${dest.id}-${days}d`,
      title: `${days}-Day ${dest.city} ${titles[idx]}`,
      days,
      estimatedBudget,
      description: `${days === 3 ? "A quick taste of" : days === 5 ? "A well-rounded look at" : "The complete journey through"} ${dest.city}'s best temples, food and neighborhoods.`,
      itinerary: itineraryDays,
      budgetBreakdown: {
        accommodation: accommodationTotal,
        food: foodTotal,
        transportation: transportTotal,
        activities: activitiesTotal,
        miscellaneous: miscTotal,
      },
    };
  });
}

function formatINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function buildLegacyTripExtras(dest, days, budget) {
  // Gives an older/simple trip a plausible itinerary + budget breakdown so it
  // renders correctly on the newer Trip Detail / Budget pages.
  const itinerary = buildItineraries(dest).find((i) => i.days === days) || buildItineraries(dest)[1];
  return {
    itinerary: itinerary.itinerary,
    activities: itinerary.itinerary.reduce((s, d) => s + d.activities.length, 0),
    budgetBreakdown: itinerary.budgetBreakdown,
    dailyBudget: Math.round(budget / days),
  };
}

const KYOTO_DEST = EXPLORE_DESTINATIONS.find((d) => d.id === "kyoto");
const SANTORINI_DEST = EXPLORE_DESTINATIONS.find((d) => d.id === "santorini");
const BALI_DEST = EXPLORE_DESTINATIONS.find((d) => d.id === "bali");

const INITIAL_TRIPS = [
  {
    id: "t1",
    name: "Japan in Bloom",
    city: "Kyoto",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    start: "2026-10-02",
    end: "2026-10-14",
    stops: 4,
    travelers: 2,
    budget: 265000,
    status: "upcoming",
    ...buildLegacyTripExtras(KYOTO_DEST, 7, 265000),
  },
  {
    id: "t2",
    name: "Greek Island Hop",
    city: "Santorini",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    start: "2026-06-05",
    end: "2026-06-16",
    stops: 3,
    travelers: 2,
    budget: 310000,
    status: "upcoming",
    ...buildLegacyTripExtras(SANTORINI_DEST, 7, 310000),
  },
  {
    id: "t3",
    name: "Bali Reset",
    city: "Ubud",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    start: "2025-03-10",
    end: "2025-03-20",
    stops: 2,
    travelers: 2,
    budget: 140000,
    status: "past",
    ...buildLegacyTripExtras(BALI_DEST, 5, 140000),
  },
];

/* ------------------------------------------------------------------ */
/*  GLOBAL APPLICATION STATE                                           */
/* ------------------------------------------------------------------ */

const TRIPS_STORAGE_KEY = "globetrotter_trips";

function loadTrips() {
  try {
    const saved = localStorage.getItem(TRIPS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {
    /* ignore corrupt storage */
  }
  return [...INITIAL_TRIPS];
}

function persistTrips() {
  try {
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  } catch (e) {
    /* storage unavailable — trip still works for this session */
  }
}

let currentView = "login";
let userName = "Amara";
let trips = loadTrips();
let selectedTrip = null;
let confirmDelete = null;
let toastTimer = null;
let mobileMenuOpen = false;
let isLoading = false;

// Search & Filter State for My Trips
let myTripsQuery = "";
let myTripsFilter = "all";
let myTripsSort = "newest";

// Search & Filter State for Explore
let exploreQuery = "";
let exploreBudgetFilter = "all";
let exploreTripTypeFilter = "all";
let exploreDurationFilter = "any";

// Destination detail / itinerary selection state
let selectedDestination = null;
let expandedItineraryId = null;
let planModalOpen = false;
let planDraft = null; // { destination, itinerary, name, start, travelers, budget, activities }

// Budget calculator state
let budgetCalc = {
  destination: "",
  travelers: 2,
  days: 5,
  accommodation: 20000,
  foodPerDay: 1500,
  transportation: 8000,
  activitiesPerDay: 1500,
  misc: 3000,
  limit: 0,
};

/* ------------------------------------------------------------------ */
/*  HELPER FUNCTIONS                                                  */
/* ------------------------------------------------------------------ */

const fmtRange = (start, end) => {
  const opts = { month: "short", day: "numeric" };
  const s = new Date(start).toLocaleDateString("en-US", opts);
  const e = new Date(end).toLocaleDateString("en-US", {
    ...opts,
    year: "numeric",
  });
  return `${s} – ${e}`;
};

function notify(msg, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  const isError = type === "error";
  
  toastContainer.innerHTML = `
    <div className="gt-toast" style="
      position: fixed; bottom: 24px; right: 24px; z-index: 200;
      background: var(--navy); color: #fff; padding: 13px 18px;
      border-radius: 13px; display: flex; align-items: center; gap: 10px;
      box-shadow: 0 12px 32px rgba(19,42,70,0.28); max-width: 340px; font-size: 14px; font-weight: 500;
    ">
      <i data-lucide="${isError ? 'alert-circle' : 'check-circle-2'}" style="color: ${isError ? '#F08B7F' : '#5FD68C'}; flex-shrink: 0;"></i>
      <span>${msg}</span>
    </div>
  `;
  lucide.createIcons();

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastContainer.innerHTML = "";
  }, 3200);
}

function addTrip(newTrip) {
  trips = [newTrip, ...trips];
  persistTrips();
}

function updateTrip(updated) {
  trips = trips.map((x) => (x.id === updated.id ? { ...x, ...updated } : x));
  persistTrips();
}

function deleteTrip() {
  if (!confirmDelete) return;
  trips = trips.filter((x) => x.id !== confirmDelete.id);
  persistTrips();
  notify(`"${confirmDelete.name}" was deleted.`, "success");
  confirmDelete = null;
  renderModal();
  renderPage();
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION CONTROLLER                                              */
/* ------------------------------------------------------------------ */

function go(view) {
  currentView = view;
  mobileMenuOpen = false;

  if (view === "dashboard" || view === "my-trips" || view === "explore") {
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
      renderPage();
    }, 650);
  }

  renderPage();
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
}

function hideAllPages() {
  const pages = document.querySelectorAll(".page");
  pages.forEach((p) => p.classList.remove("active"));
}

function showPage(pageId) {
  const p = document.getElementById(pageId);
  if (p) p.classList.add("active");
}

function renderPage() {
  renderNavbar();
  renderModal();
  hideAllPages();

  switch (currentView) {
    case "login":
      showPage("login-page");
      renderLogin();
      break;
    case "signup":
      showPage("signup-page");
      renderSignup();
      break;
    case "dashboard":
      showPage("dashboard-page");
      renderDashboard();
      break;
    case "create-trip":
      showPage("create-trip-page");
      renderCreateTrip();
      break;
    case "explore":
      showPage("explore-page");
      renderExplore();
      break;
    case "destination-detail":
      showPage("destination-detail-page");
      renderDestinationDetail();
      break;
    case "budget":
      showPage("budget-page");
      renderBudget();
      break;
    case "my-trips":
      showPage("my-trips-page");
      renderMyTrips();
      break;
    case "edit-trip":
      showPage("edit-trip-page");
      renderEditTrip();
      break;
    case "trip-detail":
      showPage("trip-detail-page");
      renderTripDetail();
      break;
  }

  lucide.createIcons();
}

/* ------------------------------------------------------------------ */
/*  SHARED COMPONENTS (MODAL & NAVBAR)                                 */
/* ------------------------------------------------------------------ */

function renderLogo(dark = false) {
  return `
    <div style="display: flex; align-items: center; gap: 9px; cursor: pointer;" onclick="go('${currentView === 'login' || currentView === 'signup' ? 'login' : 'dashboard'}')">
      <div style="width: 34px; height: 34px; border-radius: 10px; background: ${dark ? 'var(--accent)' : 'var(--navy)'}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i data-lucide="globe-2" style="color: ${dark ? '#132A46' : '#F5A524'};"></i>
      </div>
      <span class="gt-display" style="font-size: 19px; font-weight: 700; color: ${dark ? '#fff' : 'var(--navy)'};">
        GlobeTrotter
      </span>
    </div>
  `;
}

function renderRouteMotif(w = 260, h = 90, color = "#F5A524") {
  return `
    <svg width="${w}" height="${h}" viewBox="0 0 260 90" fill="none">
      <path d="M8 70 C 60 10, 110 90, 160 30 S 240 10, 252 20" stroke="${color}" stroke-width="2" class="gt-route-dash" opacity="0.85" />
      <circle cx="8" cy="70" r="5" fill="${color}" />
      <circle cx="160" cy="30" r="4" fill="${color}" opacity="0.85" />
      <circle cx="252" cy="20" r="5" fill="${color}" />
    </svg>
  `;
}

function renderNavbar() {
  const container = document.getElementById("navbar-container");
  if (currentView === "login" || currentView === "signup") {
    container.innerHTML = "";
    return;
  }

  const links = [
    { key: "dashboard", label: "Dashboard", icon: "home" },
    { key: "explore", label: "Explore", icon: "sparkles" },
    { key: "my-trips", label: "My Trips", icon: "compass" },
    { key: "budget", label: "Budget", icon: "wallet" },
    { key: "profile", label: "Profile", icon: "user", comingSoon: true },
  ];

  const activeKey =
    currentView === "destination-detail" ? "explore" :
    (currentView === "trip-detail" || currentView === "edit-trip" || currentView === "create-trip") ? "my-trips" :
    currentView;

  container.innerHTML = `
    <div style="position: sticky; top: 0; z-index: 100; background: rgba(251,248,243,0.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line);">
      <div style="max-width: 1180px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;">
        ${renderLogo()}

        <div class="gt-hide-mobile" style="display: flex; gap: 4px;">
          ${links.map(l => `
            <div
              class="gt-nav-link ${activeKey === l.key ? 'gt-nav-link-active' : ''}"
              style="${l.comingSoon ? 'opacity: 0.55;' : ''}"
              title="${l.comingSoon ? 'Coming soon' : ''}"
              onclick="handleNavClick('${l.key}', ${l.comingSoon || false})"
            >
              <i data-lucide="${l.icon}"></i> ${l.label}
            </div>
          `).join('')}
        </div>

        <div class="gt-hide-mobile" style="display: flex; align-items: center; gap: 14px;">
          <div
            style="width: 36px; height: 36px; border-radius: 50%; background: var(--navy); color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13.5px; cursor: pointer;"
            title="${userName}"
          >
            ${userName.slice(0, 1).toUpperCase()}
          </div>
        </div>

        <div class="gt-hide-desktop" id="menu-toggle-btn" style="cursor: pointer; padding: 6px;">
          <i data-lucide="${mobileMenuOpen ? 'x' : 'menu'}"></i>
        </div>
      </div>

      ${mobileMenuOpen ? `
        <div class="gt-hide-desktop" style="padding: 4px 20px 16px; display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--line);">
          ${links.map(l => `
            <div
              class="gt-nav-link ${activeKey === l.key ? 'gt-nav-link-active' : ''}"
              style="${l.comingSoon ? 'opacity: 0.55;' : ''}"
              onclick="handleNavClick('${l.key}', ${l.comingSoon || false})"
            >
              <i data-lucide="${l.icon}"></i> ${l.label}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById("menu-toggle-btn")?.addEventListener("click", () => {
    mobileMenuOpen = !mobileMenuOpen;
    renderNavbar();
    lucide.createIcons();
  });
}

function handleNavClick(key, comingSoon) {
  if (comingSoon) {
    notify(`${key.charAt(0).toUpperCase() + key.slice(1)} is coming soon.`, "error");
    return;
  }
  go(key);
}

function renderModal() {
  const container = document.getElementById("modal-container");

  if (!confirmDelete && !planModalOpen) {
    container.innerHTML = "";
    return;
  }

  if (planModalOpen && planDraft) {
    container.innerHTML = renderPlanModalHTML();
    document.getElementById("modal-bg").addEventListener("click", (e) => {
      if (e.target.id === "modal-bg") closePlanModal();
    });
    lucide.createIcons();
    return;
  }

  container.innerHTML = `
    <div class="gt-modal-bg" style="position: fixed; inset: 0; background: rgba(19,42,70,0.45); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 20px;" id="modal-bg">
      <div class="gt-modal-card gt-card" style="width: 380px; padding: 26px;">
        <div style="width: 42px; height: 42px; border-radius: 11px; background: var(--danger-soft); display: flex; align-items: center; justify-content: center; margin-bottom: 14px;">
          <i data-lucide="trash-2" style="color: var(--danger);"></i>
        </div>
        <h3 class="gt-display" style="font-size: 18px; font-weight: 700; margin: 0 0 8px;">Delete this trip?</h3>
        <p style="font-size: 14px; color: var(--slate); line-height: 1.55; margin: 0 0 22px;">
          "${confirmDelete.name}" and its itinerary will be permanently removed. This can't be undone.
        </p>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="gt-btn gt-btn-ghost gt-btn-sm" id="modal-cancel-btn">Cancel</button>
          <button class="gt-btn gt-btn-sm" style="background: var(--danger); color: #fff;" id="modal-confirm-btn">Delete trip</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("modal-bg").addEventListener("click", (e) => {
    if (e.target.id === "modal-bg") {
      confirmDelete = null;
      renderModal();
    }
  });

  document.getElementById("modal-cancel-btn").addEventListener("click", () => {
    confirmDelete = null;
    renderModal();
  });

  document.getElementById("modal-confirm-btn").addEventListener("click", deleteTrip);
}

/* ------------------------------------------------------------------ */
/*  10. LOGIN VIEW                                                     */
/* ------------------------------------------------------------------ */

function renderLogin() {
  const container = document.getElementById("login-page");
  container.innerHTML = `
    <div style="min-height: 100vh; display: flex;">
      <div class="gt-hide-mobile" style="flex: 0 0 46%; position: relative; overflow: hidden;">
        <img src="${HERO_IMG}" alt="Mountain lake at golden hour" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: linear-gradient(200deg, rgba(19,42,70,0.15) 10%, rgba(19,42,70,0.82) 90%);"></div>
        <div style="position: absolute; inset: 0; padding: 48px; display: flex; flex-direction: column; justify-content: space-between;">
          ${renderLogo(true)}
          <div>
            ${renderRouteMotif()}
            <h2 class="gt-display" style="color: #fff; font-size: 34px; font-weight: 700; line-height: 1.15; margin: 18px 0 10px; max-width: 380px;">
              Your journey, organized beautifully.
            </h2>
            <p style="color: rgba(255,255,255,0.72); font-size: 15px; max-width: 340px;">
              Every stop, every activity, every dollar — mapped out before you pack a bag.
            </p>
          </div>
        </div>
      </div>

      <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 24px;">
        <div style="width: 100%; max-width: 380px;">
          <div class="gt-hide-desktop" style="margin-bottom: 30px;">${renderLogo()}</div>
          <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 6px;">Welcome back</h1>
          <p style="color: var(--slate); font-size: 14.5px; margin: 0 0 30px;">Log in to pick up where you left off.</p>

          <form id="login-form" novalidate>
            <div style="margin-bottom: 18px;">
              <label class="gt-label">Email</label>
              <div class="gt-input-wrap">
                <i data-lucide="mail" style="position: absolute; left: 14px; top: 14px; color: var(--slate-light);"></i>
                <input class="gt-input gt-input-icon-pad" id="login-email" type="email" placeholder="you@example.com" />
              </div>
              <div class="gt-error-text" id="login-email-error" style="display: none;"></div>
            </div>

            <div style="margin-bottom: 10px;">
              <label class="gt-label">Password</label>
              <div class="gt-input-wrap">
                <i data-lucide="lock" style="position: absolute; left: 14px; top: 14px; color: var(--slate-light);"></i>
                <input class="gt-input gt-input-icon-pad" id="login-password" type="password" placeholder="••••••••" />
              </div>
              <div class="gt-error-text" id="login-password-error" style="display: none;"></div>
            </div>

            <div style="text-align: right; margin-bottom: 22px;">
              <span style="font-size: 13px; color: var(--slate); cursor: pointer; font-weight: 500;" id="forgot-password">
                Forgot password?
              </span>
            </div>

            <button class="gt-btn gt-btn-primary" id="login-btn" type="submit" style="width: 100%;">
              Log in <i data-lucide="arrow-right"></i>
            </button>
          </form>

          <p style="text-align: center; font-size: 14px; color: var(--slate); margin-top: 26px;">
            New to GlobeTrotter?
            <span style="color: var(--navy); font-weight: 700; cursor: pointer;" onclick="go('signup')">
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("forgot-password").addEventListener("click", () => {
    notify("Password reset isn't wired up in this prototype.", "error");
  });

  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const emailErr = document.getElementById("login-email-error");
    const passErr = document.getElementById("login-password-error");

    let hasErr = false;
    if (!email.trim()) {
      emailErr.style.display = "flex";
      emailErr.innerHTML = `<i data-lucide="alert-circle"></i> Enter your email address.`;
      document.getElementById("login-email").classList.add("gt-input-error");
      hasErr = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      emailErr.style.display = "flex";
      emailErr.innerHTML = `<i data-lucide="alert-circle"></i> That email doesn't look right.`;
      document.getElementById("login-email").classList.add("gt-input-error");
      hasErr = true;
    } else {
      emailErr.style.display = "none";
      document.getElementById("login-email").classList.remove("gt-input-error");
    }

    if (!password) {
      passErr.style.display = "flex";
      passErr.innerHTML = `<i data-lucide="alert-circle"></i> Enter your password.`;
      document.getElementById("login-password").classList.add("gt-input-error");
      hasErr = true;
    } else {
      passErr.style.display = "none";
      document.getElementById("login-password").classList.remove("gt-input-error");
    }

    if (hasErr) {
      lucide.createIcons();
      return;
    }

    const btn = document.getElementById("login-btn");
    btn.disabled = true;
    btn.innerText = "Logging in…";

    setTimeout(() => {
      userName = email.split("@")[0].replace(/[^a-zA-Z]/g, "") || "Traveler";
      notify("Welcome back! Good to see you.", "success");
      go("dashboard");
    }, 700);
  });
}

/* ------------------------------------------------------------------ */
/*  11. SIGNUP VIEW                                                    */
/* ------------------------------------------------------------------ */

function renderSignup() {
  const container = document.getElementById("signup-page");
  container.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: var(--cream);">
      <div class="gt-card" style="width: 100%; max-width: 440px; padding: 38px 36px;">
        <div style="margin-bottom: 26px;">${renderLogo()}</div>
        <h1 class="gt-display" style="font-size: 26px; font-weight: 700; margin: 0 0 6px;">Create your account</h1>
        <p style="color: var(--slate); font-size: 14.5px; margin: 0 0 26px;">Start planning trips that actually fit your budget.</p>

        <form id="signup-form" novalidate>
          <div style="margin-bottom: 16px;">
            <label class="gt-label">Full name</label>
            <input class="gt-input" id="signup-name" placeholder="Amara Okafor" />
            <div class="gt-error-text" id="signup-name-error" style="display: none;"></div>
          </div>

          <div style="margin-bottom: 16px;">
            <label class="gt-label">Email</label>
            <input class="gt-input" id="signup-email" type="email" placeholder="you@example.com" />
            <div class="gt-error-text" id="signup-email-error" style="display: none;"></div>
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <div style="flex: 1;">
              <label class="gt-label">Password</label>
              <input class="gt-input" id="signup-password" type="password" placeholder="8+ characters" />
            </div>
            <div style="flex: 1;">
              <label class="gt-label">Confirm</label>
              <input class="gt-input" id="signup-confirm" type="password" placeholder="Repeat it" />
            </div>
          </div>
          <div class="gt-error-text" id="signup-password-error" style="display: none; margin-top: -8px; margin-bottom: 14px;"></div>

          <button class="gt-btn gt-btn-primary" id="signup-btn" type="submit" style="width: 100%; margin-top: 6px;">
            Create account <i data-lucide="arrow-right"></i>
          </button>
        </form>

        <p style="text-align: center; font-size: 14px; color: var(--slate); margin-top: 22px;">
          Already have an account?
          <span style="color: var(--navy); font-weight: 700; cursor: pointer;" onclick="go('login')">Log in</span>
        </p>
      </div>
    </div>
  `;

  document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;

    let hasErr = false;
    if (!name.trim()) {
      document.getElementById("signup-name-error").style.display = "flex";
      document.getElementById("signup-name-error").innerHTML = `<i data-lucide="alert-circle"></i> Enter your full name.`;
      document.getElementById("signup-name").classList.add("gt-input-error");
      hasErr = true;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      document.getElementById("signup-email-error").style.display = "flex";
      document.getElementById("signup-email-error").innerHTML = `<i data-lucide="alert-circle"></i> Enter a valid email address.`;
      document.getElementById("signup-email").classList.add("gt-input-error");
      hasErr = true;
    }

    if (password.length < 8) {
      document.getElementById("signup-password-error").style.display = "flex";
      document.getElementById("signup-password-error").innerHTML = `<i data-lucide="alert-circle"></i> Use at least 8 characters.`;
      document.getElementById("signup-password").classList.add("gt-input-error");
      hasErr = true;
    } else if (confirm !== password || !confirm) {
      document.getElementById("signup-password-error").style.display = "flex";
      document.getElementById("signup-password-error").innerHTML = `<i data-lucide="alert-circle"></i> Passwords don't match.`;
      document.getElementById("signup-confirm").classList.add("gt-input-error");
      hasErr = true;
    }

    if (hasErr) {
      lucide.createIcons();
      return;
    }

    const btn = document.getElementById("signup-btn");
    btn.disabled = true;
    btn.innerText = "Creating account…";

    setTimeout(() => {
      userName = name.split(" ")[0];
      notify("Account created — let's plan a trip.", "success");
      go("dashboard");
    }, 700);
  });
}

/* ------------------------------------------------------------------ */
/*  12. DASHBOARD VIEW                                                 */
/* ------------------------------------------------------------------ */

function renderTripCardHTML(trip, isDashboard = false) {
  return `
    <div class="gt-card gt-trip-card" style="overflow: hidden; min-width: 300px; flex: 0 0 300px;">
      <div style="position: relative; height: 150px;">
        <img src="${trip.img}" alt="${trip.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        <span style="
          position: absolute; top: 12px; left: 12px; background: rgba(19,42,70,0.85); color: #fff;
          font-size: 11.5px; font-weight: 600; padding: 5px 10px; border-radius: 999px; text-transform: capitalize;
        ">
          ${trip.status}
        </span>
      </div>
      <div style="padding: 18px;">
        <h4 class="gt-display" style="font-size: 16.5px; font-weight: 700; margin: 0 0 8px;">${trip.name}</h4>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="calendar"></i> ${fmtRange(trip.start, trip.end)}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="map-pin"></i> ${trip.stops} destination${trip.stops !== 1 ? "s" : ""}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="wallet"></i> ${formatINR(trip.budget)} estimated
          </span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="gt-btn gt-btn-dark gt-btn-sm" style="flex: 1;" onclick="viewTripDetail('${trip.id}')">
            <i data-lucide="eye"></i> View
          </button>
          <button class="gt-btn gt-btn-ghost gt-btn-icon" onclick="editTrip('${trip.id}')" title="Edit">
            <i data-lucide="pencil"></i>
          </button>
          <button class="gt-btn gt-btn-danger-ghost gt-btn-icon" onclick="requestDeleteTrip('${trip.id}')" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderSkeletonCardHTML(h = 230) {
  return `
    <div class="gt-card" style="overflow: hidden;">
      <div class="gt-skel" style="height: ${h * 0.55}px; border-radius: 0;"></div>
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 10px;">
        <div class="gt-skel" style="height: 16px; width: 70%;"></div>
        <div class="gt-skel" style="height: 12px; width: 45%;"></div>
        <div class="gt-skel" style="height: 12px; width: 55%;"></div>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const container = document.getElementById("dashboard-page");
  const upcoming = trips.filter((t) => t.status === "upcoming");
  const totalBudget = trips.reduce((s, t) => s + t.budget, 0);
  const totalDays = trips.reduce((s, t) => {
    const d = (new Date(t.end) - new Date(t.start)) / 86400000;
    return s + Math.max(d, 1);
  }, 0);
  const avgDaily = totalDays ? Math.round(totalBudget / totalDays) : 0;

  container.innerHTML = `
    <div style="max-width: 1180px; margin: 0 auto; padding: 40px 24px 80px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 20px; margin-bottom: 34px;">
        <div>
          <h1 class="gt-display" style="font-size: 30px; font-weight: 700; margin: 0 0 6px;">
            Good morning, ${userName} 👋
          </h1>
          <p style="color: var(--slate); font-size: 15.5px; margin: 0;">Where are you going next?</p>
        </div>
        <button class="gt-btn gt-btn-primary" onclick="go('create-trip')">
          <i data-lucide="plus"></i> Plan New Trip
        </button>
      </div>

      <!-- Upcoming Trips -->
      <section style="margin-bottom: 44px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0;">Upcoming trips</h2>
          <span style="font-size: 13.5px; font-weight: 600; color: var(--accent-dark); cursor: pointer; display: flex; align-items: center; gap: 4px;" onclick="go('my-trips')">
            View all <i data-lucide="chevron-right"></i>
          </span>
        </div>
        <div class="gt-scrollbar-none" style="display: flex; gap: 18px; overflow-x: auto; padding-bottom: 8px;">
          ${isLoading
            ? [1, 2, 3].map(() => `<div style="min-width: 300px; flex: 0 0 300px;">${renderSkeletonCardHTML()}</div>`).join('')
            : upcoming.length
            ? upcoming.map((t) => renderTripCardHTML(t, true)).join('')
            : `
              <div class="gt-card" style="padding: 26px; flex: 1; text-align: center; color: var(--slate); font-size: 14px;">
                No upcoming trips yet. Plan your first one!
              </div>
            `}
        </div>
      </section>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;" class="gt-dash-grid">
        <!-- Recommended Destinations -->
        <section>
          <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Recommended destinations</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${isLoading
              ? [1, 2, 3, 4].map(() => renderSkeletonCardHTML(190)).join('')
              : DESTINATIONS.map((d) => `
                  <div class="gt-dest-card" style="height: 190px;" onclick="openDestinationByCity('${d.city}')">
                    <img src="${d.img}" alt="${d.city}" style="width: 100%; height: 100%; object-fit: cover;" />
                    <div style="position: absolute; inset: 0; background: linear-gradient(0deg, rgba(19,42,70,0.88) 0%, rgba(19,42,70,0.1) 55%);"></div>
                    <div style="position: absolute; left: 14px; right: 14px; bottom: 12px; color: #fff;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                          <div class="gt-display" style="font-size: 16.5px; font-weight: 700;">${d.city}</div>
                          <div style="font-size: 12px; opacity: 0.85;">${d.country} · ${d.cost}</div>
                        </div>
                        <button class="gt-btn gt-btn-soft gt-btn-sm" onclick="event.stopPropagation(); openDestinationByCity('${d.city}')">
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
          </div>
        </section>

        <!-- Budget Highlights -->
        <section>
          <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Budget highlights</h2>
          <div class="gt-card" style="padding: 22px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
              <div style="width: 38px; height: 38px; border-radius: 10px; background: var(--accent-soft); display: flex; align-items: center; justify-content: center;">
                <i data-lucide="trending-up" style="color: var(--accent-dark);"></i>
              </div>
              <div>
                <div style="font-size: 12.5px; color: var(--slate);">Total planned spend</div>
                <div class="gt-display" style="font-size: 21px; font-weight: 700;">
                  ${isLoading ? "—" : formatINR(totalBudget)}
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13.5px; margin-bottom: 8px;">
              <span style="color: var(--slate);">Average per day</span>
              <span style="font-weight: 700;">${isLoading ? "—" : formatINR(avgDaily)}</span>
            </div>
            <div style="height: 8px; border-radius: 999px; background: var(--accent-soft); overflow: hidden; margin-bottom: 6px;">
              <div style="width: 64%; height: 100%; background: var(--accent);"></div>
            </div>
            <div style="font-size: 12px; color: var(--slate-light);">64% of your typical monthly travel budget</div>
          </div>
        </section>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  13. CREATE TRIP VIEW                                              */
/* ------------------------------------------------------------------ */

function renderCreateTrip() {
  const container = document.getElementById("create-trip-page");
  container.innerHTML = `
    <div style="max-width: 640px; margin: 0 auto; padding: 48px 24px 80px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">Plan a new trip</h1>
        <p style="color: var(--slate); font-size: 15px;">Start with the basics — you can add stops and activities next.</p>
      </div>

      <div class="gt-card" style="padding: 34px 32px;">
        <form id="create-trip-form" novalidate>
          <div style="margin-bottom: 18px;">
            <label class="gt-label">Trip name</label>
            <input class="gt-input" id="create-trip-name" placeholder="e.g. Japan in Bloom" />
            <div class="gt-error-text" id="create-name-error" style="display: none;"></div>
          </div>

          <div style="display: flex; gap: 14px; margin-bottom: 18px;">
            <div style="flex: 1;">
              <label class="gt-label">Start date</label>
              <input class="gt-input" id="create-trip-start" type="date" />
              <div class="gt-error-text" id="create-start-error" style="display: none;"></div>
            </div>
            <div style="flex: 1;">
              <label class="gt-label">End date</label>
              <input class="gt-input" id="create-trip-end" type="date" />
              <div class="gt-error-text" id="create-end-error" style="display: none;"></div>
            </div>
          </div>

          <div style="margin-bottom: 18px;">
            <label class="gt-label">Description</label>
            <textarea
              class="gt-input" id="create-trip-desc" rows="4" placeholder="What's this trip about?"
              style="resize: vertical; font-family: Inter, sans-serif;"
            ></textarea>
          </div>

          <div style="margin-bottom: 26px;">
            <label class="gt-label">Cover photo (optional)</label>
            <div style="
              border: 1.5px dashed var(--line); border-radius: 12px; padding: 22px 16px;
              display: flex; flex-direction: column; align-items: center; gap: 6px; color: var(--slate);
              cursor: pointer; background: #FCFAF6;
            ">
              <i data-lucide="image-plus" style="color: var(--slate-light);"></i>
              <span style="font-size: 13px;">Click to upload, or drag an image here</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px;">
            <button type="button" class="gt-btn gt-btn-ghost" style="flex: 1;" onclick="go('dashboard')">Cancel</button>
            <button type="submit" class="gt-btn gt-btn-primary" id="create-trip-submit" style="flex: 2;">
              Create trip <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("create-trip-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("create-trip-name").value;
    const start = document.getElementById("create-trip-start").value;
    const end = document.getElementById("create-trip-end").value;
    const desc = document.getElementById("create-trip-desc").value;

    let hasErr = false;
    if (!name.trim()) {
      document.getElementById("create-name-error").style.display = "flex";
      document.getElementById("create-name-error").innerHTML = `<i data-lucide="alert-circle"></i> Give your trip a name.`;
      document.getElementById("create-trip-name").classList.add("gt-input-error");
      hasErr = true;
    }
    if (!start) {
      document.getElementById("create-start-error").style.display = "flex";
      document.getElementById("create-start-error").innerHTML = `<i data-lucide="alert-circle"></i> Pick a start date.`;
      document.getElementById("create-trip-start").classList.add("gt-input-error");
      hasErr = true;
    }
    if (!end) {
      document.getElementById("create-end-error").style.display = "flex";
      document.getElementById("create-end-error").innerHTML = `<i data-lucide="alert-circle"></i> Pick an end date.`;
      document.getElementById("create-trip-end").classList.add("gt-input-error");
      hasErr = true;
    } else if (start && end && new Date(end) < new Date(start)) {
      document.getElementById("create-end-error").style.display = "flex";
      document.getElementById("create-end-error").innerHTML = `<i data-lucide="alert-circle"></i> End date can't be before the start date.`;
      document.getElementById("create-trip-end").classList.add("gt-input-error");
      hasErr = true;
    }

    if (hasErr) {
      lucide.createIcons();
      return;
    }

    const btn = document.getElementById("create-trip-submit");
    btn.disabled = true;
    btn.innerText = "Creating…";

    setTimeout(() => {
      addTrip({
        id: "t" + Date.now(),
        name,
        img: DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)].img,
        start,
        end,
        desc,
        stops: 1,
        budget: 0,
        status: new Date(start) >= new Date() ? "upcoming" : "past",
      });
      notify("Trip created. Time to add stops!", "success");
      go("my-trips");
    }, 600);
  });
}

/* ------------------------------------------------------------------ */
/*  14. MY TRIPS VIEW                                                 */
/* ------------------------------------------------------------------ */

function tripDurationDays(t) {
  const d = (new Date(t.end) - new Date(t.start)) / 86400000;
  return Math.max(Math.round(d) + 1, 1);
}

function tripActivitiesCount(t) {
  if (typeof t.activities === "number") return t.activities;
  if (Array.isArray(t.itinerary)) return t.itinerary.reduce((s, d) => s + (d.activities ? d.activities.length : 0), 0);
  return (t.stops || 1) * 3;
}

function tripProgress(t) {
  const targetDays = Array.isArray(t.itinerary) ? t.itinerary.length : tripDurationDays(t);
  const targetActivities = Math.max(targetDays * 3, 1);
  const done = tripActivitiesCount(t);
  return Math.max(4, Math.min(100, Math.round((done / targetActivities) * 100)));
}

function sortTrips(list) {
  const arr = [...list];
  switch (myTripsSort) {
    case "oldest":
      return arr.sort((a, b) => new Date(a.start) - new Date(b.start));
    case "lowest":
      return arr.sort((a, b) => (a.budget || 0) - (b.budget || 0));
    case "highest":
      return arr.sort((a, b) => (b.budget || 0) - (a.budget || 0));
    case "duration":
      return arr.sort((a, b) => tripDurationDays(b) - tripDurationDays(a));
    case "newest":
    default:
      return arr.sort((a, b) => new Date(b.start) - new Date(a.start));
  }
}

function renderMyTrips() {
  const container = document.getElementById("my-trips-page");

  const q = myTripsQuery.toLowerCase();
  const matches = (t) =>
    t.name.toLowerCase().includes(q) ||
    (t.city || "").toLowerCase().includes(q) ||
    (t.country || "").toLowerCase().includes(q);

  const exploring = sortTrips(trips.filter((t) => t.status !== "past" && matches(t)));
  const past = sortTrips(trips.filter((t) => t.status === "past" && matches(t)));

  const showExploring = myTripsFilter === "all" || myTripsFilter === "exploring" || myTripsFilter === "upcoming";
  const showPast = myTripsFilter === "all" || myTripsFilter === "past";
  const exploringList = myTripsFilter === "upcoming" ? exploring.filter((t) => t.status === "upcoming") : exploring;

  container.innerHTML = `
    <div style="max-width: 1180px; margin: 0 auto; padding: 40px 24px 80px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 18px; margin-bottom: 26px;">
        <div>
          <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 6px;">My Trips</h1>
          <p style="color: var(--slate); font-size: 15px;">All your adventures in one place.</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="gt-btn gt-btn-ghost" onclick="go('explore')">
            <i data-lucide="sparkles"></i> Explore
          </button>
          <button class="gt-btn gt-btn-primary" onclick="go('create-trip')">
            <i data-lucide="plus"></i> Plan New Trip
          </button>
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; justify-content: space-between;">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; flex: 1;">
          <div class="gt-input-wrap" style="flex: 1 1 220px;">
            <i data-lucide="search" style="position: absolute; left: 14px; top: 13px; color: var(--slate-light);"></i>
            <input class="gt-input gt-input-icon-pad" id="my-trips-search" placeholder="Search trips…" value="${myTripsQuery}" />
          </div>
          <div style="display: flex; gap: 6px; background: #F2EEE4; border-radius: 11px; padding: 4px;">
            ${[
              { key: "all", label: "All" },
              { key: "exploring", label: "Exploring" },
              { key: "upcoming", label: "Upcoming" },
              { key: "past", label: "Past" },
            ].map((f) => `
              <div
                onclick="setMyTripsFilter('${f.key}')"
                style="
                  padding: 8px 14px; border-radius: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer;
                  background: ${myTripsFilter === f.key ? 'var(--white)' : 'transparent'};
                  color: ${myTripsFilter === f.key ? 'var(--navy)' : 'var(--slate)'};
                  box-shadow: ${myTripsFilter === f.key ? '0 1px 3px rgba(19,42,70,0.08)' : 'none'};
                "
              >
                ${f.label}
              </div>
            `).join('')}
          </div>
        </div>
        <select id="my-trips-sort" class="gt-input" style="width: auto; flex: 0 0 auto;">
          ${[
            ["newest", "Newest"],
            ["oldest", "Oldest"],
            ["lowest", "Lowest Budget"],
            ["highest", "Highest Budget"],
            ["duration", "Trip Duration"],
          ].map(([k, label]) => `<option value="${k}" ${myTripsSort === k ? "selected" : ""}>${label}</option>`).join('')}
        </select>
      </div>

      ${isLoading ? `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
          ${[1, 2, 3].map(() => renderSkeletonCardHTML()).join('')}
        </div>
      ` : trips.length === 0 ? `
        <div style="text-align: center; padding: 70px 20px;">
          <svg width="150" height="110" viewBox="0 0 150 110" fill="none" style="margin: 0 auto 22px;">
            <ellipse cx="75" cy="98" rx="55" ry="8" fill="#EFE8D8" />
            <circle cx="75" cy="46" r="38" fill="#FDECC8" />
            <path d="M75 46 m-24 0 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0" stroke="#F5A524" stroke-width="2" class="gt-route-dash" />
            <circle cx="75" cy="46" r="5" fill="var(--navy)" />
            <path d="M40 30 C 55 15, 95 15, 110 30" stroke="var(--navy)" stroke-width="2" class="gt-route-dash" opacity="0.5" />
            <circle cx="40" cy="30" r="3.5" fill="var(--accent-dark)" />
            <circle cx="110" cy="30" r="3.5" fill="var(--accent-dark)" />
          </svg>
          <h3 class="gt-display" style="font-size: 20px; font-weight: 700; margin: 0 0 8px;">No trips yet</h3>
          <p style="color: var(--slate); font-size: 14.5px; max-width: 320px; margin: 0 auto 22px;">
            Plan your first adventure and start building your itinerary.
          </p>
          <button class="gt-btn gt-btn-primary" onclick="go('explore')">
            <i data-lucide="sparkles"></i> Explore destinations
          </button>
        </div>
      ` : (exploringList.length === 0 && past.length === 0) ? `
        <div style="text-align: center; padding: 60px 20px; color: var(--slate);">
          <i data-lucide="search" style="margin-bottom: 10px; color: var(--slate-light);"></i>
          <p style="font-size: 14.5px;">No trips match "${myTripsQuery}".</p>
        </div>
      ` : `
        ${showExploring ? `
          <section style="margin-bottom: 40px;">
            <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Exploring Trips</h2>
            ${exploringList.length === 0 ? `
              <div class="gt-card" style="padding: 24px; text-align: center; color: var(--slate); font-size: 14px;">
                Nothing here yet — plan a trip from Explore.
              </div>
            ` : `
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                ${exploringList.map((t) => renderExploringTripCardHTML(t)).join('')}
              </div>
            `}
          </section>
        ` : ''}

        ${showPast ? `
          <section>
            <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Past Trips</h2>
            ${past.length === 0 ? `
              <div class="gt-card" style="padding: 24px; text-align: center; color: var(--slate); font-size: 14px;">
                No past trips yet.
              </div>
            ` : `
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                ${past.map((t) => renderPastTripCardHTML(t)).join('')}
              </div>
            `}
          </section>
        ` : ''}
      `}
    </div>
  `;

  document.getElementById("my-trips-search")?.addEventListener("input", (e) => {
    myTripsQuery = e.target.value;
    renderMyTrips();
    lucide.createIcons();
  });

  document.getElementById("my-trips-sort")?.addEventListener("change", (e) => {
    myTripsSort = e.target.value;
    renderMyTrips();
    lucide.createIcons();
  });
}

function renderExploringTripCardHTML(t) {
  const days = tripDurationDays(t);
  const progress = tripProgress(t);
  const activities = tripActivitiesCount(t);
  return `
    <div class="gt-card gt-trip-card" style="overflow: hidden;">
      <div style="position: relative; height: 150px;">
        <img src="${t.img}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        <span style="
          position: absolute; top: 12px; left: 12px; background: rgba(19,42,70,0.85); color: #fff;
          font-size: 11.5px; font-weight: 600; padding: 5px 10px; border-radius: 999px; text-transform: capitalize;
        ">
          ${t.status === "planning" ? "Planning" : "Upcoming"}
        </span>
      </div>
      <div style="padding: 18px;">
        <h4 class="gt-display" style="font-size: 16.5px; font-weight: 700; margin: 0 0 2px;">${t.name}</h4>
        <p style="font-size: 12.5px; color: var(--slate); margin: 0 0 12px;">${t.city ? `${t.city}, ${t.country}` : ""}</p>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;">
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="calendar"></i> ${fmtRange(t.start, t.end)} · ${days} day${days !== 1 ? "s" : ""}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="users"></i> ${t.travelers || 1} traveler${(t.travelers || 1) !== 1 ? "s" : ""}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="wallet"></i> ${formatINR(t.budget)} · ${formatINR(Math.round(t.budget / days))}/day
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="list-checks"></i> ${activities} activities
          </span>
        </div>
        <div style="margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--slate); margin-bottom: 5px;">
            <span>Planning progress</span><span>${progress}%</span>
          </div>
          <div class="gt-bar-track-sm"><div class="gt-bar-fill" style="width: ${progress}%; background: var(--accent);"></div></div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="gt-btn gt-btn-dark gt-btn-sm" style="flex: 1;" onclick="viewTripDetail('${t.id}')">
            <i data-lucide="eye"></i> View Trip
          </button>
          <button class="gt-btn gt-btn-ghost gt-btn-icon" onclick="editTrip('${t.id}')" title="Edit">
            <i data-lucide="pencil"></i>
          </button>
          <button class="gt-btn gt-btn-danger-ghost gt-btn-icon" onclick="requestDeleteTrip('${t.id}')" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderPastTripCardHTML(t) {
  const days = tripDurationDays(t);
  const activities = tripActivitiesCount(t);
  return `
    <div class="gt-card gt-trip-card" style="overflow: hidden;">
      <div style="position: relative; height: 150px;">
        <img src="${t.img}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85);" />
        <span style="
          position: absolute; top: 12px; left: 12px; background: rgba(19,42,70,0.7); color: #fff;
          font-size: 11.5px; font-weight: 600; padding: 5px 10px; border-radius: 999px;
        ">
          Completed
        </span>
      </div>
      <div style="padding: 18px;">
        <h4 class="gt-display" style="font-size: 16.5px; font-weight: 700; margin: 0 0 2px;">${t.name}</h4>
        <p style="font-size: 12.5px; color: var(--slate); margin: 0 0 12px;">${t.city ? `${t.city}, ${t.country}` : ""}</p>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px;">
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="calendar"></i> ${fmtRange(t.start, t.end)} · ${days} days
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="wallet"></i> Total spent: ${formatINR(t.budget)}
          </span>
          <span style="display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--slate);">
            <i data-lucide="list-checks"></i> ${activities} activities completed
          </span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="gt-btn gt-btn-dark gt-btn-sm" style="flex: 1;" onclick="viewTripDetail('${t.id}')">
            <i data-lucide="eye"></i> View Trip
          </button>
          <button class="gt-btn gt-btn-soft gt-btn-sm" onclick="planAgain('${t.id}')" title="Plan Again">
            <i data-lucide="repeat"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function setMyTripsFilter(filter) {
  myTripsFilter = filter;
  renderMyTrips();
  lucide.createIcons();
}

function viewTripDetail(tripId) {
  selectedTrip = trips.find((t) => t.id === tripId);
  go("trip-detail");
}

function editTrip(tripId) {
  selectedTrip = trips.find((t) => t.id === tripId);
  go("edit-trip");
}

function requestDeleteTrip(tripId) {
  confirmDelete = trips.find((t) => t.id === tripId);
  renderModal();
  lucide.createIcons();
}

function planAgain(tripId) {
  const t = trips.find((x) => x.id === tripId);
  if (!t) return;
  const dest = EXPLORE_DESTINATIONS.find((d) => d.city === t.city) || EXPLORE_DESTINATIONS[0];
  openDestination(dest.id);
  notify(`Pick a fresh itinerary to plan ${dest.city} again.`, "success");
}

/* ------------------------------------------------------------------ */
/*  15. EDIT TRIP VIEW                                                 */
/* ------------------------------------------------------------------ */

function renderEditTrip() {
  const container = document.getElementById("edit-trip-page");

  if (!selectedTrip) {
    container.innerHTML = `
      <div style="max-width: 640px; margin: 0 auto; padding: 80px 24px; text-align: center;">
        <p style="color: var(--slate); font-size: 15px; margin-bottom: 18px;">No trip selected to edit.</p>
        <button class="gt-btn gt-btn-primary" onclick="go('my-trips')">Back to My Trips</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="max-width: 640px; margin: 0 auto; padding: 48px 24px 80px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">Edit trip</h1>
        <p style="color: var(--slate); font-size: 15px;">Update the basics for "${selectedTrip.name}".</p>
      </div>

      <div class="gt-card" style="padding: 34px 32px;">
        <form id="edit-trip-form" novalidate>
          <div style="margin-bottom: 18px;">
            <label class="gt-label">Trip name</label>
            <input class="gt-input" id="edit-trip-name" value="${selectedTrip.name}" placeholder="e.g. Japan in Bloom" />
            <div class="gt-error-text" id="edit-name-error" style="display: none;"></div>
          </div>

          <div style="display: flex; gap: 14px; margin-bottom: 18px;">
            <div style="flex: 1;">
              <label class="gt-label">Start date</label>
              <input class="gt-input" id="edit-trip-start" type="date" value="${selectedTrip.start}" />
              <div class="gt-error-text" id="edit-start-error" style="display: none;"></div>
            </div>
            <div style="flex: 1;">
              <label class="gt-label">End date</label>
              <input class="gt-input" id="edit-trip-end" type="date" value="${selectedTrip.end}" />
              <div class="gt-error-text" id="edit-end-error" style="display: none;"></div>
            </div>
          </div>

          <div style="margin-bottom: 26px;">
            <label class="gt-label">Description</label>
            <textarea
              class="gt-input" id="edit-trip-desc" rows="4" placeholder="What's this trip about?"
              style="resize: vertical; font-family: Inter, sans-serif;"
            >${selectedTrip.desc || ""}</textarea>
          </div>

          <div style="display: flex; gap: 10px;">
            <button type="button" class="gt-btn gt-btn-ghost" style="flex: 1;" onclick="go('my-trips')">Cancel</button>
            <button type="submit" class="gt-btn gt-btn-primary" id="edit-trip-submit" style="flex: 2;">
              Save changes <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("edit-trip-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("edit-trip-name").value;
    const start = document.getElementById("edit-trip-start").value;
    const end = document.getElementById("edit-trip-end").value;
    const desc = document.getElementById("edit-trip-desc").value;

    let hasErr = false;
    if (!name.trim()) {
      document.getElementById("edit-name-error").style.display = "flex";
      document.getElementById("edit-name-error").innerHTML = `<i data-lucide="alert-circle"></i> Give your trip a name.`;
      document.getElementById("edit-trip-name").classList.add("gt-input-error");
      hasErr = true;
    }
    if (!start) {
      document.getElementById("edit-start-error").style.display = "flex";
      document.getElementById("edit-start-error").innerHTML = `<i data-lucide="alert-circle"></i> Pick a start date.`;
      document.getElementById("edit-trip-start").classList.add("gt-input-error");
      hasErr = true;
    }
    if (!end) {
      document.getElementById("edit-end-error").style.display = "flex";
      document.getElementById("edit-end-error").innerHTML = `<i data-lucide="alert-circle"></i> Pick an end date.`;
      document.getElementById("edit-trip-end").classList.add("gt-input-error");
      hasErr = true;
    } else if (start && end && new Date(end) < new Date(start)) {
      document.getElementById("edit-end-error").style.display = "flex";
      document.getElementById("edit-end-error").innerHTML = `<i data-lucide="alert-circle"></i> End date can't be before the start date.`;
      document.getElementById("edit-trip-end").classList.add("gt-input-error");
      hasErr = true;
    }

    if (hasErr) {
      lucide.createIcons();
      return;
    }

    const btn = document.getElementById("edit-trip-submit");
    btn.disabled = true;
    btn.innerText = "Saving…";

    setTimeout(() => {
      updateTrip({
        ...selectedTrip,
        name,
        start,
        end,
        desc,
        status: new Date(start) >= new Date() ? "upcoming" : "past",
      });
      notify("Trip updated.", "success");
      go("my-trips");
    }, 500);
  });
}

/* ------------------------------------------------------------------ */
/*  16. EXPLORE VIEW                                                   */
/* ------------------------------------------------------------------ */

const BUDGET_TIERS = ["All", "Budget", "Moderate", "High", "Luxury"];
const TRIP_TYPES = ["All", "Adventure", "Relaxation", "Culture", "Food", "Nature", "Couple", "Family"];
const DURATION_OPTIONS = [
  { key: "any", label: "Any duration" },
  { key: "2-4", label: "2–4 days" },
  { key: "5-7", label: "5–7 days" },
  { key: "8-14", label: "8–14 days" },
  { key: "15+", label: "15+ days" },
];

function durationOverlap(range, key) {
  const bounds = { "2-4": [2, 4], "5-7": [5, 7], "8-14": [8, 14], "15+": [15, 999] };
  const [lo, hi] = bounds[key];
  return range[1] >= lo && range[0] <= hi;
}

function getFilteredDestinations() {
  const q = exploreQuery.trim().toLowerCase();
  return EXPLORE_DESTINATIONS.filter((d) => {
    const matchesQuery = !q || d.city.toLowerCase().includes(q) || d.country.toLowerCase().includes(q);
    const matchesBudget = exploreBudgetFilter === "all" || d.budgetTier === exploreBudgetFilter;
    const matchesType = exploreTripTypeFilter === "all" || d.tripTypes.includes(exploreTripTypeFilter);
    const matchesDuration = exploreDurationFilter === "any" || durationOverlap(d.recommendedDays, exploreDurationFilter);
    return matchesQuery && matchesBudget && matchesType && matchesDuration;
  });
}

function renderFilterChipsHTML(options, activeVal, onclickFn) {
  return options
    .map((opt) => {
      const val = typeof opt === "string" ? opt.toLowerCase() : opt.key;
      const label = typeof opt === "string" ? opt : opt.label;
      const isActive = activeVal === val;
      return `<div class="gt-chip ${isActive ? "gt-chip-active" : ""}" onclick="${onclickFn}('${val}')">${label}</div>`;
    })
    .join("");
}

function setExploreBudget(v) { exploreBudgetFilter = v; renderExplore(); lucide.createIcons(); }
function setExploreTripType(v) { exploreTripTypeFilter = v; renderExplore(); lucide.createIcons(); }
function setExploreDuration(v) { exploreDurationFilter = v; renderExplore(); lucide.createIcons(); }

function renderExplore() {
  const container = document.getElementById("explore-page");
  const results = getFilteredDestinations();

  container.innerHTML = `
    <div style="max-width: 1180px; margin: 0 auto; padding: 40px 24px 80px;">
      <div style="text-align: center; max-width: 620px; margin: 0 auto 30px;">
        <h1 class="gt-display" style="font-size: 30px; font-weight: 700; margin: 0 0 8px;">Explore the world</h1>
        <p style="color: var(--slate); font-size: 15.5px; margin: 0 0 24px;">
          Discover destinations, compare budgets, and find the perfect itinerary.
        </p>
        <div class="gt-input-wrap">
          <i data-lucide="search" style="position: absolute; left: 16px; top: 15px; color: var(--slate-light);"></i>
          <input
            class="gt-input gt-input-icon-pad" id="explore-search"
            style="padding: 14px 16px 14px 42px; font-size: 15px; border-radius: 13px;"
            placeholder="Search cities or countries…" value="${exploreQuery}"
          />
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px;">
        <div>
          <div style="font-size: 12.5px; font-weight: 700; color: var(--slate); text-transform: uppercase; letter-spacing: .04em; margin-bottom: 8px;">Budget</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">${renderFilterChipsHTML(BUDGET_TIERS, exploreBudgetFilter, "setExploreBudget")}</div>
        </div>
        <div>
          <div style="font-size: 12.5px; font-weight: 700; color: var(--slate); text-transform: uppercase; letter-spacing: .04em; margin-bottom: 8px;">Trip Type</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">${renderFilterChipsHTML(TRIP_TYPES, exploreTripTypeFilter, "setExploreTripType")}</div>
        </div>
        <div>
          <div style="font-size: 12.5px; font-weight: 700; color: var(--slate); text-transform: uppercase; letter-spacing: .04em; margin-bottom: 8px;">Duration</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">${renderFilterChipsHTML(DURATION_OPTIONS, exploreDurationFilter, "setExploreDuration")}</div>
        </div>
      </div>

      ${isLoading ? `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 22px;">
          ${[1, 2, 3, 4, 5, 6].map(() => renderSkeletonCardHTML(300)).join('')}
        </div>
      ` : results.length === 0 ? `
        <div style="text-align: center; padding: 60px 20px; color: var(--slate);">
          <i data-lucide="map-pin-off" style="margin-bottom: 10px; color: var(--slate-light);"></i>
          <p style="font-size: 14.5px;">No destinations match your filters. Try widening your search.</p>
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 22px;">
          ${results.map((d) => renderExploreDestCardHTML(d)).join('')}
        </div>
      `}
    </div>
  `;

  document.getElementById("explore-search")?.addEventListener("input", (e) => {
    exploreQuery = e.target.value;
    renderExplore();
    lucide.createIcons();
  });
}

function renderExploreDestCardHTML(d) {
  return `
    <div class="gt-card" style="overflow: hidden; display: flex; flex-direction: column;">
      <div class="gt-dest-card" style="height: 170px; border-radius: 0;" onclick="openDestination('${d.id}')">
        <img src="${d.img}" alt="${d.city}" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.92); color: var(--navy); font-size: 12px; font-weight: 700; padding: 4px 9px; border-radius: 999px; display: flex; align-items: center; gap: 4px;">
          <i data-lucide="star" style="width: 13px; height: 13px; color: var(--accent);"></i> ${d.rating}
        </div>
      </div>
      <div style="padding: 18px; display: flex; flex-direction: column; flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
          <h3 class="gt-display" style="font-size: 18px; font-weight: 700; margin: 0;">${d.city}</h3>
          <span class="gt-tag">${d.budgetTier}</span>
        </div>
        <p style="font-size: 12.5px; color: var(--slate-light); margin: 0 0 8px;">${d.country}</p>
        <p style="font-size: 13.5px; color: var(--slate); line-height: 1.5; margin: 0 0 14px; flex: 1;">${d.description}</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12.5px; margin-bottom: 12px;">
          <div>
            <div style="color: var(--slate-light);">Starting from</div>
            <div style="font-weight: 700; color: var(--navy);">${formatINR(d.startingBudget)}</div>
          </div>
          <div>
            <div style="color: var(--slate-light);">Average</div>
            <div style="font-weight: 700; color: var(--navy);">${formatINR(d.dailyBudget)}/day</div>
          </div>
          <div>
            <div style="color: var(--slate-light);">Recommended</div>
            <div style="font-weight: 700; color: var(--navy);">${d.recommendedDays[0]}–${d.recommendedDays[1]} days</div>
          </div>
          <div>
            <div style="color: var(--slate-light);">Best time</div>
            <div style="font-weight: 700; color: var(--navy);">${d.bestTime}</div>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">
          ${d.tripTypes.map((t) => `<span class="gt-tag">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 8px; margin-top: auto;">
          <button class="gt-btn gt-btn-dark gt-btn-sm" style="flex: 1;" onclick="openDestination('${d.id}')">
            View Itineraries <i data-lucide="arrow-right"></i>
          </button>
          <button class="gt-btn gt-btn-soft gt-btn-sm gt-btn-icon" onclick="quickAddToMyTrip('${d.id}')" title="Add to My Trip">
            <i data-lucide="plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function openDestination(id) {
  selectedDestination = EXPLORE_DESTINATIONS.find((d) => d.id === id) || null;
  expandedItineraryId = null;
  go("destination-detail");
}

function openDestinationByCity(city) {
  const dest = EXPLORE_DESTINATIONS.find((d) => d.city === city);
  if (dest) openDestination(dest.id);
  else notify(`${city} isn't in Explore yet.`, "error");
}

function quickAddToMyTrip(id) {
  const dest = EXPLORE_DESTINATIONS.find((d) => d.id === id);
  if (!dest) return;
  selectedDestination = dest;
  const itineraries = buildItineraries(dest);
  openPlanModal(itineraries[1].id); // default to the middle (5-day) option
}

/* ------------------------------------------------------------------ */
/*  17. DESTINATION DETAIL / ITINERARY VIEW                            */
/* ------------------------------------------------------------------ */

function renderBudgetBarsHTML(breakdown, total) {
  const rows = [
    { label: "Accommodation", value: breakdown.accommodation, color: "var(--navy)" },
    { label: "Food", value: breakdown.food, color: "var(--accent)" },
    { label: "Transportation", value: breakdown.transportation, color: "var(--success)" },
    { label: "Activities", value: breakdown.activities, color: "var(--accent-dark)" },
    { label: "Miscellaneous", value: breakdown.miscellaneous, color: "var(--slate-light)" },
  ];
  return rows.map((r) => {
    const pct = total ? Math.round((r.value / total) * 100) : 0;
    return `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px;">
          <span style="color: var(--navy); font-weight: 600;">${r.label}</span>
          <span style="color: var(--slate);">${formatINR(r.value)} · ${pct}%</span>
        </div>
        <div class="gt-bar-track"><div class="gt-bar-fill" style="width: ${pct}%; background: ${r.color};"></div></div>
      </div>
    `;
  }).join('');
}

function renderItineraryDaysHTML(days) {
  return days.map((day) => `
    <div class="gt-card" style="padding: 18px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h4 class="gt-display" style="font-size: 15.5px; font-weight: 700; margin: 0;">Day ${day.day} — ${day.title}</h4>
        <span style="font-size: 12.5px; font-weight: 700; color: var(--accent-dark);">Daily cost: ${formatINR(day.dailyCost)}</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${day.activities.map((a) => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--cream); border-radius: 10px;">
            <div>
              <span style="font-size: 11.5px; font-weight: 700; color: var(--slate); text-transform: uppercase; letter-spacing: .03em;">${a.time}</span>
              <div style="font-size: 14px; font-weight: 600; color: var(--navy);">${a.name}</div>
            </div>
            <span style="font-size: 12.5px; color: var(--slate);">${a.cost ? formatINR(a.cost) : "Free"}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function toggleItinerary(id) {
  expandedItineraryId = expandedItineraryId === id ? null : id;
  renderDestinationDetail();
  lucide.createIcons();
}

function renderDestinationDetail() {
  const container = document.getElementById("destination-detail-page");
  const d = selectedDestination;

  if (!d) {
    container.innerHTML = `
      <div style="max-width: 640px; margin: 0 auto; padding: 80px 24px; text-align: center;">
        <p style="color: var(--slate); font-size: 15px; margin-bottom: 18px;">No destination selected.</p>
        <button class="gt-btn gt-btn-primary" onclick="go('explore')">Back to Explore</button>
      </div>
    `;
    return;
  }

  const itineraries = buildItineraries(d);
  const midEstimate = itineraries[1].estimatedBudget;

  container.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto; padding: 24px 24px 80px;">
      <div style="display: flex; align-items: center; gap: 6px; color: var(--slate); font-size: 13.5px; font-weight: 600; cursor: pointer; margin-bottom: 18px;" onclick="go('explore')">
        <i data-lucide="arrow-left"></i> Back to Explore
      </div>

      <div style="border-radius: 20px; overflow: hidden; position: relative; height: 280px; margin-bottom: 24px;">
        <img src="${d.img}" alt="${d.city}" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: linear-gradient(0deg, rgba(19,42,70,0.85) 0%, rgba(19,42,70,0.05) 60%);"></div>
        <div style="position: absolute; left: 26px; right: 26px; bottom: 22px; color: #fff;">
          <h1 class="gt-display" style="font-size: 30px; font-weight: 700; margin: 0 0 4px;">${d.city}, ${d.country}</h1>
          <p style="font-size: 14.5px; opacity: 0.9; max-width: 520px; margin: 0;">${d.description}</p>
        </div>
      </div>

      <div class="gt-card" style="padding: 22px; margin-bottom: 28px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 18px;">
          <div>
            <div style="font-size: 12px; color: var(--slate-light); margin-bottom: 4px;">Best time to visit</div>
            <div style="font-weight: 700; font-size: 14.5px;">${d.bestTime}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--slate-light); margin-bottom: 4px;">Average daily budget</div>
            <div style="font-weight: 700; font-size: 14.5px;">${formatINR(d.dailyBudget)}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--slate-light); margin-bottom: 4px;">Recommended duration</div>
            <div style="font-weight: 700; font-size: 14.5px;">${d.recommendedDays[0]}–${d.recommendedDays[1]} days</div>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--slate-light); margin-bottom: 4px;">Estimated total cost</div>
            <div style="font-weight: 700; font-size: 14.5px;">${formatINR(midEstimate)}</div>
          </div>
        </div>
        <div style="margin-top: 18px; padding-top: 18px; border-top: 1px solid var(--line);">
          <div style="font-size: 12px; color: var(--slate-light); margin-bottom: 8px;">Popular activities</div>
          <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 14px;">
            ${d.activities.slice(0, 6).map((a) => `<span class="gt-tag">${a.name}</span>`).join('')}
          </div>
          <div style="font-size: 12px; color: var(--slate-light); margin-bottom: 8px;">Travel style</div>
          <div style="display: flex; flex-wrap: wrap; gap: 7px;">
            ${d.tripTypes.map((t) => `<span class="gt-tag" style="background: var(--cream); color: var(--navy); border: 1px solid var(--line);">${t}</span>`).join('')}
          </div>
        </div>
      </div>

      <h2 class="gt-display" style="font-size: 22px; font-weight: 700; margin: 0 0 18px;">Choose Your Itinerary</h2>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${itineraries.map((it) => `
          <div class="gt-card" style="padding: 22px;">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 10px;">
              <div>
                <h3 class="gt-display" style="font-size: 18px; font-weight: 700; margin: 0 0 4px;">${it.title}</h3>
                <p style="font-size: 13.5px; color: var(--slate); margin: 0;">${it.description}</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 12px; color: var(--slate-light);">Estimated</div>
                <div class="gt-display" style="font-size: 19px; font-weight: 700; color: var(--accent-dark);">${formatINR(it.estimatedBudget)}</div>
              </div>
            </div>

            ${expandedItineraryId !== it.id ? `
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 16px;">
                ${it.itinerary.slice(0, 3).map((day) => `<span class="gt-tag">Day ${day.day}: ${day.activities[0].name}</span>`).join('')}
                ${it.days > 3 ? `<span class="gt-tag">+${it.days - 3} more day${it.days - 3 !== 1 ? "s" : ""}</span>` : ''}
              </div>
              <button class="gt-btn gt-btn-primary gt-btn-sm" onclick="toggleItinerary('${it.id}')">
                Select This Itinerary <i data-lucide="chevron-down"></i>
              </button>
            ` : `
              <div style="margin-top: 16px;">
                ${renderItineraryDaysHTML(it.itinerary)}
                <div class="gt-card" style="padding: 20px; background: var(--cream); margin-top: 4px;">
                  <h4 class="gt-display" style="font-size: 15.5px; font-weight: 700; margin: 0 0 14px;">Estimated Trip Budget</h4>
                  ${renderBudgetBarsHTML(it.budgetBreakdown, it.estimatedBudget)}
                  <div style="display: flex; justify-content: space-between; font-size: 14.5px; font-weight: 700; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line);">
                    <span>Total</span><span>${formatINR(it.estimatedBudget)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--slate); margin-top: 4px;">
                    <span>Daily average</span><span>${formatINR(Math.round(it.estimatedBudget / it.days))}</span>
                  </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 16px;">
                  <button class="gt-btn gt-btn-ghost gt-btn-sm" onclick="toggleItinerary('${it.id}')">Collapse</button>
                  <button class="gt-btn gt-btn-primary" style="flex: 1;" onclick="openPlanModal('${it.id}')">
                    Plan This Trip <i data-lucide="arrow-right"></i>
                  </button>
                </div>
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  18. PLAN-THIS-TRIP MODAL                                           */
/* ------------------------------------------------------------------ */

function cloneItinerary(it) {
  return JSON.parse(JSON.stringify(it));
}

function openPlanModal(itineraryId) {
  const dest = selectedDestination;
  if (!dest) return;
  const template = buildItineraries(dest).find((i) => i.id === itineraryId);
  if (!template) return;

  planDraft = {
    destination: dest,
    itinerary: cloneItinerary(template),
    name: `${dest.city} Adventure`,
    start: "",
    travelers: 2,
    budget: template.estimatedBudget,
  };
  planModalOpen = true;
  confirmDelete = null;
  renderModal();
  lucide.createIcons();
}

function closePlanModal() {
  planModalOpen = false;
  planDraft = null;
  renderModal();
}

function recalcPlanDraftBudget() {
  const it = planDraft.itinerary;
  it.itinerary.forEach((day) => {
    day.dailyCost = day.activities.reduce((s, a) => s + a.cost, 0) + Math.round(planDraft.destination.dailyBudget * 0.7);
  });
  const activitiesTotal = it.itinerary.reduce((s, day) => s + day.activities.reduce((s2, a) => s2 + a.cost, 0), 0);
  it.budgetBreakdown.activities = activitiesTotal;
  it.estimatedBudget =
    it.budgetBreakdown.accommodation + it.budgetBreakdown.food + it.budgetBreakdown.transportation +
    activitiesTotal + it.budgetBreakdown.miscellaneous;
  planDraft.budget = it.estimatedBudget;
}

function removePlanActivity(dayIdx, actIdx) {
  const day = planDraft.itinerary.itinerary[dayIdx];
  if (day.activities.length <= 1) {
    notify("Each day needs at least one activity.", "error");
    return;
  }
  day.activities.splice(actIdx, 1);
  recalcPlanDraftBudget();
  renderModal();
  lucide.createIcons();
}

function addPlanActivity(dayIdx) {
  const dest = planDraft.destination;
  const day = planDraft.itinerary.itinerary[dayIdx];
  const usedNames = planDraft.itinerary.itinerary.flatMap((d) => d.activities.map((a) => a.name));
  const candidate = dest.activities.find((a) => !usedNames.includes(a.name)) || dest.activities[usedNames.length % dest.activities.length];
  day.activities.push({ time: "Extra", name: candidate.name, category: candidate.category, cost: candidate.cost, duration: candidate.duration });
  recalcPlanDraftBudget();
  renderModal();
  lucide.createIcons();
}

function renderPlanModalHTML() {
  const d = planDraft.destination;
  const it = planDraft.itinerary;
  return `
    <div class="gt-modal-bg" style="position: fixed; inset: 0; background: rgba(19,42,70,0.45); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 20px;" id="modal-bg">
      <div class="gt-modal-card gt-card" style="width: 560px; max-width: 100%; max-height: 88vh; overflow-y: auto; padding: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px;">
          <div>
            <h3 class="gt-display" style="font-size: 20px; font-weight: 700; margin: 0 0 4px;">Plan this trip</h3>
            <p style="font-size: 13.5px; color: var(--slate); margin: 0;">${it.title} · ${d.city}, ${d.country}</p>
          </div>
          <div style="cursor: pointer; padding: 4px;" onclick="closePlanModal()"><i data-lucide="x"></i></div>
        </div>

        <div style="margin-bottom: 14px;">
          <label class="gt-label">Trip name</label>
          <input class="gt-input" id="plan-trip-name" value="${planDraft.name}" placeholder="e.g. Japan in Bloom" />
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 14px;">
          <div style="flex: 1;">
            <label class="gt-label">Start date</label>
            <input class="gt-input" id="plan-trip-start" type="date" value="${planDraft.start}" />
          </div>
          <div style="flex: 1;">
            <label class="gt-label">Travelers</label>
            <input class="gt-input" id="plan-trip-travelers" type="number" min="1" value="${planDraft.travelers}" />
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label class="gt-label">Total budget</label>
          <input class="gt-input" id="plan-trip-budget" type="number" min="0" step="1000" value="${it.estimatedBudget}" />
        </div>

        <div style="border-top: 1px solid var(--line); padding-top: 16px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="gt-label" style="margin: 0;">Activities (${it.days} days)</span>
            <span style="font-size: 12.5px; color: var(--slate);">Estimated: ${formatINR(it.estimatedBudget)}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px; max-height: 260px; overflow-y: auto; padding-right: 4px;">
            ${it.itinerary.map((day, dayIdx) => `
              <div style="background: var(--cream); border-radius: 12px; padding: 12px;">
                <div style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Day ${day.day} <span style="color: var(--slate); font-weight: 500;">· ${formatINR(day.dailyCost)}</span></div>
                ${day.activities.map((a, actIdx) => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0;">
                    <span style="font-size: 13px;">${a.name} <span style="color: var(--slate-light); font-size: 11.5px;">(${a.time})</span></span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 12px; color: var(--slate);">${a.cost ? formatINR(a.cost) : "Free"}</span>
                      <i data-lucide="x" style="width: 15px; height: 15px; cursor: pointer; color: var(--danger);" onclick="removePlanActivity(${dayIdx}, ${actIdx})"></i>
                    </div>
                  </div>
                `).join('')}
                <div style="font-size: 12px; font-weight: 600; color: var(--accent-dark); cursor: pointer; margin-top: 6px;" onclick="addPlanActivity(${dayIdx})">
                  + Add activity
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="gt-btn gt-btn-ghost" style="flex: 1;" onclick="closePlanModal()">Cancel</button>
          <button class="gt-btn gt-btn-primary" style="flex: 2;" onclick="savePlanTrip()">
            Save trip <i data-lucide="check"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function savePlanTrip() {
  const name = document.getElementById("plan-trip-name").value.trim();
  const start = document.getElementById("plan-trip-start").value;
  const travelers = Math.max(1, parseInt(document.getElementById("plan-trip-travelers").value) || 1);
  const budget = Math.max(0, parseInt(document.getElementById("plan-trip-budget").value) || planDraft.itinerary.estimatedBudget);

  if (!name) { notify("Give your trip a name.", "error"); return; }
  if (!start) { notify("Pick a start date.", "error"); return; }

  const it = planDraft.itinerary;
  const days = it.days;
  const endDate = new Date(start);
  endDate.setDate(endDate.getDate() + days - 1);
  const end = endDate.toISOString().slice(0, 10);
  const activitiesCount = it.itinerary.reduce((s, day) => s + day.activities.length, 0);

  const newTrip = {
    id: "t" + Date.now(),
    name,
    city: planDraft.destination.city,
    country: planDraft.destination.country,
    img: planDraft.destination.img,
    start,
    end,
    stops: 1,
    travelers,
    budget,
    status: new Date(start) >= new Date() ? "planning" : "past",
    itinerary: it.itinerary,
    dailyBudget: Math.round(budget / days),
    activities: activitiesCount,
    budgetBreakdown: it.budgetBreakdown,
  };

  addTrip(newTrip);
  notify(`"${name}" saved to My Trips.`, "success");
  closePlanModal();
  go("my-trips");
}

/* ------------------------------------------------------------------ */
/*  TRIP DETAIL VIEW                                                   */
/* ------------------------------------------------------------------ */

const TIMELINE_ICONS = { Culture: "landmark", Food: "utensils", Nature: "trees", Adventure: "compass", Relaxation: "sparkles", Family: "users", Couple: "heart" };

function renderTripDetail() {
  const container = document.getElementById("trip-detail-page");
  const t = selectedTrip;

  if (!t) {
    container.innerHTML = `
      <div style="max-width: 640px; margin: 0 auto; padding: 80px 24px; text-align: center;">
        <div class="gt-card" style="padding: 44px 32px;">
          ${renderRouteMotif(220, 78)}
          <h1 class="gt-display" style="font-size: 24px; font-weight: 700; margin: 18px 0 8px;">No trip selected</h1>
          <button class="gt-btn gt-btn-primary" onclick="go('my-trips')">Back to My Trips</button>
        </div>
      </div>
    `;
    return;
  }

  const days = tripDurationDays(t);
  const activities = tripActivitiesCount(t);
  const dailyBudget = t.dailyBudget || Math.round(t.budget / days);
  const hasItinerary = Array.isArray(t.itinerary) && t.itinerary.length > 0;
  const breakdown = t.budgetBreakdown;

  container.innerHTML = `
    <div style="max-width: 860px; margin: 0 auto; padding: 24px 24px 80px;">
      <div style="display: flex; align-items: center; gap: 6px; color: var(--slate); font-size: 13.5px; font-weight: 600; cursor: pointer; margin-bottom: 18px;" onclick="go('my-trips')">
        <i data-lucide="arrow-left"></i> Back to My Trips
      </div>

      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 22px;">
        <div>
          <h1 class="gt-display" style="font-size: 27px; font-weight: 700; margin: 0 0 6px;">${t.name}</h1>
          <p style="color: var(--slate); font-size: 14.5px; margin: 0;">
            ${t.city ? `${t.city}${t.country ? ", " + t.country : ""}` : ""} · ${fmtRange(t.start, t.end)}
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="gt-btn gt-btn-ghost gt-btn-sm" onclick="editTrip('${t.id}')"><i data-lucide="pencil"></i> Edit</button>
          <button class="gt-btn gt-btn-danger-ghost gt-btn-sm" onclick="requestDeleteTrip('${t.id}')"><i data-lucide="trash-2"></i> Delete</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 28px;">
        ${[
          [`${days} Days`, "calendar-days"],
          [`${t.travelers || 1} Traveler${(t.travelers || 1) !== 1 ? "s" : ""}`, "users"],
          [`${activities} Activities`, "list-checks"],
          [`${formatINR(t.budget)} Budget`, "wallet"],
          [`${formatINR(dailyBudget)}/day`, "trending-up"],
        ].map(([label, icon]) => `
          <div class="gt-card" style="padding: 16px; text-align: center;">
            <i data-lucide="${icon}" style="color: var(--accent-dark); margin-bottom: 6px;"></i>
            <div class="gt-display" style="font-size: 14.5px; font-weight: 700;">${label}</div>
          </div>
        `).join('')}
      </div>

      ${hasItinerary ? `
        <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Daily Itinerary</h2>
        <div class="gt-timeline" style="margin-bottom: 32px;">
          ${t.itinerary.map((day) => `
            <div style="position: relative; margin-bottom: 26px;">
              <div class="gt-timeline-dot"></div>
              <h4 class="gt-display" style="font-size: 15.5px; font-weight: 700; margin: 0 0 12px;">Day ${day.day} — ${day.title}</h4>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px;">
                ${day.activities.map((a) => `
                  <div class="gt-card" style="padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <i data-lucide="${TIMELINE_ICONS[a.category] || "map-pin"}" style="color: var(--accent-dark); width: 17px; height: 17px;"></i>
                      <div>
                        <div style="font-size: 11px; font-weight: 700; color: var(--slate); text-transform: uppercase;">${a.time}</div>
                        <div style="font-size: 14px; font-weight: 600;">${a.name}</div>
                      </div>
                    </div>
                    <span style="font-size: 12.5px; color: var(--slate);">${a.cost ? formatINR(a.cost) : "Free"}</span>
                  </div>
                `).join('')}
              </div>
              <div style="font-size: 13px; font-weight: 700; color: var(--accent-dark);">Daily cost: ${formatINR(day.dailyCost)}</div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="gt-card" style="padding: 30px; text-align: center; color: var(--slate); margin-bottom: 28px;">
          No day-by-day itinerary yet for this trip.
        </div>
      `}

      ${breakdown ? `
        <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Budget Breakdown</h2>
        <div class="gt-card" style="padding: 22px;">
          ${renderBudgetBarsHTML(breakdown, t.budget)}
          <div style="display: flex; justify-content: space-between; font-size: 14.5px; font-weight: 700; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line);">
            <span>Total</span><span>${formatINR(t.budget)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--slate); margin-top: 4px;">
            <span>Daily average</span><span>${formatINR(dailyBudget)}</span>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  19. BUDGET PAGE                                                    */
/* ------------------------------------------------------------------ */

function renderBudget() {
  const container = document.getElementById("budget-page");

  const totalPlanned = trips.reduce((s, t) => s + (t.budget || 0), 0);
  const upcomingBudget = trips.filter((t) => t.status !== "past").reduce((s, t) => s + (t.budget || 0), 0);
  const pastBudget = trips.filter((t) => t.status === "past").reduce((s, t) => s + (t.budget || 0), 0);
  const totalDays = trips.reduce((s, t) => s + tripDurationDays(t), 0);
  const avgDaily = totalDays ? Math.round(totalPlanned / totalDays) : 0;

  container.innerHTML = `
    <div style="max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px;">
      <div style="margin-bottom: 28px;">
        <h1 class="gt-display" style="font-size: 28px; font-weight: 700; margin: 0 0 6px;">Travel Budget</h1>
        <p style="color: var(--slate); font-size: 15px;">Track and plan every rupee of your adventures.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 36px;">
        ${[
          ["Total Planned", formatINR(totalPlanned), "wallet", "var(--navy)"],
          ["Upcoming Budget", formatINR(upcomingBudget), "plane", "var(--accent-dark)"],
          ["Past Trips", formatINR(pastBudget), "check-circle-2", "var(--success)"],
          ["Average Daily Cost", formatINR(avgDaily), "trending-up", "var(--slate)"],
        ].map(([label, val, icon, color]) => `
          <div class="gt-card" style="padding: 20px;">
            <div style="width: 36px; height: 36px; border-radius: 10px; background: var(--accent-soft); display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
              <i data-lucide="${icon}" style="color: ${color};"></i>
            </div>
            <div style="font-size: 12px; color: var(--slate); margin-bottom: 4px;">${label}</div>
            <div class="gt-display" style="font-size: 19px; font-weight: 700;">${val}</div>
          </div>
        `).join('')}
      </div>

      <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Budget by Trip</h2>
      ${trips.length === 0 ? `
        <div class="gt-card" style="padding: 30px; text-align: center; color: var(--slate); margin-bottom: 36px;">
          No trips yet — plan one from Explore to see its budget here.
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; margin-bottom: 40px;">
          ${trips.map((t) => `
            <div class="gt-card" style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <h4 class="gt-display" style="font-size: 15.5px; font-weight: 700; margin: 0;">${t.name}</h4>
                <span style="font-size: 13px; font-weight: 700; color: var(--accent-dark);">${formatINR(t.budget)}</span>
              </div>
              <p style="font-size: 12px; color: var(--slate-light); margin: 0 0 12px;">${t.city ? `${t.city}, ${t.country}` : ""}</p>
              ${t.budgetBreakdown ? renderBudgetBarsHTML(t.budgetBreakdown, t.budget) : `<p style="font-size: 13px; color: var(--slate);">No breakdown available.</p>`}
            </div>
          `).join('')}
        </div>
      `}

      <h2 class="gt-display" style="font-size: 19px; font-weight: 700; margin: 0 0 16px;">Budget Calculator</h2>
      <div class="gt-card" style="padding: 24px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div>
            <label class="gt-label">Destination</label>
            <select id="calc-destination" class="gt-input">
              <option value="">Custom / none</option>
              ${EXPLORE_DESTINATIONS.map((d) => `<option value="${d.id}" ${budgetCalc.destination === d.id ? "selected" : ""}>${d.city}, ${d.country}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="gt-label">Travelers</label>
            <input class="gt-input" id="calc-travelers" type="number" min="1" value="${budgetCalc.travelers}" />
          </div>
          <div>
            <label class="gt-label">Number of days</label>
            <input class="gt-input" id="calc-days" type="number" min="1" value="${budgetCalc.days}" />
          </div>
          <div>
            <label class="gt-label">Accommodation budget</label>
            <input class="gt-input" id="calc-accommodation" type="number" min="0" step="500" value="${budgetCalc.accommodation}" />
          </div>
          <div>
            <label class="gt-label">Food budget / day</label>
            <input class="gt-input" id="calc-food" type="number" min="0" step="100" value="${budgetCalc.foodPerDay}" />
          </div>
          <div>
            <label class="gt-label">Transportation</label>
            <input class="gt-input" id="calc-transport" type="number" min="0" step="500" value="${budgetCalc.transportation}" />
          </div>
          <div>
            <label class="gt-label">Activities / day</label>
            <input class="gt-input" id="calc-activities" type="number" min="0" step="100" value="${budgetCalc.activitiesPerDay}" />
          </div>
          <div>
            <label class="gt-label">Miscellaneous</label>
            <input class="gt-input" id="calc-misc" type="number" min="0" step="100" value="${budgetCalc.misc}" />
          </div>
          <div>
            <label class="gt-label">Your planned budget (optional)</label>
            <input class="gt-input" id="calc-limit" type="number" min="0" step="1000" value="${budgetCalc.limit}" />
          </div>
        </div>
        <div id="calc-results"></div>
      </div>
    </div>
  `;

  document.getElementById("calc-destination")?.addEventListener("change", (e) => {
    budgetCalc.destination = e.target.value;
    const dest = EXPLORE_DESTINATIONS.find((d) => d.id === e.target.value);
    if (dest) {
      budgetCalc.accommodation = Math.round(dest.dailyBudget * 0.45 * budgetCalc.days);
      budgetCalc.foodPerDay = Math.round(dest.dailyBudget * 0.3);
      budgetCalc.transportation = Math.round(dest.startingBudget * 0.3);
      budgetCalc.activitiesPerDay = Math.round(dest.dailyBudget * 0.2);
    }
    renderBudget();
    lucide.createIcons();
  });

  ["travelers", "days", "accommodation", "food", "transport", "activities", "misc", "limit"].forEach((field) => {
    document.getElementById(`calc-${field}`)?.addEventListener("input", updateBudgetCalcField);
  });

  renderBudgetCalcResults();
}

function updateBudgetCalcField() {
  budgetCalc.travelers = Math.max(1, parseInt(document.getElementById("calc-travelers").value) || 1);
  budgetCalc.days = Math.max(1, parseInt(document.getElementById("calc-days").value) || 1);
  budgetCalc.accommodation = Math.max(0, parseInt(document.getElementById("calc-accommodation").value) || 0);
  budgetCalc.foodPerDay = Math.max(0, parseInt(document.getElementById("calc-food").value) || 0);
  budgetCalc.transportation = Math.max(0, parseInt(document.getElementById("calc-transport").value) || 0);
  budgetCalc.activitiesPerDay = Math.max(0, parseInt(document.getElementById("calc-activities").value) || 0);
  budgetCalc.misc = Math.max(0, parseInt(document.getElementById("calc-misc").value) || 0);
  budgetCalc.limit = Math.max(0, parseInt(document.getElementById("calc-limit").value) || 0);
  renderBudgetCalcResults();
}

function renderBudgetCalcResults() {
  const results = document.getElementById("calc-results");
  if (!results) return;
  const { travelers, days, accommodation, foodPerDay, transportation, activitiesPerDay, misc, limit } = budgetCalc;

  const total = accommodation + (foodPerDay * days * travelers) + transportation + (activitiesPerDay * days * travelers) + misc;
  const perPerson = Math.round(total / travelers);
  const perDay = Math.round(total / days);
  const overBudget = limit > 0 && total > limit;

  results.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; padding-top: 16px; border-top: 1px solid var(--line);">
      <div>
        <div style="font-size: 12px; color: var(--slate);">Total estimated cost</div>
        <div class="gt-display" style="font-size: 22px; font-weight: 700; color: var(--navy);">${formatINR(total)}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--slate);">Cost per person</div>
        <div class="gt-display" style="font-size: 22px; font-weight: 700;">${formatINR(perPerson)}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--slate);">Cost per day</div>
        <div class="gt-display" style="font-size: 22px; font-weight: 700;">${formatINR(perDay)}</div>
      </div>
    </div>
    ${overBudget ? `
      <div style="display: flex; gap: 10px; align-items: flex-start; background: var(--danger-soft); border-radius: 12px; padding: 14px 16px; margin-top: 18px;">
        <i data-lucide="alert-triangle" style="color: var(--danger); flex-shrink: 0; margin-top: 1px;"></i>
        <div>
          <div style="font-size: 13.5px; font-weight: 700; color: var(--danger);">You're ${formatINR(total - limit)} over your planned budget.</div>
          <ul style="margin: 8px 0 0; padding-left: 18px; font-size: 13px; color: var(--slate);">
            <li>Reduce accommodation</li>
            <li>Remove expensive activities</li>
            <li>Choose public transportation</li>
            <li>Reduce trip duration</li>
          </ul>
        </div>
      </div>
    ` : limit > 0 ? `
      <div style="display: flex; gap: 10px; align-items: center; background: var(--success-soft); border-radius: 12px; padding: 14px 16px; margin-top: 18px;">
        <i data-lucide="check-circle-2" style="color: var(--success);"></i>
        <div style="font-size: 13.5px; font-weight: 700; color: var(--success);">You're within budget by ${formatINR(limit - total)}.</div>
      </div>
    ` : ''}
  `;
  lucide.createIcons();
}

/* ------------------------------------------------------------------ */
/*  INITIAL APP LAUNCH                                                 */
/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});
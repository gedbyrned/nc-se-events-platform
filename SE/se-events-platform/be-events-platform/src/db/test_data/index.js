
const usersData = [
  {
    username: "john_doe",
    password: "securepassword123",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    user_type: "user", // User role
  },
  {
    username: "jane_smith",
    password: "password456",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com",
    user_type: "staff", // Staff role
  }
];

const eventsData = [
  {
    event_name: "Community Sports Day",
    description: "A fun day of sports and activities for the whole family!",
    location: "Hyde Park, London",
    date: "2025-03-10",
    created_by: 1, // Created by the first user
  },
  {
    event_name: "Art Exhibition",
    description: "A showcase of local artists and their works.",
    location: "Tate Modern, London",
    date: "2025-03-15",
    created_by: 2, // Created by the second user
  },
  {
    event_name: "Food Festival",
    description: "Taste cuisines from around the world at our food festival.",
    location: "Victoria Square, Birmingham",
    date: "2025-04-05",
    created_by: 1,
  },
  {
    event_name: "Tech Conference",
    description: "A gathering for tech enthusiasts and professionals.",
    location: "Manchester Central, Manchester",
    date: "2025-05-20",
    created_by: 2,
  },
  {
    event_name: "Music Concert",
    description: "A live performance by top UK artists.",
    location: "O2 Arena, London",
    date: "2025-06-15",
    created_by: 1,
  },
  {
    event_name: "Charity Run",
    description: "Join us for a run to raise money for a good cause.",
    location: "The Meadows, Edinburgh",
    date: "2025-07-10",
    created_by: 2,
  },
  {
    event_name: "Book Fair",
    description: "Discover books from local and international authors.",
    location: "City Hall, Cardiff",
    date: "2025-08-25",
    created_by: 1,
  },
  {
    event_name: "Science Fair",
    description: "Explore fascinating science exhibits and experiments.",
    location: "National Science Centre, Leicester",
    date: "2025-09-12",
    created_by: 2,
  },
  {
    event_name: "Film Festival",
    description: "Watch award-winning films from around the globe.",
    location: "Everyman Cinema, Liverpool",
    date: "2025-10-18",
    created_by: 1,
  },
  {
    event_name: "Christmas Market",
    description: "Shop for festive gifts and enjoy seasonal treats.",
    location: "Albert Square, Manchester",
    date: "2025-12-10",
    created_by: 2,
  },
];

const signupsData = [
  { event_id: 1, user_id: 2 },
  { event_id: 1, user_id: 1 },
];

const userTypesData = [
  { type: 'user' },
  { type: 'staff' },
];


const devData = {
  usersData,
  userTypesData,
  eventsData,
  signupsData,
};

module.exports = { devData };

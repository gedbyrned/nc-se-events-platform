
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
    start_time: "2025-03-10T09:00:00",
    end_time: "2025-03-10T17:00:00",
    time_zone: "Europe/London",
    created_by: 1,
  },
  {
    event_name: "Art Exhibition",
    description: "A showcase of local artists and their works.",
    location: "Tate Modern, London",
    start_time: "2025-03-15T10:00:00",
    end_time: "2025-03-15T18:00:00",
    time_zone: "Europe/London",
    created_by: 2,
  },
  {
    event_name: "Food Festival",
    description: "Taste cuisines from around the world at our food festival.",
    location: "Victoria Square, Birmingham",
    start_time: "2025-04-05T11:00:00",
    end_time: "2025-04-05T20:00:00",
    time_zone: "Europe/London",
    created_by: 1,
  },
  {
    event_name: "Tech Conference",
    description: "A gathering for tech enthusiasts and professionals.",
    location: "Manchester Central, Manchester",
    start_time: "2025-05-20T09:00:00",
    end_time: "2025-05-20T17:00:00",
    time_zone: "Europe/London",
    created_by: 2,
  },
  {
    event_name: "Music Concert",
    description: "A live performance by top UK artists.",
    location: "O2 Arena, London",
    start_time: "2025-06-15T18:00:00",
    end_time: "2025-06-15T22:00:00",
    time_zone: "Europe/London",
    created_by: 1,
  },
  {
    event_name: "Charity Run",
    description: "Join us for a run to raise money for a good cause.",
    location: "The Meadows, Edinburgh",
    start_time: "2025-07-10T08:00:00",
    end_time: "2025-07-10T12:00:00",
    time_zone: "Europe/London",
    created_by: 2,
  },
  {
    event_name: "Book Fair",
    description: "Discover books from local and international authors.",
    location: "City Hall, Cardiff",
    start_time: "2025-08-25T10:00:00",
    end_time: "2025-08-25T17:00:00",
    time_zone: "Europe/London",
    created_by: 1,
  },
  {
    event_name: "Science Fair",
    description: "Explore fascinating science exhibits and experiments.",
    location: "National Science Centre, Leicester",
    start_time: "2025-09-12T09:00:00",
    end_time: "2025-09-12T16:00:00",
    time_zone: "Europe/London",
    created_by: 2,
  },
  {
    event_name: "Film Festival",
    description: "Watch award-winning films from around the globe.",
    location: "Everyman Cinema, Liverpool",
    start_time: "2025-10-18T15:00:00",
    end_time: "2025-10-18T23:00:00",
    time_zone: "Europe/London",
    created_by: 1,
  },
  {
    event_name: "Christmas Market",
    description: "Shop for festive gifts and enjoy seasonal treats.",
    location: "Albert Square, Manchester",
    start_time: "2025-12-10T10:00:00",
    end_time: "2025-12-10T20:00:00",
    time_zone: "Europe/London",
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

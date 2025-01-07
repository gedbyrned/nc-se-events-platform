import { userTypesData } from './userTypes';
import { usersData } from './users';
import { categoriesData } from './categories';
import { locationsData } from './locations';
import { availabilityData } from './availability';
import { bookingsData } from './bookings';
import { messagesData } from './messages';
import { userMediaData } from './userMedia';

// Create the eventsData manually to match the expected schema
const eventsData = [
  {
    event_name: "Community Sports Day",
    description: "A fun day of sports and activities for the whole family!",
    location: "Central Park, New York",
    start_time: "2025-03-10T10:00:00Z", // ISO string format
    end_time: "2025-03-10T16:00:00Z", // ISO string format
    created_by: 2, // This should match a valid staff user ID from usersData
  },
  {
    event_name: "Art Exhibition",
    description: "A showcase of local artists and their works.",
    location: "Gallery 54, San Francisco",
    start_time: "2025-04-01T18:00:00Z",
    end_time: "2025-04-01T21:00:00Z",
    created_by: 4, // This should match a valid staff user ID from usersData
  },
  // Add more events here
];

// Create the attendeesData manually to match the expected schema
const attendeesData = [
  { event_id: 1, user_id: 1 }, // Link event with ID 1 to user with ID 1
  { event_id: 1, user_id: 2 }, // Link event with ID 1 to user with ID 2
  { event_id: 2, user_id: 3 }, // Link event with ID 2 to user with ID 3
  // Add more attendee links here
];

// Now we can create the devData object that matches SeedData interface
const devData = {
  usersData,
  eventsData,  // Correct assignment
  attendeesData,  // Correct assignment
};

export { devData };

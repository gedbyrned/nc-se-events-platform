import { usersData } from './users';
// Create the eventsData manually to match the expected schema
const eventsData = [
    {
        event_name: "Community Sports Day",
        description: "A fun day of sports and activities for the whole family!",
        location: "Central Park, New York",
        date: "2025-03-10",
        created_by: 2,
    },
    {
        event_name: "Art Exhibition",
        description: "A showcase of local artists and their works.",
        location: "Gallery 54, San Francisco",
        date: "2025-03-10",
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
    eventsData, // Correct assignment
    attendeesData, // Correct assignment
};
export { devData };

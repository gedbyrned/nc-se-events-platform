import { devData } from './test_data/index'; // Import devData directly
import seed from './seed';
import db from './connection';
const runSeed = async () => {
    try {
        // Run the seed function and pass the development data
        await seed(devData); // Pass devData directly
        console.log('Database seeding complete.');
    }
    catch (error) {
        console.error('Error running seed:', error);
    }
    finally {
        // Close the database connection after seeding
        await db.end();
    }
};
// Run the seeding process
runSeed();

const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')

afterAll(() => {
    return db.end();
})

beforeEach(() => {
    return seed(data)
})
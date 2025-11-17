# REST API Jokes Challenge

REST API built with Node.js, Express and TypeScript that provides jokes from external APIs, mathematical operations, and joke management with PostgreSQL.

## Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL
- Jest
- Axios
- Winston

## Prerequisites

- Node.js 18+
- Docker (for PostgreSQL)
- npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/martinalturria/rest-api-jokes-challenge.git
cd rest-api-jokes-challenge
```

2. Install dependencies:
```bash
npm install
```

3. Start PostgreSQL with Docker:
```bash
docker-compose up -d
```

4. Start the application:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## Development

Run in development mode with hot reload:
```bash
npm run dev
```

## Testing

Run tests:
```bash
npm test
```

## API Endpoints

### Jokes Endpoints

#### GET /chistes
Get a random joke from both APIs

#### GET /chistes/:type
Get a joke from a specific API
- `type`: `Chuck` or `Dad`
- Returns 404 if type is invalid

Example:
```bash
curl http://localhost:3000/chistes/Chuck
```

#### POST /chistes
Save a new joke to the database

Body:
```json
{
  "text": "Your joke here",
  "userId": 1,
  "categoryId": 1
}
```

Example:
```bash
curl -X POST http://localhost:3000/chistes \
  -H "Content-Type: application/json" \
  -d '{"text":"Why did the chicken cross the road?","userId":1,"categoryId":1}'
```

#### PUT /chistes/:number
Update an existing joke

Body:
```json
{
  "text": "Updated joke text"
}
```

Example:
```bash
curl -X PUT http://localhost:3000/chistes/1 \
  -H "Content-Type: application/json" \
  -d '{"text":"Updated joke"}'
```

#### DELETE /chistes/:number
Delete a joke by ID

Example:
```bash
curl -X DELETE http://localhost:3000/chistes/1
```

#### GET /chistes/emparejados
Get 5 paired jokes from Chuck Norris and Dad Jokes APIs

Response:
```json
[
  {
    "chuck": "Chuck Norris counted to infinity. Twice.",
    "dad": "Why did the math book look sad? Because it had too many problems.",
    "combinado": "Chuck Norris counted to infinity. Also, the math book had too many problems."
  }
]
```

Example:
```bash
curl http://localhost:3000/chistes/emparejados
```

### Math Endpoints

#### GET /matematico/mcm?numbers=12,18,24
Calculate the Least Common Multiple

Query params:
- `numbers`: Comma-separated list of integers

Example:
```bash
curl "http://localhost:3000/matematico/mcm?numbers=12,18,24"
```

Response:
```json
{
  "numbers": [12, 18, 24],
  "lcm": 72
}
```

#### GET /matematico/increment?number=5
Increment a number by 1

Query params:
- `number`: Integer to increment

Example:
```bash
curl "http://localhost:3000/matematico/increment?number=5"
```

Response:
```json
{
  "original": 5,
  "result": 6
}
```

## Database

PostgreSQL with pre-populated data:
- Users: Manolito, Pepe, Isabel, Pedro
- Categories: humor negro, humor amarillo, chistes verdes
- 3 jokes per user per category (36 total)

### SQL Queries

Get all jokes by Manolito:
```sql
SELECT * FROM jokes j
JOIN users u ON j.user_id = u.id
WHERE u.name = 'Manolito';
```

Get all "humor negro" jokes:
```sql
SELECT * FROM jokes j
JOIN categories c ON j.category_id = c.id
WHERE c.name = 'humor negro';
```

Get "humor negro" jokes by Manolito:
```sql
SELECT * FROM jokes j
JOIN users u ON j.user_id = u.id
JOIN categories c ON j.category_id = c.id
WHERE u.name = 'Manolito' AND c.name = 'humor negro';
```

## Project Structure

```
src/
├── controllers/     API endpoint handlers
├── services/        Business logic
├── models/          Database models
├── routes/          Route definitions
├── config/          Configuration
└── index.ts         Entry point

tests/               Unit tests
database/            SQL initialization scripts
```

## External APIs

- https://api.chucknorris.io
- https://icanhazdadjoke.com/api

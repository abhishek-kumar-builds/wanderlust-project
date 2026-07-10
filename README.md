# Wanderlust

An Airbnb-style vacation rental platform built with Node.js, Express, MongoDB, and EJS.

## Features

- Browse and search vacation rental listings
- Filter listings by category (Mountains, Castles, Pools, and more)
- User authentication (signup, login, logout)
- Create, edit, and delete your own listings
- Upload listing images via Cloudinary
- Leave star-rated reviews on listings
- Responsive Bootstrap UI with tax toggle display

## Tech Stack

- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose
- **Auth:** Passport.js (local strategy)
- **Views:** EJS with ejs-mate layouts
- **Validation:** Joi
- **File Uploads:** Multer + Cloudinary

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment file and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `ATLAS_URL` | MongoDB connection string |
| `SECRET` | Session secret key |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |

3. (Optional) Seed sample listings:

```bash
npm run seed
```

4. Start the server:

```bash
npm start
```

Visit [http://localhost:8080](http://localhost:8080)

## Project Structure

```
├── app.js              # Express app entry point
├── controller/         # Route handlers
├── models/             # Mongoose schemas
├── routes/             # Express routes
├── views/              # EJS templates
├── middleware.js       # Auth & validation middleware
├── cloudConfig.js      # Cloudinary configuration
└── init/               # Database seed script
```

## License

ISC

# Next Icons Website

Welcome to the client-side repository for [NextIcons.com](https://www.nexticons.com). This project is built on a modern stack using **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 18 or later)
- **npm**, **yarn**, or **pnpm** (npm recommended, based on lock files)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/client.git
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

## Configuration

The project requires environment variables configuration.

1. Create a `.env` file in the root directory (you can copy `.example.env`):

    ```bash
    cp .example.env .env
    ```

2. Open `.env` and fill in the necessary values:

    ```env
    EMAIL_AUTH_USER="your-email@example.com"
    EMAIL_AUTH_PASS="your-password"

    CAPTCHA_SECRET="your-captcha-secret"
    ```

## Usage

To run the development server, use the following command:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Build and Production

To create an optimized production build:

```bash
npm run build
```

To start the production version:

```bash
npm start
```

_Note: The production server runs on port 8257 by default (as per `package.json`)._

## Technologies Used

- **[Next.js](https://nextjs.org/)** - The React Framework for Production
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Motion library for React
- **Nodemailer** - Email sending
- **ESLint & Prettier** - Code linting and formatting

## License

This project is licensed under the **[MIT](./LICENSE)** License.

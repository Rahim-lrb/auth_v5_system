# Auth System

![Auth System](https://your-image-url.com)

## Overview

This project is an advanced authentication system built with Next.js and NextAuth. It includes features such as Google and GitHub registration, password recovery, login, two-factor authentication (2FA), email verification, and an admin panel. The backend uses Prisma with a Neon database, and the frontend is styled with Shadcn and managed with React Hook Form.

### Live Demo

Check out the live demo [here](https://auth-v5-system.vercel.app/).

## Features

- **Social Authentication**: Login and register using Google and GitHub.
- **Password Recovery**: Secure password recovery system.
- **Two-Factor Authentication**: Enhanced security with 2FA.
- **Email Verification**: Verify user emails during registration.
- **Admin Panel**: Manage users and system settings.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **NextAuth**: Authentication for Next.js applications.
- **Prisma**: ORM for database management.
- **Neon**: PostgreSQL database service.
- **Shadcn**: Component library for styling.
- **React Hook Form**: Form management library.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/auth-system.git
    cd auth-system
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add your environment variables:

    ```plaintext
    DATABASE_URL=your-database-url
    NEXTAUTH_URL=your-nextauth-url
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    GITHUB_CLIENT_ID=your-github-client-id
    GITHUB_CLIENT_SECRET=your-github-client-secret
    EMAIL_SERVER=your-email-server
    EMAIL_FROM=your-email-from
    ```

4. Migrate the database:

    ```bash
    npx prisma migrate deploy
    ```

### Running the Application

```bash
npm run dev
# or
yarn dev

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables Setup

To run this project, you need to set up several environment variables. Follow these steps:

1. Copy the `.env.example` file and rename it to `.env`
2. Fill in your actual values for each variable in the `.env` file
3. Make sure never to commit your actual `.env` file to version control

### Required Environment Variables

- `DATABASE_URL`: Your PostgreSQL database connection string
- `NEXTAUTH_SECRET`: A secret key for NextAuth.js (you can generate one using `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your application's base URL (in development, typically `http://localhost:3000`)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Obtained from Google Cloud Console
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`: For image upload functionality

### Optional Environment Variables

- Email configuration variables are only needed if you plan to use email features in your application

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

public = /assets, /images/big

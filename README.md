# Crumbl Craver

Crumbl Craver is a web application designed for cookie enthusiasts. It offers an easy way to track and explore the latest cookie flavors from Crumbl Cookie. Built with Next.js and Supabase, the app provides real-time updates, user interaction, and a rich, responsive user interface.

![Screenshot 2024-01-20 at 23-13-34 Crumbl Craver](https://github.com/nick-neely/crumbl-craver/assets/49537823/a8720e61-ffb9-4266-9196-691ea9b635c8)

## Features

- **Real-Time Flavor Updates:** Stay informed about the latest Crumbl Cookie flavors as soon as they're available.
- **User Ratings and Reviews:** Rate and review your favorite flavors, and see what others think.
- **Personalized Notifications:** Receive notifications for new flavors and when your favorites are back.
- **Flavor Tracking:** Mark flavors as favorites and keep a history of flavors you've enjoyed.
- **User Authentication:** Secure sign-up and login functionality.
- **Responsive Design:** A seamless experience on both desktop and mobile devices.

## Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Backend:** Supabase (for authentication, database, storage and real-time updates)
- **Deployment:** Vercel

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 12.0 or higher
- npm (comes with Node.js), pnpm or Yarn
- A Supabase account and project for database and authentication services
- A configured environment file (.env.local) with your Supabase credentials

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository:**

```
git clone https://github.com/yourusername/crumbl-craver.git
cd crumbl-craver
```

2. **Install Dependencies:**

```
pnpm install
```

3. **Set Environment Variables:**
Create a `.env.local` file at the root of the project and add the necessary Supabase credentials.

4. **Run the Development Server:**
```
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

After installation, you can start using the app to explore various Crumbl Cookie flavors, rate them, and receive updates. Register for an account to access personalized features.

## Code Structure

Below is an overview of the important files and directories in the Crumbl Craver project:

- `.next/` - Generated automatically by Next.js during the build. It contains the output files.
- `app/` - Contains the core functionality of the application.
  - `api/` - Houses the backend API routes.
    - `auth/` - Contains authentication-related API endpoints.
      - `callback/` - Handles the authentication callback.
        - `route.ts` - The server-side logic for authentication callbacks.
  - `login/` - Manages the login view.
    - `page.tsx` - The React component for the login page.
- `components/` - React components used across the application.
- `utils/` - Utility functions and helpers, including Supabase client initializations.
  - `supabase/` - Supabase-related configurations and utilities.
    - `client.ts` - Initializes and exports the Supabase client.
    - `middleware.ts` - Middleware for handling authentication and other server-side logic.
    - `server.ts` - Server-side utilities for Supabase interaction.
- `.env.local` - Environment variables for local development, including Supabase credentials (not tracked by Git).
- `middleware.ts` - Global middleware for Next.js.

## FAQ

**Q: How do I sign up for notifications about new Crumbl Cookie flavors?**

A: Once you create an account and log in, go to your profile settings and opt-in for notifications. You can choose to receive updates via email or SMS.

**Q: Is the Crumbl Craver app affiliated with the official Crumbl Cookies company?**

A: No, Crumbl Craver is a fan-made project and is not officially affiliated with Crumbl Cookies. It is designed to enhance the experience for cookie enthusiasts.

**Q: Can I contribute to the development of Crumbl Craver?**

A: Yes, contributions are welcome! Please refer to the Contributing section of this document for guidelines on how to contribute.

**Q: What should I do if I encounter an issue with the app?**

A: If you run into any problems, please open an issue in the GitHub repository with a detailed description of the problem and steps to reproduce it. We appreciate your feedback and will address the issue as promptly as possible.

**Q: How secure is my personal information within the app?**

A: Protecting your privacy is our top priority. We follow best practices for data security and comply with all relevant privacy laws to ensure your information is kept secure.

**Q: Are there any costs associated with using Crumbl Craver?**

A: Crumbl Craver is completely free to use. There are no hidden charges for accessing and using the app's features.

**Q: Where can I find the terms of service and privacy policy?**

A: The terms of service and privacy policy are accessible from the app's login page. We recommend reading them before creating an account.

**Q: Who can I contact for more support?**

A: For additional support, please email our support team at support@crumblcraver.com, and we'll be happy to assist you.


## Contributing

Contributions to the Crumbl Craver project are welcome. Please read our contributing guidelines before submitting your contributions or opening a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Crumbl Craver is not affiliated with Crumbl Cookies but is a fan-made project to enhance the cookie-tasting experience.

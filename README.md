# Crumbl Craver

Crumbl Craver is a web application designed for cookie enthusiasts. It offers an easy way to track and explore the latest cookie flavors from Crumbl Cookie. Built with Next.js and Supabase, the app provides real-time updates, user interaction, and a rich, responsive user interface.

![image](https://github.com/nick-neely/crumbl-craver/assets/49537823/b5e47c60-acd9-496e-bd50-b28645050bbb)

## Features

- **Real-Time Flavor Updates:** Stay informed about the latest Crumbl Cookie flavors as soon as they're available.
- **User Authentication:** Secure sign-up and login functionality.
- **Responsive Design:** A seamless experience on both desktop and mobile devices.

![image](https://github.com/nick-neely/crumbl-craver/assets/49537823/c51d585c-6f17-470e-a476-81a90789e74d)

## Upcoming
- **User Ratings and Reviews:** Rate and review your favorite flavors, and see what others think.
- **Personalized Notifications:** Receive notifications for new flavors and when your favorites are back.
- **Flavor Tracking:** Mark flavors as favorites and keep a history of flavors you've enjoyed.

## Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui, Zustand, SWR
- **Backend:** Supabase (for authentication, database, storage and real-time updates), Upstash Redis
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
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

After installation, you can start using the app to explore various Crumbl Cookie flavors, rate them, and receive updates. Register for an account to access personalized features.

## Code Structure

Below is an overview of the important files and directories in the Crumbl Craver project:

- `app/` - Contains the core functionality of the application.
  - `auth/` - Authentication route group.
    - `login/` - Handles user login route.
    - `signup/` - Manages user signup route.
  - `actions/` - Holds Server Actions used by Next.js.
  - `api/` - Houses the backend API routes.
    - `getCookies/` - Endpoint for retrieving cookie data.
    - `updateCookies/` - Endpoint for updating cookie data.
  - `dashboard/` - Related to the user dashboard interface.
  - `public/` - Publicly accessible files, such as images and static assets.
  - `state/` - Manages global state management.
    - `authStore.ts` - State management.
- `components/` - React components used across the application.
- `config/` - Configuration files for the project setup.
- `lib/` - Library code that can be imported and used in different parts of the application.
- `static/styles/` - Static files for styling the application.
- `tmp/` - Temporary files generated during development or by the build process.
- `utils/` - Utility functions and helpers.
  - `supabase/` - Supabase-related configurations and utilities.
    - `fetchCrumblCookies.ts` - Function for fetching cookies from Supabase.

Additional files:
- `app/page.tsx` - The main page component for the application.
- `app/layout.tsx` - The layout component used in the application.

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

A: Crumbl Craver is currently completely free to use. There are no hidden charges for accessing and using the app's features.

**Q: Who can I contact for more support?**

A: For additional support, please email our support team at support@crumblcraver.com, and we'll be happy to assist you.

## Contributing

Contributions to the Crumbl Craver project are welcome. Please read our contributing guidelines before submitting your contributions or opening a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Crumbl Craver is not affiliated with Crumbl Cookies but is a fan-made project to enhance the cookie-tasting experience.

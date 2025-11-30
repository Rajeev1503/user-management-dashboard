# User Management Dashboard

![Preview](https://raw.githubusercontent.com/rajeev1503/user-management-dashboard/master/public/preview.png)
This is a simple dashboard built with **Next.js 15** and **React 19**.

## 📂 Structure

I organized the code by features to keep it clean:

- **`src/app`**: Uses the Next.js App Router.
- **`src/components/features`**: Components for specific features like `UsersTable`.
- **`src/store`**: Global state using Zustand.
- **`src/hooks`**: Custom hooks like `useUsersQuery`.

## 🛠️ Tech Choices

I used two libraries for state management to keep things organized:

1.  **React Query**: I used this for fetching data from the server. It handles loading states and caching automatically, which is much better than writing `useEffect` everywhere.
2.  **Zustand**: I used this for client-side state like filters, sorting, and the theme toggle. It's really simple and lightweight compared to Redux.

**Why both?**
Separating "server state" (data) from "client state" (UI) makes the app feel faster and easier to debug.

## � Other Cool Libraries

Here are some other libraries I used to make this work:

- **shadcn/ui + Tailwind CSS**: For making it look good without writing a ton of CSS.
- **Recharts**: For the charts on the analytics page.
- **React Hook Form + Zod**: For handling forms and making sure the data is correct.
- **Lucide React**: For the icons.
- **date-fns**: For formatting dates easily.

## �🚀 How to Run

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Run the dev server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to see it!

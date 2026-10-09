# RENTGRID

RENTGRID is a polished rental-equipment storefront and admin mockup built in React + Vite. It works immediately without any API key in local demo mode, and it is structured to port cleanly to Supabase when you want a live backend.

## Features

- No-key local auth fallback
- Show/hide password control
- Browse products and rental catalog
- Cart and checkout flow
- Order confirmation and tracking screens
- Admin dashboard and inventory/order views
- Supabase-ready auth configuration

## Run locally

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Then open:

- Website: http://localhost:5173

## Demo logins

- **Admin Account**:
  - Email: `admin@rentgrid.com`
  - Password: `rentgrid`
  - Sign-in page: same website sign-in form as customers
  - Access: Full-Stack Admin Console (KPIs, Order Lifecycle, Live Inventory CRUD, Inquiries Inbox)

- **Customer Account**:
  - Email: `demo@rentgrid.com`
  - Password: `rentgrid`
  - Access: Marketplace storefront, Cart, Checkout, Order tracking

Use the same sign-in form for either account. The admin email and password open the admin dashboard; customer credentials open the marketplace.

## Full-Stack Architecture

- **Development**: `npm run dev` (Runs Vite with integrated `/api` Express REST API middleware)
- **Standalone Production Server**: `npm run server` or `npm start` (Runs Node/Express server on port 5000)
- **REST Endpoints**:
  - `GET /api/admin/metrics` - Live KPIs (revenue, active rentals, low stock, pending returns)
  - `GET /api/orders`, `PATCH /api/orders/:id/status`, and `POST /api/orders/:id/refund-request` - Order lifecycle, return restock, and customer refund requests for review
  - `GET /api/products` & `POST /api/products` & `PUT /api/products/:id` & `DELETE /api/products/:id` - Inventory CRUD
  - `PATCH /api/products/:id/stock` - Real-time stock increments/decrements
  - `GET /api/inquiries` & `PATCH /api/inquiries/:id/status` - Customer contact messages inbox
  - `POST /api/auth/login` - Role-based authentication (Admin vs Customer)

## Supabase-ready setup

Create a `.env.local` file with:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The app will automatically use real Supabase auth when both values are present. If they are missing, it falls back to local demo auth.

## Anthropic connection

The server-side `/api/claude` endpoint streams Claude responses without exposing the API key to the browser. Add these variables to `.env.local` for local development or to your Vercel project environment:

```env
ANTHROPIC_API_KEY=your-anthropic-api-key
ANTHROPIC_MODEL=claude-fable-5-1
```

Client code can call the streaming helper from `src/anthropic.js`:

```js
import { askClaude } from './anthropic';

const answer = await askClaude('free', {
	onText: (text) => console.log(text),
});
```

## Porting to live data

A database schema is included in `supabase/schema.sql` and `supabase/seed.sql` to help migrate the app into a real Supabase project.

### Example setup

1. Create a Supabase project
2. Open the SQL editor
3. Run the contents of `supabase/schema.sql`
4. Optionally run `supabase/seed.sql` to load sample product data
5. Add your environment variables with the correct project URL and anon key

## Production build

```bash
npm run build
```

## Publish publicly without Vercel

This project includes `netlify.toml` and a built-in SPA rewrite for Netlify static hosting. The rewrite is copied into `dist` so direct uploads and Git-based deploys both serve the app when a page is refreshed.

1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) and sign in.
2. Run `npm run build` locally.
3. Drag the generated `dist` folder onto Netlify Drop (it includes the `_redirects` file needed for refreshes on app URLs).
4. Netlify will provide a public `netlify.app` URL that anyone can open.

For automatic deployments, import the project from a Git repository and use:

- Build command: `npm run build`
- Publish directory: `dist`

The marketplace works in local demo mode without environment variables. Add the `VITE_SUPABASE_*` variables in Netlify site settings if you want shared Supabase authentication/data.

## Notes

This project is intentionally designed to stay usable without secrets for demos, hackathons, and portfolio work, while still being ready for real backend integration.

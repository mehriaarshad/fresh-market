# Fresh Market — Online Grocery Store

Fresh Market is a responsive React grocery-store demonstration created for the NetLinks Software Engineering in Practice Bootcamp. It helps customers browse grocery products, search by name, filter by category, add items to a basket, and place a demo order.

> **Project status:** Frontend educational prototype. Product data is sample data. Authentication, orders and cart are stored in the browser using LocalStorage. No real payment is processed and no backend service is connected.

## 1. Problem and proposed solution
Customers may need to visit several stores or contact sellers to find everyday groceries. Fresh Market demonstrates a single online storefront where customers can discover products, compare displayed prices, prepare a basket and submit delivery details in one flow.

## 2. Target users and stakeholders
- **Primary users:** customers who want to browse and order groceries online.
- **Stakeholders:** store owner/manager, delivery staff, project team and instructor.
- **Future administrator:** a store operator who could manage products, stock and orders after a backend is added.

## 3. Features
- Responsive home page and product categories.
- Product catalog with search, category filtering and sorting.
- Product detail pages.
- Shopping cart with quantity changes, item removal and subtotal.
- Checkout form with required-field and email validation.
- Demo sign-in and registration.
- Customer account and browser-stored order history.
- Contact form with validation and confirmation feedback.
- Reusable layout, product and UI components.

## 4. Technology
- React 18 and Vite
- JavaScript ES6+
- Tailwind CSS 3 and custom responsive CSS
- React Router
- Lucide React
- Git and GitHub

## 5. Run locally
Install Node.js (LTS), then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

## 6. Project structure
```text
fresh-market/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/       # Header and Footer
│   │   ├── products/     # ProductCard and ProductGrid
│   │   └── ui/           # SectionTitle, Toast, QuantityControl
│   ├── context/          # Shared cart, user and order state
│   ├── data/             # Sample grocery products and categories
│   ├── pages/            # One component per route
│   ├── styles/           # Responsive global styles
│   ├── App.jsx
│   └── main.jsx
├── docs/                 # Proposal, requirements, models and test plan
└── README.md
```

## 7. Important demo limitations
- Login/register is a frontend simulation; do not use a real password.
- Browser LocalStorage is not secure account storage.
- Contact form shows a local success message and does not send email.
- Checkout simulates cash on delivery and does not collect payment details.
- Products, prices and stock are illustrative.
- Multi-user access, real inventory, admin management, delivery tracking and payment gateway require a backend and further implementation.

## 8. Suggested team responsibilities
Assign real team members before submission:
- Project Manager — coordination, deadlines and communication.
- Business Analyst — user research and requirements.
- UI/UX Designer — sitemap, user flows and Figma screens.
- Frontend Developer — React components and interactions.
- QA & Documentation — test records, issues and project documents.

## 9. GitHub collaboration
Suggested workflow:
```bash
git init
git add .
git commit -m "Initial Fresh Market project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
Use feature branches and meaningful commits when working as a team. Never commit passwords, API keys or private data.

## 10. Responsible AI use
AI-assisted code must be reviewed, tested, adapted and understood by the team. Team members should be able to explain the components, state, routes, validation and LocalStorage behavior. Disclose AI assistance when the instructor requests it.

## 11. Deployment
Create a public GitHub repository and import it into Vercel. Use the default Vite build settings:
- Build command: `npm run build`
- Output directory: `dist`

For a client-side React Router deployment, configure the hosting platform to rewrite unknown routes to `/index.html`. Test direct navigation to product and account routes after deployment.

## 12. Before submission
Complete the project documents with real interview/observation evidence, team names, Figma links, GitHub URL, deployment URL and actual test results. The diagrams and test cases in `docs/` are starting artifacts and should be reviewed by the team and instructor.

## Latest enhancements
- Expanded grocery catalog with separate categories for meat, fish, fruit, vegetables, dairy, oils, rice, pasta/spaghetti, biscuits, chocolate, drinks, pantry, frozen and canned foods.
- English/Dari language switcher with saved language preference and automatic LTR/RTL document direction.
- Bilingual category names and product names/descriptions for the expanded sample catalog.
- CSS motion effects for product/category cards, hero produce, hover states and reduced-motion accessibility support.
- Fixed `ScrollToTop` so its `useEffect` returns no Promise or invalid cleanup value.

## Visual storefront update

The homepage now uses an original Fresh Market layout inspired by the clean, produce-led grocery browsing experience of Whole Foods Market (not a copy of its branding). It includes large food photography, visual aisle cards, featured produce, product cards with photographic imagery, and a Kabul grocery-location guide with map directions.

Food photography is loaded from Unsplash over the internet, so an internet connection is required for those images to appear. Kabul location cards list independently listed grocery destinations (ABC Supermarket in Old Taimani, Afghan Spinneys at Shepor Square, and Kefayat Supermarket around Deh Mazang); they are not represented as Fresh Market branches. Replace these with your actual business branch addresses and confirm delivery areas before publishing. Add your real business phone, email, social links, and backend/API integration before accepting live orders.

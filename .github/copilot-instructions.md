# Copilot Instructions for Sakura Plant Shop

## Project Overview
**Sakura Plant Shop** is a React-based e-commerce web application for selling plants. It's deployed on GitHub Pages with Google OAuth authentication, Firebase backend, and local storage for cart persistence.

**Key Technologies:**
- React 19.2.0 with React Router DOM 7.9.5
- Firebase (auth only, no Firestore/RTDB used currently)
- Google OAuth via @react-oauth/google
- Create React App with react-scripts 5.0.1
- Deployed via GitHub Pages (gh-pages)

## Architecture Overview

### App Structure
```
src/
├── App.js                 # Router setup with basename="/sakuraplantshop" (GitHub Pages)
├── firebase.js            # Firebase & Google Auth configuration
├── components/            # Reusable UI components
│   ├── Header.js         # Navigation (mostly empty/commented)
│   ├── Footer.js         # Footer component
│   ├── Login.js          # Google OAuth login/logout buttons
│   ├── PlantCard.js      # Individual plant display (unused - see Catalog)
│   └── Searchbar.js      # Search functionality
├── pages/                # Full page components
│   ├── Home.js           # Homepage
│   ├── Catalog.js        # Main product listing, admin product management
│   ├── Cart.js           # Shopping cart with localStorage persistence
│   └── Profile.js        # User profile (stub)
└── index.js             # React entry point
```

### Critical Data Flow

1. **Product Management**: Products are stored in `initialProducts` array in `Catalog.js` (hardcoded, not in Firebase)
2. **Cart State**: Managed in `Cart.js` and `Catalog.js`, persisted via `localStorage.getItem("cart")` / `localStorage.setItem("cart")`
3. **Authentication**: Firebase Auth only - Google OAuth popup, sets `user` object in component state
4. **Admin Access**: Email-based gate in `Catalog.js` - only `rustam.n1822@gmail.com` can add/edit/delete products

### Key Patterns

**Admin-Only Features** (Catalog.js, lines ~50+):
```javascript
const adminEmails = ["rustam.n1822@gmail.com"];
setIsAdmin(currentUser && adminEmails.includes(currentUser.email));
```
Admin users can:
- Add new plants (modal form, uses `Date.now()` for IDs)
- Edit existing plants (prompt dialogs)
- Delete plants

**Cart Persistence**:
```javascript
const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
localStorage.setItem("cart", JSON.stringify(newCart));
```
Cart data includes: `id`, `name`, `price`, `description`, `img` fields

**Image Handling**:
- Public images in `public/img/` referenced via `process.env.PUBLIC_URL + "/img/filename.jpg"`
- User-uploaded images in Catalog use `URL.createObjectURL(newPlant.img)` for preview

## Development Workflows

### Running the Project
```bash
npm start        # Dev server on http://localhost:3000
npm run build    # Production build → build/ folder
npm test         # Jest test runner (interactive watch mode)
npm run deploy   # Builds & deploys to gh-pages branch
```

### Deployment Details
- **Homepage**: `"homepage": "https://rustam2218.github.io/sakuraplantshop"`
- Router uses `basename="/sakuraplantshop"` to handle GitHub Pages subdirectory routing
- Deploy script: `npm run predeploy && gh-pages -d build`

## Project-Specific Conventions

1. **Russian Language**: UI text, comments, and product names are in Russian
2. **Pricing Format**: Prices in rubles (₽), displayed with `.toLocaleString()` for formatting
3. **Firebase Config**: Hardcoded in `firebase.js` (public values are safe, API key is public)
4. **No Database**: Products are client-side only - changes don't persist between sessions (except admin modal adds to local state)
5. **Component State Over Context**: No Context API or Redux - state lives in component tree

## Common Tasks & Patterns

### Adding a New Page
1. Create `src/pages/NewPage.js` with default export
2. Add route in `App.js`: `<Route path="/newpage" element={<NewPage />} />`
3. Link in Header.js (currently mostly empty)

### Modifying Product Data Structure
- Edit `initialProducts` in `Catalog.js` (lines ~14-26)
- Ensure cart items include same fields: `id`, `name`, `price`, `description`, `img`
- Update PlantCard.js rendering if field names change

### Testing
- Tests expected in `src/` as `*.test.js` files
- Jest/React Testing Library configured via ESLint config

### Styling
- Component-specific CSS files: `src/components/*.css`, `src/pages/*.css`
- Global styles in `src/index.css`, `src/App.css`
- No CSS framework (no Tailwind, Bootstrap) - plain CSS

## Known Limitations & TODOs

- **PlantCard.js**: Unused component - rendering happens directly in Catalog.js loops
- **Header.js**: Navigation commented out, needs implementation
- **Profile.js**: Stub component, no user profile logic
- **Admin Persistence**: Admin-added products lost on page refresh (not saved to Firebase/Backend)
- **Search**: Searchbar.js exists but integration with Catalog unclear
- **Mobile Responsiveness**: CSS files present but responsiveness status unknown

## External Dependencies & Integration

- **Google OAuth**: Client ID hardcoded in App.js - requires active Google Cloud project
- **Firebase**: Only authentication used; no data persistence to Firestore/RTDB
- **GitHub Pages**: Deployment target; requires `gh-pages` branch setup
- **Node.js**: npm required; tested on npm (no yarn/pnpm config observed)

## Important Gotchas

1. **localStorage is Ephemeral**: Cart data lost in private/incognito windows
2. **Image Loading**: Product images expect files in `public/img/` - missing files show 404
3. **GitHub Pages Subdirectory**: Router needs `basename` prop or routing breaks
4. **Email-Hardcoded Admin**: Changing admin email requires code edit, no configuration file
5. **Unresolved Dependencies**: Searchbar.js imported but its function not clear from Catalog context

# Interactive Wall Calendar Component

A polished, interactive React component built using Vite, inspired by a physical wall calendar aesthetic.

## Features
- **Physical Calendar Aesthetic**: Clean ring-binder motif, hero image anchor, and balanced proportions mirroring a real wall calendar.
- **Day Selector**: Select a start date and an end date. Distinct visual states highlight the boundaries and the range itself.
- **Integrated Notes**: A minimal, ruled-line note pad on the left, bound automatically to `localStorage` for cross-session persistence.
- **Fully Responsive**: Stacks neatly on screens under 600px.
- **Date Utilities**: Leverages robust date arithmetic from `date-fns`.

## Technology Stack
- React 18
- Vite
- TypeScript
- date-fns
- lucide-react (for minimal icons)
- Vanilla CSS (No large frameworks for strict control of aesthetics)

## Local Development
To run this project locally:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open the browser**  
   Navigate to the URL provided in the output (usually `http://localhost:5173`).

## Design Choices
1. **Physical Emulation**: Added pseudo-elements at the top of the calendar to recreate the look of a double-loop wire binding.
2. **Hero Section**: Applied a CSS `clip-path` polygon to give the header image a rugged, "W" cut that resembles the reference image. The month and year are dramatically overlaid using the 'Outfit' Google Font for a crisp, modern feel.
3. **Notes Section**: Recreated the paper lines by using a `repeating-linear-gradient` on a transparent `textarea`. This prevents text from misaligning with lines regardless of user input.

Enjoy!

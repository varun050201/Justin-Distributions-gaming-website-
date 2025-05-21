# Justin Distributions - Gaming Seller

A modern, sleek website for Justin Distributions, showcasing gaming products and services with a high-tech vibe. Features include product listings, FAQs, and contact information.

## ✨ Features

*   **Engaging Preloader**: Custom animation to welcome users.
*   **Dynamic Hero Section**:
    *   "Digital Surge" animated title for "Justin Distributions".
    *   "Word Spring Reveal" for the tagline.
    *   Ken Burns effect slideshow background.
    *   Interactive particle layer reacting to mouse movement.
    *   Animated marquee at the bottom.
*   **Smooth Section Transitions**: Content animates into view on scroll using `AnimatedElement`.
*   **VWLab-Inspired UI/UX**:
    *   Parallax background text for section titles.
    *   Sophisticated entry animations for text and UI elements.
*   **Product Showcase**: Grid of product cards with hover effects and a detailed modal view.
*   **Testimonials Section**: Displays client feedback in animated cards.
*   **FAQ Section**: Interactive accordion for frequently asked questions.
*   **Contact Form**: Allows users to send messages.
*   **Animated Header**: Slides in and highlights active section on scroll.
*   **Section Progress Indicator**: Floating dots for quick navigation.
*   **Animated Footer**: Reveals trusted partner logos and social media links.
*   **Accessibility**:
    *   "Reduce Motion" toggle and respects `prefers-reduced-motion` browser settings.
    *   ARIA attributes for interactive elements.
*   **Styling**: High-tech aesthetic with custom fonts (Orbitron), neon glow effects, and a consistent color palette.
*   **Global Ambiance**: Subtle animated digital noise background.

## 🛠️ Tech Stack

*   **React 19**: (via esm.sh CDN) for building the user interface.
*   **Tailwind CSS**: (via CDN) for utility-first styling.
*   **TypeScript**: For type safety.
*   **HTML5 & CSS3**: For structure and custom styles/animations (keyframes).
*   **JavaScript (ES6+)**: For interactive logic.

## 🚀 Running the Project

This project is a static website and can be run directly by opening the `index.html` file in a modern web browser.

**For Development:**
It's recommended to use a local development server to ensure proper ES module resolution and avoid potential CORS issues if any external resources were to be fetched via JavaScript in the future.

1.  **Using `npx serve` (Node.js required):**
    *   Navigate to the project's root directory in your terminal.
    *   Run the command: `npx serve`
    *   Open the URL provided by the server (usually `http://localhost:3000`) in your browser.

2.  **Using VS Code Live Server Extension:**
    *   Open the project folder in Visual Studio Code.
    *   Install the "Live Server" extension if you haven't already.
    *   Right-click on `index.html` in the VS Code Explorer and select "Open with Live Server".

## 📁 Project Structure

```
.
├── components/               # React components
│   ├── ui/                   # UI-specific reusable components (Button, Logo, Preloader, etc.)
│   ├── AboutSection.tsx
│   ├── AnimatedElement.tsx
│   ├── ContactSection.tsx
│   ├── FAQSection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ProductsSection.tsx
│   └── TestimonialsSection.tsx
├── constants.tsx             # Shared constants (colors, navigation links, data)
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Main application component
├── index.html                # Main HTML entry point
├── index.tsx                 # React entry point (renders App)
├── metadata.json             # Project metadata for the development environment
├── README.md                 # This file
└── .gitignore                # Specifies intentionally untracked files for Git
```

## 🎨 Animations & UI Highlights

*   **Preloader**: Multi-stage animation ("System Boot" light bars, Logo Genesis, Status Line decode).
*   **Hero Title "Digital Surge"**: Letters animate with scale, opacity, and glow.
*   **Hero Tagline "Word Spring Reveal"**: Words fade, slide up, overshoot, and spring back.
*   **Section Title Background Text**: Large, semi-transparent text with parallax scroll.
*   **Product Modal**: "Unfold" animation for appearing and disappearing.
*   **Button Microinteractions**: Shine, ripple, and chromatic glitch effects on hover/click.

This project aims for a visually rich and interactive experience, inspired by modern web design trends.

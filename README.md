# Liquid Glass Lab

A modern implementation of the macOS liquid glass effect using React, Vite, and shadcn/ui.

## 🚀 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **PostCSS** - CSS post-processing

## 🎨 Features

- **Liquid Glass Effect**: Replicates the beautiful glass morphism effect found in macOS
- **Interactive Components**: Button, Menu, and Dock variants with hover effects
- **SVG Filters**: Custom turbulence and displacement filters for realistic glass distortion
- **Responsive Design**: Built with Tailwind CSS for modern responsive layouts
- **TypeScript Support**: Full type safety for better development experience

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd liquid-glass-lab
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── LiquidGlass.tsx    # Main glass effect component
│   ├── GlassFilter.tsx    # SVG filter definition
│   ├── Logo.tsx          # Logo component with glass effect
│   ├── Menu.tsx          # Menu component
│   └── Dock.tsx          # Dock component with app icons
├── assets/
│   ├── icons/            # Application icons (PNG format only)
│   │   ├── finder.png    # Finder app icon
│   │   ├── safari.png    # Safari app icon
│   │   ├── messages.png  # Messages app icon
│   │   ├── notes.png     # Notes app icon
│   │   ├── map.png       # Maps app icon
│   │   └── books.png     # Books app icon
│   └── assets.d.ts       # TypeScript declarations for assets
├── styles/
│   └── glass.css         # Glass effect styles
├── lib/
│   └── utils.ts          # Utility functions (shadcn/ui)
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

## 🎯 Components

### LiquidGlass Component

The main component that applies the glass effect:

```tsx
<LiquidGlass type="button">
  <YourContent />
</LiquidGlass>
```

**Props:**
- `type`: `'button' | 'menu' | 'dock'` - Determines the styling and behavior
- `children`: React nodes to render inside the glass container
- `className`: Additional CSS classes

### Available Types

1. **Button**: Large, prominent button with rounded corners
2. **Menu**: Context menu with multiple options
3. **Dock**: macOS-style dock with application icons

## 🎨 Customization

### Glass Effect Properties

You can modify the glass effect by editing the CSS variables in `src/styles/glass.css`:

- `backdrop-filter`: Controls the blur intensity
- `background`: Adjusts the tint and transparency
- `box-shadow`: Changes the depth and shadow effects

### SVG Filter

The glass distortion effect is created using SVG filters in `GlassFilter.tsx`. You can modify:

- `baseFrequency`: Turbulence pattern density
- `numOctaves`: Complexity of the noise pattern
- `scale`: Displacement intensity
- Light position and properties

## 🎨 Icon Format

The project uses PNG format for all application icons:

- **PNG**: Standard raster format for macOS system icons with high quality and transparency support

### Adding New Icons

1. Place your icon files in `src/assets/icons/`
2. Import them in your React components
3. Update the TypeScript declarations if needed (for new formats)

Example:
```tsx
import myAppIcon from '../assets/icons/myapp.png';

// Use in component
<img src={myAppIcon} alt="My App" />
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Components

1. Create a new component in `src/components/`
2. Use the `LiquidGlass` wrapper for consistent styling
3. Export and import in your main application

## 🎯 Browser Support

This project uses modern CSS features. Best experienced in:
- Chrome/Edge 88+
- Firefox 87+
- Safari 14+

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
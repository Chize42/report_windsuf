# NatureLens Photography Portfolio

A minimalist, elegant photography portfolio website showcasing nature photography with a clean, responsive design.

## Features

- Responsive design that works across all device sizes
- Modern, minimalist aesthetic with neutral color palette
- Interactive photo gallery with filtering capabilities
- Modal/popup view for enlarged photos with navigation
- Contact form for visitor inquiries
- Accessibility-focused implementation

## Pages

1. **Home** - Introduction and featured works
2. **Gallery** - Grid layout of photographs with filtering by category
3. **About** - Photographer background and philosophy
4. **Contact** - Contact form and social media links

## Setup Instructions

1. Download or clone this repository to your local machine
2. Add your own images to the `img` folder:
   - Featured images for the homepage: `featured1.jpg`, `featured2.jpg`, etc.
   - Gallery images: `gallery1.jpg`, `gallery2.jpg`, etc.
   - About page portrait: `photographer.jpg`
3. Customize text content in the HTML files to match your personal information
4. Test the website by opening `index.html` in a web browser

## Technology Stack

- HTML5
- CSS3 with Tailwind CSS framework
- Vanilla JavaScript
- Responsive design principles
- Web accessibility standards

## Customization

### Changing Colors

The website uses Tailwind CSS utility classes for styling. To change the color scheme:

1. Edit the color classes in the HTML files (e.g., change `bg-gray-900` to `bg-blue-900`)
2. For custom colors beyond Tailwind's default palette, add your custom styles to `css/styles.css`

### Adding New Gallery Categories

To add new category filters to the gallery:

1. Add a new filter button in `gallery.html` with appropriate `data-filter` attribute
2. Add the corresponding `data-category` attribute to gallery items

### Modifying the Layout

The website uses Tailwind's responsive utility classes. To modify layouts:

1. Edit grid and flexbox classes (e.g., change `grid-cols-3` to `grid-cols-2`)
2. Adjust padding and margin using Tailwind's spacing utilities

## Browser Compatibility

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is available for personal and commercial use. Attribution is appreciated but not required.

## Credits

- Design & Development: [Your Name]
- Icons: Heroicons (via Tailwind CSS)
- Font: Inter (Google Fonts)

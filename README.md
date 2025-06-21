# Marathon Calendar India

A simple, clean marathon calendar website built with vanilla JavaScript and Tailwind CSS.

## Features

- 📅 Interactive calendar with month navigation
- 🏃‍♂️ Marathon events across major Indian cities
- 📱 Fully responsive design
- ⚡ Fast and lightweight (no framework dependencies)
- 🌐 Ready for GitHub Pages deployment

## Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in your browser
3. **That's it!** The website is ready to use

## Deploy to GitHub Pages

### Option 1: Simple Upload
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → main branch → /(root)
5. Your site will be live at `https://yourusername.github.io/repository-name/`

### Option 2: Using Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/repository-name.git
git push -u origin main
```

## Customization

### Adding Events
Edit the `marathonEvents` array in `app.js`:

```javascript
{
    id: 9,
    title: "Your Marathon",
    date: new Date(2025, 4, 15), // May 15, 2025
    time: "6:00 AM",
    location: "Your City, State",
    distance: "42.2 KM",
    category: "Full Marathon"
}
```

### Styling
- Modify Tailwind classes in `index.html`
- Add custom CSS in the `<style>` section
- Update colors and themes as needed

## File Structure

```
MarathonCalendar/
├── index.html      # Main HTML file
├── app.js          # JavaScript functionality
└── README.md       # This file
```

## Dependencies (CDN)

- **Tailwind CSS** - Styling
- **Lucide Icons** - Icons
- **Date-fns** - Date manipulation
- **Google Fonts** - Typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

Built with ❤️ for the running community 
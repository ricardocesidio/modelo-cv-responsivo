# CV Maker

A modern, customizable CV/Resume Builder built with vanilla HTML, CSS, and JavaScript.  
Live-edit your CV, customize colors and fonts, upload a profile picture, and export as PDF — all in the browser.

## Features

- **Live CV Editor** — Edit all text fields with instant preview
- **Color Customization** — 7 theme presets + custom color pickers for every element
- **Font Controls** — 10 professional fonts for body, headings, and name
- **Profile Picture** — Upload JPG/PNG/WebP (SVG blocked for security), choose shape and size
- **Skills** — Add, edit, delete, and reorder skill categories
- **Education** — Add, edit, delete, and reorder entries
- **Experience** — Add, edit, delete, and reorder work experience
- **Projects** — Add, edit, delete, and reorder with bullet points and links
- **Section Visibility** — Toggle sections on/off
- **Local Storage** — Auto-saves all data scoped under `cv-maker:` keys
- **Export / Import JSON** — Backup or transfer your CV data with version info
- **Print / Save as PDF** — Clean A4 print output, editor controls hidden
- **Data Migration** — Versioned storage with automatic backup before migration
- **Security** — Input sanitization, URL validation, color validation, image type/size checks
- **Accessibility** — Icon buttons have `aria-label`, semantic HTML, focus states
- **Responsive** — Desktop split view + mobile tab navigation

## Default Template

**Classic Sidebar CV** — Two-column layout with dark sidebar, profile image, personal info, skills, education, experience, and project cards.

## Tech Stack

- HTML5
- CSS3 (CSS Variables, Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- localStorage (scoped keys)
- FileReader API

## Project Structure

```
cv-maker/
├── index.html              Main application shell
├── README.md
├── style/
│   ├── style.css           App layout + CV preview styles
│   ├── themes.css          CSS variable theme presets
│   └── print.css           A4 print stylesheet
├── scripts/
│   ├── data.js             Default CV data model
│   ├── validation.js       HTML escaping, URL/color/image validation, ID generation
│   ├── migration.js        Data migration, versioning, merge with defaults, backup
│   ├── storage.js          localStorage save/load/reset (scoped keys only)
│   ├── ui.js               Toast notifications, debounce, footer year
│   ├── export.js           JSON export/import with validation
│   ├── preview.js          CV preview renderer with sanitized output
│   ├── editor.js           Editor panel with forms, color/font/image controls
│   └── app.js              Main app initialization, toolbar, click-to-edit
├── images/
│   └── ricimg1.JPG         Sample profile picture
```

## How to Use

1. Open `index.html` in any modern browser
2. Click any section of the CV to jump directly to its editor controls
3. Edit your personal information, skills, education, experience, and projects
4. Switch to the **Customize** tab to change colors, fonts, and profile picture
5. Click **Print / PDF** to save as PDF
6. Use **Export** to backup your data as JSON
7. Import a previous backup with **Import**

## How to Run Locally

Open directly:

```bash
open index.html
```

Or serve with a local server:

```bash
npx live-server
python3 -m http.server 8080
```

## Customization

### Themes
Choose from 7 presets: Classic Dark, Modern Blue, Emerald Professional, Burgundy Executive, Minimal Black & White, Soft Gray, Creative Purple

### Colors
Customize every color: sidebar, cards, text, headings, accents, borders, backgrounds, section title bars

### Fonts
Choose from: Arial, Helvetica, Inter, Roboto, Open Sans, Lato, Poppins, Montserrat, Georgia, Times New Roman  
Set separately for body text, headings, and your name.  
Font size: Compact, Small, Normal, Large

### Image
Upload JPG, PNG, or WebP (max 2MB). SVG files are blocked.  
Choose shape: Rectangle, Rounded, Circle  
Choose size: Small, Medium, Large, Full Width

## Print / Save as PDF

1. Click **Print / PDF** in the toolbar
2. Select **Save as PDF** as the destination
3. The print output preserves colors, uses A4 format, and hides editor controls

## Data Privacy

All CV data is stored locally in your browser's `localStorage` under keys prefixed with `cv-maker:`.  
**No data is sent to any server.**  
Resetting only clears `cv-maker:*` keys — it does not affect other websites or applications.

## Security

- SVG image uploads are blocked (prevents script-based XSS attacks)
- Only JPG, PNG, and WebP images are accepted (max 2MB)
- All user text is HTML-escaped before rendering
- URLs are validated and restricted to safe protocols (`https:`, `http:`, `mailto:`, `tel:`)
- Invalid color values are rejected with fallback to defaults
- Imported JSON is validated and sanitized before saving

## Data Persistence

All CV data is saved automatically to browser `localStorage`. Your changes persist across sessions.  
When the data schema changes, a backup is created automatically before migration — your data is never silently deleted.

## Versioning

Storage uses a versioned payload format:

```json
{
  "version": "1.0.0",
  "savedAt": "2026-05-25T12:00:00.000Z",
  "data": { ... }
}
```

If a future version changes the data structure, migration runs automatically with a backup saved as `cv-maker:backup:<id>`.

## Future Improvements

- Multiple CV templates (Modern Minimal, Executive, Developer)
- Drag-and-drop section ordering
- Server-side PDF generation
- Cloud save / user accounts
- AI writing assistant
- ATS score checker
- Cover letter generator
- Multi-language support

## Author

Built by **Ricardo Cesidio**.

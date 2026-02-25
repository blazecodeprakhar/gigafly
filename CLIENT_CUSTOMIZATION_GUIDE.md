# 🛠️ Client Customization & Extensibility Guide

This project has been restructured to allow you to easily adapt the website for different clients and add new content without breaking the complex animations and design.

---

### 1. Changing Text Content
Instead of searching through thousands of lines of HTML, you can now manage core text in:
📂 `assets/js/client-config.js`

**How it works:**
- Edit the `CLIENT_CONTENT` object.
- The values will automatically update in the HTML wherever a `data-client-key` attribute matches.
- Use `data-client-type="html"` in your HTML tags if the content contains `<br>` or other tags.

### 2. Changing Brand Styling (Colors/Fonts)
📂 `assets/css/brand-style.css`

You can change the global look by editing the CSS variables:
```css
:root {
  --brand-primary: #your-color;
  --brand-accent: #your-accent;
  --font-main: "Your Font", sans-serif;
}
```

### 3. Adding New Sections
You can add entirely new sections to the website without interfering with the existing ones.

1.  Open `index.html`.
2.  Scroll to the bottom and look for the `<!-- CUSTOM CLIENT SECTIONS -->` comment.
3.  Add your HTML inside the `<div id="custom-client-content"></div>` container.
4.  **Pro Tip**: Use class `section` to inherit the global section padding and behaviors.

### 4. File Structure Preservation
**Do NOT move or rename files inside:**
- `assets/cdn.prod.website-files.com/`
- `assets/cdn.jsdelivr.net/`

The logic in `webflow.js` and `slater_main.js` specifically looks for these exact paths. If you change them, animations (like the Globe and Jet reveals) will break.

---
*Created for the "Maryland" Project REST API / Mirroring Service.*

# 🎨 NFSU Project Master Style Guide

### 1. The Color Palette

**Strategy:** "Official Stability with Golden Highlights."

* **Foundation:** `Oxford Blue` - Used for heavy structural elements (Footers, Navbars, Buttons).
* **Spotlight:** `Golden Yellow` - Used for "Click me" elements, icons, and active states.
* **Separator:** `Platinum Blonde` - Used to create bands/sections to break up the white space.

| Color Name | Hex Code | Usage |
| --- | --- | --- |
| **Oxford Blue** | `#002147` | Backgrounds, Footers, Primary Buttons |
| **Golden Yellow** | `#ddb55e` | Icons, Hover States, Borders, Accents |
| **Platinum Blonde** | `#f3ebdf` | "About" or "Events" Section Backgrounds |
| **Pure White** | `#ffffff` | Content Card Backgrounds, Text on Blue |
| **Dark Text** | `#333333` | Standard Body Text |

**CSS Variables (Copy-Paste this into `globals.css`):**

```css
:root {
  --nfsu-primary: #002147;   /* Oxford Blue */
  --nfsu-accent: #ddb55e;    /* Golden Yellow */
  --nfsu-bg-light: #f3ebdf;  /* Platinum Blonde */
  --nfsu-text-main: #333333; /* Dark Grey */
  --nfsu-text-inv: #ffffff;  /* White */
}

```

---

### 2. Typography (The "Voice")

* **Headings (H1-H6):** `Poppins`
* *Weight:* 600 (Semi-Bold) or 700 (Bold).
* *Vibe:* Geometric, official, modern.


* **Body Text (p, span, div):** `Open Sans`
* *Weight:* 400 (Regular).
* *Vibe:* Clean, humanist, highly readable.



**Import Link:**

```html
<link href="https://fonts.googleapis.com/css?family=Open+Sans|Poppins:400,600,700" rel="stylesheet">

```

---

### 3. Component Architecture

#### **A. The "Key Highlights" Cards (Stats)**

* **Shape:** Sharp corners (0px border-radius).
* **Style:** Dark gradient or solid Navy fill.
* **Accent:** Subtle bottom border in **Gold** (`#ddb55e`).
* **Typography:** Massive numbers (2.5rem+), small labels.

#### **B. The "Icon Box" (Feature Cards)**

* **Shape:** Soft rounded corners (5-8px).
* **Style:** White background on top of Dark Blue or Platinum.
* **Interaction:** * *Hover:* Lifts up slightly (`transform: translateY(-5px)`).
* *Shadow:* Soft drop shadow (`0 10px 30px rgba(0,0,0,0.1)`).



#### **C. The Navbar**

* **Top State:** Transparent background, White text.
* **Scrolled State:** Solid White background, Blue text, Drop shadow.
* **Special Button:** "Admissions/Login" buttons are **Pill Shaped** (fully rounded 50px radius).

---

### 4. Layout Rules

* **Breathing Room:** Generous vertical padding (`padding: 60px 0;`) for all major sections.
* **Banding:** Alternate background colors (White -> Platinum -> White) to separate distinct content areas.
* **Grid:** Standard Bootstrap-style 12-column grid.

---

### ⚠️ Important Note: The "Cyber-Hero" Exception

* **The Hero Section** (with the Map & Terminal) uses a unique **"Dark Mode"** palette (`#020c1b` Background, Neon Green Text).
* **The rest of the site** must strictly follow the **Oxford Blue/Gold** official palette above to maintain the connection to the main college identity.
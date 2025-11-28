Primary Brand: #3B82F6 (blue-500)
Primary Dark: #1E40AF (blue-800)
Primary Light: #DBEAFE (blue-100)

Success/Open: #10B981 (green-500)
Warning/In Progress: #F59E0B (amber-500)
Neutral/Closed: #6B7280 (gray-500)

Background: #F9FAFB (gray-50)
Surface: #FFFFFF
Text Primary: #111827 (gray-900)
Text Secondary: #6B7280 (gray-500)
Border: #E5E7EB (gray-200)

Error: #EF4444 (red-500)
Error Light: #FEE2E2 (red-100)
```

### **Typography**
```
Font Family: Inter, system-ui, sans-serif
Headings: 
  - H1: 48px / 600 weight
  - H2: 36px / 600 weight
  - H3: 24px / 600 weight
  - H4: 20px / 600 weight
Body: 16px / 400 weight
Small: 14px / 400 weight
```

### **Spacing Scale**
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### **Component Specifications**

**Buttons**
- Primary: Blue background, white text, 12px padding vertical, 24px horizontal
- Secondary: White background, blue border, blue text
- Border radius: 8px
- Hover: Darken by 10%

**Cards**
- Background: White
- Border radius: 12px
- Box shadow: 0 1px 3px rgba(0,0,0,0.1)
- Padding: 24px

**Form Inputs**
- Height: 44px
- Border: 1px solid gray-200
- Border radius: 8px
- Focus: Blue border, blue ring shadow
- Error: Red border, red ring shadow

---

## 📁 **PROJECT STRUCTURE**
```
ticket-management-system/
├── README.md (root - links to all implementations)
├── assets/
│   ├── hero-wave.svg
│   ├── circle-decoration-1.svg
│   ├── circle-decoration-2.svg
│   └── design-tokens.json
├── react-version/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── vue-version/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
└── twig-version/
    ├── templates/
    ├── public/
    ├── composer.json
    └── README.md
```

---

## 🎨 **DESIGN ASSETS TO CREATE**

### **1. Hero Wave SVG** (`hero-wave.svg`)
```
Dimensions: 1440px × 200px
Wave style: Smooth, organic curve
Color: Primary brand color with slight transparency
Position: Bottom edge of hero section
```

### **2. Decorative Circle 1** (`circle-decoration-1.svg`)
```
Size: 400px × 400px
Style: Gradient fill (primary to primary-light)
Opacity: 0.1
Position: Top right of hero, partially off-screen
```

### **3. Decorative Circle 2** (`circle-decoration-2.svg`)
```
Size: 300px × 300px
Style: Solid fill with blur
Opacity: 0.05
Position: Bottom left of features section
# Design Guidelines: Dashboard de Drogas Apreendidas - Polícia Civil da Bahia

## Design Approach

**System Selected**: Material Design 3 with Government/Institutional Adaptations

**Justification**: For a law enforcement data dashboard requiring clarity, professionalism, and data-dense displays, Material Design provides the ideal foundation with its emphasis on clear hierarchy, accessible components, and systematic approach to data visualization.

**Design Principles**:
- **Authority & Trust**: Professional, institutional aesthetic that conveys credibility
- **Data Clarity**: Information hierarchy that makes complex data immediately comprehensible
- **Operational Efficiency**: Quick access to filters, insights, and data entry functions
- **Accessibility**: High contrast, clear typography, WCAG 2.1 AA compliance

---

## Core Design Elements

### A. Color Palette

**Primary Colors**:
- **Navy Blue** (Primary): 220 70% 25% - Institutional authority, headers, primary actions
- **Steel Blue** (Secondary): 210 40% 45% - Secondary elements, borders, inactive states
- **White/Light Gray** (Background): 0 0% 98% - Main background, cards, panels

**Accent Colors**:
- **Red Alert**: 0 75% 50% - High priority indicators, warnings (drogas perigosas)
- **Green Success**: 145 65% 45% - Positive metrics, confirmations
- **Amber Warning**: 35 85% 55% - Medium priority alerts

**Data Visualization Palette**:
- Use distinct, colorblind-safe colors for charts: 220 70% 50%, 280 60% 55%, 160 60% 45%, 30 80% 55%, 340 70% 50%

**Institutional Elements**:
- Use official colors from the Polícia Civil da Bahia badge when available
- Maintain high contrast (4.5:1 minimum) for all text

### B. Typography

**Font Families**:
- **Primary**: 'Inter' - Modern, highly legible for UI and data
- **Headings**: 'Inter' at 600-700 weight for emphasis
- **Data/Numbers**: 'JetBrains Mono' or 'Inter' tabular numbers for alignment

**Scale**:
- **Institutional Header**: 18px, semibold, tracking wide (SECRETARIA DE SEGURANÇA PÚBLICA)
- **Dashboard Title**: 32px, bold (Drogas Apreendidas e Armazenadas...)
- **Section Headers**: 24px, semibold
- **Body/Data**: 15px, regular
- **Labels**: 13px, medium
- **Captions**: 12px, regular

### C. Layout System

**Spacing Units**: Tailwind scale of **4, 6, 8, 12, 16, 24** for consistent rhythm

**Grid Structure**:
- **Dashboard**: 12-column grid with 24px gutters
- **Sidebar filters**: Fixed 280px width on desktop, collapsible on mobile
- **Main content**: Fluid with max-width-7xl
- **Cards/Panels**: 16px padding (p-4), 24px for larger containers (p-6)

**Responsive Breakpoints**:
- Mobile: < 640px (single column, stacked layout)
- Tablet: 640-1024px (2-column where appropriate)
- Desktop: > 1024px (full dashboard layout with sidebar)

### D. Component Library

**Institutional Header**:
- Full-width navy background (220 70% 25%)
- Police badge (brasão) on left, 48px height
- Three-line text hierarchy: SSP → Polícia Civil → Corregedoria
- White text, centered alignment, 16px vertical padding

**Dashboard Controls**:
- **Filter Panel**: Card-based, sticky sidebar with dropdowns for Departamento, Unidade, Tipo de Droga, Período
- **Action Buttons**: Primary (upload Excel), Secondary (inserir manual), icon buttons for export
- **Search Bar**: Prominent, full-width with icon, 48px height

**Data Visualization**:
- **Map Component**: Interactive Bahia map, min-height 500px, markers color-coded by quantity
- **Charts**: Bar charts for drug types, line charts for timeline, pie for distribution
- **KPI Cards**: Large numbers (36px), labels below, colored left border for categories
- **Data Table**: Striped rows, sortable headers, fixed header on scroll, 14px row height

**Forms & Inputs**:
- **Upload Zone**: Dashed border, 200px height, drag-drop with Excel icon
- **Manual Entry Form**: Two-column layout, floating labels, validation states
- **Dropdowns**: Material-style with chevron, max-height 300px scrollable

**Navigation**:
- Breadcrumb trail below header (SSP > PC > Corregedoria > Dashboard)
- Tab navigation for different views (Visão Geral, Mapa, Relatórios, Dados)

### E. Interaction Patterns

**Data Loading**:
- Skeleton screens for initial load
- Progressive disclosure for large datasets
- Toast notifications for upload success/errors

**Map Interactions**:
- Zoom controls, pan enabled
- Cluster markers for dense areas
- Tooltip on hover with caso details
- Click to filter dashboard by location

**Filters**:
- Real-time updates (no submit button)
- Clear all filters button
- Active filter chips displayed above content
- Animated transitions (150ms ease)

**Animations**: Minimal, professional
- Smooth scrolling for anchors
- Fade-in for new data (200ms)
- Scale hover on cards (1.02)
- No distracting effects

---

## Dashboard-Specific Elements

**Geo-Location Map**:
- Leaflet or Mapbox integration with Bahia boundaries
- Pin locations at major cities: Salvador, Feira de Santana, Vitória da Conquista, Ilhéus, Juazeiro
- Heat map overlay option for density visualization
- Legend showing marker colors/sizes

**Statistics Grid** (above fold):
- Four KPI cards: Total Apreensões, Quantidade Total (kg/unidades), Unidades Envolvidas, Casos Recentes (30 dias)
- Large bold numbers, subtle icons, percentage changes

**Chart Section**:
- Horizontal bar chart: Tipos de Droga (Cocaína, Maconha, Crack, etc.)
- Line chart: Timeline mensal de apreensões
- Donut chart: Distribuição por Departamento

**Data Table**:
- Columns: Data, Unidade, Departamento, Tipo de Droga, Quantidade, Status
- Export to Excel/PDF buttons
- Pagination (50 rows per page)
- Row click expands for full details

---

## Images

**Institutional Badge**: 
- Brasão da Polícia Civil da Bahia placed top-left of header, 48px height, white/transparent background version
- High-resolution PNG or SVG format

**Map Background**:
- Cartographic style map of Bahia state with clear municipality boundaries
- Neutral color scheme (grays/blues) to not compete with data markers
- Subtle topographic details

**No Hero Image**: This is a data dashboard, not a marketing page. Focus remains on functional data display.
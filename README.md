# Searchable + Paginated Data Table

A high-performance React + TypeScript data table with search, sorting, pagination, and multi-field filtering capabilities.

## Features

### Core Functionality
- **Client-side pagination** with 20 records per page
- **Multi-column sorting** (ascending/descending) on all columns
- **Real-time search** across all fields (ID, name, category, status, createdAt)
- **Multi-select filters** for Category and Status
- **Debounced search** with 300ms delay (custom implementation)
- **Loading states** with spinner animation
- **Empty states** with helpful messaging

### UI/UX Highlights
- Clean, modern interface with smooth transitions
- Responsive design that works on all screen sizes
- Color-coded status badges
- Hover effects and visual feedback
- Smart pagination with ellipsis for large page counts
- Clear visual indicators for active filters and sort direction

## Data Structure

Each record contains:
```typescript
interface DataRecord {
  id: string;          // Format: REC-00001
  name: string;        // Product/item name
  category: string;    // One of 8 categories
  status: string;      // Active, Inactive, Pending, or Archived
  createdAt: string;   // ISO date format (YYYY-MM-DD)
}
```

**Mock Data:**
- 500 records generated with realistic variety
- 8 categories: Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food & Beverage, Health & Beauty
- 4 statuses: Active, Inactive, Pending, Archived
- Dates ranging from 2022 to present

## Technical Architecture

### Project Structure
```
src/
├── components/
│   ├── DataTable.tsx      # Main table component with state management
│   ├── SearchBar.tsx      # Reusable search input
│   ├── MultiSelect.tsx    # Multi-select dropdown filter
│   └── Pagination.tsx     # Pagination controls
├── utils/
│   ├── dataUtils.ts       # Data manipulation functions
│   └── debounce.ts        # Custom debounce implementation
├── types/
│   └── data.ts            # TypeScript interfaces
├── data/
│   └── mockData.ts        # Mock data generation
└── App.tsx                # Main application
```

### Key Implementation Details

**Custom Debounce Function:**
- Manual implementation without external libraries
- 300ms delay for optimal UX
- Proper cleanup of timeouts

**Data Processing Pipeline:**
1. Search filtering (across all fields)
2. Multi-field filtering (category + status)
3. Sorting (by selected column and direction)
4. Pagination (slice to current page)

**Performance Optimizations:**
- `useMemo` for expensive computations
- `useCallback` for stable function references
- Efficient array methods (filter, sort, slice)
- Minimal re-renders through proper state management

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (typically http://localhost:5173)

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory.

## Usage

1. **Search**: Type in the search bar to filter across all fields
2. **Sort**: Click any column header to sort (click again to reverse)
3. **Filter**: Use the Category and Status dropdowns to filter records
4. **Navigate**: Use pagination controls at the bottom to browse pages

## Technology Stack

- **React 18** with hooks
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Assumptions

1. All data operations are performed client-side (no API calls)
2. Mock data is generated once on load and remains static
3. Page size is fixed at 20 records per page
4. Search is case-insensitive and matches partial strings
5. Filters are additive (both category and status filters apply together)
6. Date format is YYYY-MM-DD for consistency and sortability

## Future Improvements

With more time, I would add:

1. **Column Management**
   - Toggle column visibility
   - Reorder columns via drag and drop
   - Column resizing

2. **Advanced Features**
   - Export to CSV/Excel
   - Bulk actions (select multiple rows)
   - Date range filtering
   - Save filter presets
   - Keyboard shortcuts for navigation

3. **Performance**
   - Virtual scrolling for very large datasets
   - Web Workers for heavy data processing
   - Lazy loading with infinite scroll option

4. **Persistence**
   - Save user preferences (filters, sort, page size) to localStorage
   - URL state synchronization for shareable filtered views

5. **Testing**
   - Unit tests for utility functions
   - Component tests with React Testing Library
   - E2E tests with Playwright

6. **Accessibility**
   - Enhanced keyboard navigation
   - Screen reader optimization
   - ARIA labels and roles



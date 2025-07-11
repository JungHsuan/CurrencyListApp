# Currency List App

A React Native application for displaying and searching cryptocurrency and fiat currency lists with intuitive filtering capabilities.

## Features

- 📱 Cross-platform support (iOS & Android)
- 💰 Display cryptocurrency and fiat currency lists
- 🔍 Real-time search functionality with debouncing
- 🛒 Show purchasable currency listings
- 📊 Data management (insert, clear, filter)
- ✨ Clean and intuitive user interface

## Project Structure

```
CurrencyListApp/
├── src/
│   ├── components/          # React components
│   │   ├── CurrencyListFragment.tsx
│   │   └── Button.tsx
│   ├── hooks/              # Custom hooks
│   │   └── useCurrencyData.tsx
│   ├── utils/              # Utility functions
│   │   └── searchUtils.ts
│   ├── types/              # TypeScript type definitions
│   └── assets/             # Static assets
├── __tests__/              # Test files
├── __mocks__/              # Mock data
└── App.tsx                 # Main application component
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd CurrencyListApp
```

2. Install dependencies

```bash
yarn install
```

3. iOS setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### Running the Application

#### Start Metro Server

```bash
yarn start
```

#### Android

```bash
yarn android
```

#### iOS

```bash
yarn ios
```

## Component Overview

### App.tsx

Main application entry point featuring:

- Data management buttons (clear, insert, filter)
- Currency list display via `CurrencyListFragment`

### CurrencyListFragment

Reusable currency list component with:

- Currency list rendering
- Search functionality with debouncing
- Empty state handling
- Customizable filtering logic

### useCurrencyData Hook

Custom hook responsible for:

- Managing currency data state
- Providing filter functions (crypto, fiat, purchasable)
- Data insertion and clearing operations

## Testing

Run the test suite:

```bash
yarn test
```

## API Reference

### CurrencyInfo Type

```typescript
interface CurrencyInfo {
  id: string;
  name: string;
  symbol: string;
  code?: string;
  purchasable?: boolean;
}
```

### useCurrencyData Hook Methods

- `listData`: Current currency data array for the fragment
- `clearData()`: Clear all currency data
- `insertData()`: Insert mock currency data
- `setDataWithCryptoList()`: Filter to show only cryptocurrencies
- `setDataWithFiatList()`: Filter to show only fiat currencies
- `setDataWithPurchasable()`: Filter to show only purchasable currencies

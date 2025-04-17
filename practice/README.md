# React Native Practice

## Overview

- This document provides the plan, requirements and estimation for React Native Practice.
- Build Furniture Shopping app

## Target

- Apply React Navigation
- Storybook is required
- Unit test coverage should be greater than 80%
- Building an APK (Android Package) can be a valuable part of practice for trainees
- Apply Zustand, React Query

## Technical Stack

- React Native
- React Navigation
- Typescript
- Zustand
- React Query
- Jest
- Testing-library/react-native

## Prerequisites

Ensure sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) instructions till "Creating a new application" step, before proceeding.

- **Notes**: If you previously installed a global react-native-cli package, please remove it as it may cause unexpected issues.
  ```bash
  npm uninstall -g react-native-cli @react-native-community/cli
  ```

### Installation

1. **Clone the repository:**
   ```bash
   git@gitlab.asoft-python.com:thao.ha/react-native-training.git
   ```
2. **Install dependencies:**

```bash
 cd practice
```

```bash
npm install
```

**Additional step for iOS**

```bash
npx pod-install
```

- If you are having trouble with iOS, try to reinstall the dependencies by running:

  1.  `cd ios` to navigate to the `ios` folder.

  2.  `bundle install` to install **Bundler**
  3.  `bundle exec pod install` to install the iOS dependencies managed by CocoaPods.

3. **Run the application:**

   ```bash
   npm run android
   # or
   npm run ios
   ```

## Requirements

- [Link](https://docs.google.com/document/d/1iOrtyBLFxhoJ8EmgO10ljGIv_sjasS5KZf-mfo_NEtQ/edit?tab=t.0)

## Features

- Users can see Boarding screen
- Users can log in
- Users can see a list of products
- Horizontal scrolling category
- Users can see product details
  - Swipe effect for image
- Users can add a product to the cart
- Users can update the quantity of products in the cart
- Users can remove the product from the cart
- Check out product

## Folder Structure

```
react-native-template
├── .storybook             # Storybook configuration
├── android                # Android-specific files
├── ios                    # iOS-specific files
├── src
│   ├── assets         # Assets (images, fonts, etc.)
│   ├── components         # Reusable components with unit tests and storybook
│   ├── configs            # Configuration files for various services and settings
│   ├── constants          # Constant values used throughout the app
│   ├── hooks              # Custom hooks
│   ├── interfaces         # TypeScript interfaces and types
│   ├── navigation         # Navigation configuration
│   ├── screens            # Screen components
│   ├── services           # API services
│   └── utils              # Utility functions
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── app.json               # App configuration
├── App.tsx                # Main App component
├── babel.config.js        # Babel configuration
├── index.js               # App entry point
├── jest-setup.ts          # Jest additional setup
├── jest.config.js         # Jest configuration
├── metro.config.js        # Metro configuration
├── package.json           # Project dependencies
├── react-native.config.js # Custom configuration for React Native CLI
├── test-utils             # Setup custom render for testing library
└── tsconfig.json          # TypeScript configuration file
```

# Study Topic Randomizer

A cross-platform application for randomly selecting study topics to focus on each day. Built with React Native and Expo.

![Study Topic Randomizer](./assets/images/icon.png)

## Features

- **Random Topic Selection:** Randomly select topics to study from different categories
- **Customizable Topic Lists:** Add, remove, and manage your own study topics
- **Study History:** Keep track of previously selected topics with timestamps
- **Local Storage:** All your data is saved to your device's local storage
- **Dark/Light Mode Support:** Automatic system theme detection with tailored UI
- **Cross-Platform:** Works on iOS, Android, and Web

## Screenshots

*[Insert screenshots here]*

## Technologies Used

- [React Native](https://reactnative.dev/) - Mobile framework
- [Expo](https://expo.dev/) - Development platform
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations
- [LocalStorage](https://reactnative.dev/docs/asyncstorage) - For persisting data

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CruiseDevice/Study-Topic-Randomizer.git
   cd Study-Topic-Randomizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

## Usage

1. **Select a Category:** Choose between System Design topics or Interview topics
2. **Get a Random Topic:** Click the "Select Random Topic" button to get your study focus for the day
3. **Add Custom Topics:** Add your own topics to either category
4. **Remove Topics:** Remove topics you've mastered or don't want to study
5. **Track Progress:** View your study history to see what you've been focusing on

## Project Structure

```
study-topic-randomizer/
├── app/                   # Main application code with file-based routing
│   ├── _layout.tsx        # Root layout configuration
│   ├── (tabs)/            # Tab navigator screens
│   └── +not-found.tsx     # 404 page
├── assets/                # Images, fonts, and other static assets
├── components/            # Reusable UI components
│   ├── ui/                # UI primitives
│   └── ...                # Other components
├── constants/             # App constants and theme definitions
└── hooks/                 # Custom React hooks
```

## Customization

### Adding New Categories

To add a new category of study topics:

1. Update the state in `StudyTopicRandomizer.tsx` to include a new array for your category
2. Add a new tab trigger in the TabsList component
3. Create a new TabsContent component for the category
4. Add the necessary state handling for your new category

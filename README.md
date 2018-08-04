# rn-star-wars

A React Native STAR WARS.

The app uses the Star Wars API (http://swapi.co) to fetch the resources.

## App description (the app has two screens)

### Screen 1 (Login Screen)
Allows the user to login as a character from STAR WARS using the character name as the username and birth year as the password.

Example:

  + Username: Luke Skywalker
  + Password : 19BBY

### Screen 2 (Search Screen)
A type-along search which searches for planets and lists them in components with a font size relative to their population on every keypress in the input field.
On clicking the item from the results of the type-along search, the corresponding planet information is displayed.

  + Only the user Luke Skywalker is able to make more than 15 searches in a minute.

## App Demo:

![](https://thumbs.gfycat.com/SmoggyTerrificBetafish-size_restricted.gif)

## Installation

Be sure to have React Native installed.

### Prerequisites:
```
You must have Xcode, Android Studio (Command line tools), React Native, npm and nodejs installed.
```

### To install the prerequisites (macOS only)
```
1. Install Homebrew:

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. Install nodejs:

    brew install node

3. Install React Native globally:

    npm install -g react-native-cli
```

### To use the application:
``` 
1. Clone the project:

    git clone https://github.com/atalakey/rn-star-wars.git ~/Desktop/rn-star-wars

2. Navigate to where you cloned the project:

    cd ~/Desktop/rn-star-wars

2. Install App local packages:

    npm install
```

## Run the App

### iOS

```
react-native run-ios
```

### Android

```
react-native run-android
```

# Disclaimer:
This app is for demo purposes only.

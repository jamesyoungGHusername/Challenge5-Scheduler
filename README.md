# 05 Third-Party APIs: Work Day Scheduler
# Challenge 5
## Description
A simple javascript workday scheduler, allows users to write in events throughout the day, and has a visual indication of which time block is currently the present.
Can be used for multiple days, and was designed with the intent of allowing expandability.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
This project is live on github pages, and the code can be viewed on the repo.


* [github repo here](https://github.com/jamesyoungGHusername/Challenge5-Scheduler)

* [github pages deployment here](https://jamesyoungghusername.github.io/Challenge5-Scheduler/)

## Usage
This webpage allows a user to enter and save events to be displayed later. A user cannot overwrite events, and cannot display more than one event per block in a day. Each event object saved in memory has a distinct moment associated with it, and the program therefore can save more than one event per time block, but the page doesn't have to logic to display that.

When the page loads the text at the top displays the current time.

![Page loaded](./Assets/Images/Screen%20Shot%202022-08-14%20at%203.22.25%20PM.png)

Then the user can enter an event, or view previously saved events.

![Event list](./Assets//Images//Screen%20Shot%202022-08-14%20at%203.22.18%20PM.png)


## Credits
Event system was based on the Swift EventKit library.

## License
MIT license.
# Matchup Cafe

This project was created to generate unique pairings between students for Matchup Cafe events.

## User notes
Everything is stored in browser's local storage, so switching between devices or browsers, will NOT carry over your data. Also be careful about clearing site data in browser's settings, as that **WILL ERASE EVERYTHING**.  
The generation timeout is set to 10s, since it is impossible to know if there's a pairing available beforehand when using this algorithm. If a generation fails (returns empty list), run it again. If it fails multiple times, there is no possible matchup for everyone to have a new partner.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


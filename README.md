# TableTube

A themed YouTube client focused on Warhammer and tabletop gaming. The app fetches videos, channel information and comments from the YouTube Data API v3 and shows them in a dark, Warhammer-inspired interface. Built with React as a course project.

By [Alexander Jonasson](https://github.com/alexanderjonasson).

## Features

- Home page with videos grouped by category (Home, Gaming, Entertainment, Music, Lore) plus themed categories in the sidebar
- Debounced search, so not every keystroke triggers an API request
- Video page with an embedded player, channel info, views/likes and comments sorted by most likes
- Related videos on the same topic
- Collapsible sidebar
- Results are cached for 15 minutes to save YouTube API quota, and older cached results are used as a fallback if a request fails
- Clear error messages, including when the API quota is used up
- Responsive layout and keyboard support in the navigation and sidebar

## Tech stack

- React 18
- React Router 6
- Vite
- YouTube Data API v3

## Getting started

You need Node.js and a YouTube Data API v3 key (create one in the Google Cloud Console).

```bash
npm install
```

Create a `.env` file based on `.env.example`:

```
VITE_YOUTUBE_API_KEY=your_key_here
```

Start the development server:

```bash
npm run dev
```

Other commands: `npm run build`, `npm run preview` and `npm run lint`.

To serve the app from a sub-path, for example on a school server, build with `npm run build -- --base=/my/path/`.

## Deployment

The app is a plain static site and can be hosted on, for example, Netlify or Vercel (build command `npm run build`, output directory `dist`). Add `VITE_YOUTUBE_API_KEY` as an environment variable at your host and add the site's address to the key's allowed websites in the Google Cloud Console. `public/_redirects` (Netlify) and `vercel.json` (Vercel) make direct links to a video page work.

## Project structure

```
src/
  api/youtube.js          All YouTube API requests, error handling and cache usage
  utils/cache.js          Cache with expiry (localStorage)
  utils/format.js         Formatting of counts and time ("1K", "2 years ago")
  data/categories.js      Categories and their search queries
  hooks/
    useVideos.js          Fetches a list of videos for a search query
    useVideoDetails.js    Fetches video, channel and comments
  components/             Navbar, Sidebar, Feed, PlayVideo, Recommended, ErrorState
  pages/                  Home, Video, About
```

## About the API key and quota

The app runs entirely in the browser, and every `VITE_` variable ends up in the public JavaScript bundle. Restrict the key in the Google Cloud Console to the YouTube Data API v3 and to the site's address (HTTP referrer).

Each search costs 100 of the 10,000 quota units a free account gets per day. When the quota runs out an error message is shown, except for searches that are already cached.

## Possible improvements

- A serverless function as a proxy for API requests so the key is not exposed
- Prepared sample data as a fallback when the quota is used up
- Tests for the API module and the formatting helpers
- Migrate to TypeScript

TableTube is a fan project and is not affiliated with or endorsed by Games Workshop or YouTube.

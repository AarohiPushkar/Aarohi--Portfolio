# Aarohi Pushkar | Personal Portfolio

A dark-themed, animated personal portfolio with project search/filter, a light/dark toggle and an AI chatbot that answers questions about my skills and projects.

**Live website:** https://YOUR-PROJECT.vercel.app  <!-- replace after deploying on Vercel -->
**GitHub:** https://github.com/AarohiPushkar

## Technologies
HTML5, CSS3, JavaScript (vanilla), Vercel serverless function (Node.js), Google Gemini API, GitHub, Vercel, Cursor AI.

## Sections
Home, About Me, Skills, Projects, Contact Information, AI Chatbot.

## Features
- Animated particle background, typing effect, scroll reveal, skill bars, count-up stats and 3D hover cards
- Dark theme by default, with a Light/Dark mode toggle (remembered between visits)
- **Project search and filter**: type a name or technology (for example "Python", "Quiz", "Book") or click a technology chip
- Five project cards with description, technologies, GitHub repo link and live link where available
- **AI chatbot** grounded in my portfolio information; shows a clear error message if the API request fails
- Responsive layout for desktop and mobile

## Project structure
```
index.html      page structure
style.css       all styling (no inline styles)
script.js       projects data, search/filter, theme, animations, chatbot UI
api/chat.js     Vercel serverless function that calls the AI API
.env.example    shows the required environment variable (no real key)
```

## Setup (run locally)
1. Clone the repo: `git clone https://github.com/AarohiPushkar/<repo-name>.git`
2. To view the page only, open `index.html` in a browser (the chatbot needs the server function, so it will show its error message).
3. To test the chatbot locally: install the Vercel CLI (`npm i -g vercel`), copy `.env.example` to `.env.local`, add your API key, then run `vercel dev`.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New > Project**, import the repository and keep the default settings.
3. In **Settings > Environment Variables** add `GEMINI_API_KEY` with your key (never commit it), then redeploy.
4. Open the live URL and test: project links, search, the theme toggle, the chatbot, and desktop/mobile layouts.

## Customising
Edit the config block at the top of `script.js`: project repo links, live links and contact email. Put a photo at `assets/profile.jpg` to replace the initials badge.

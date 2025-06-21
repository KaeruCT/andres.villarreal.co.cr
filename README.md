# andres.villarreal.co.cr

A modern, bilingual personal website and resume showcasing my professional experience, skills, and projects. Built with Next.js and TypeScript, featuring a clean, responsive design with dark/light mode support.

🌐 **Live Site**: [andres.villarreal.co.cr](https://andres.villarreal.co.cr/)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) ^15.1.6
- **Frontend**: [React](https://reactjs.org/) ^19.0.0 with TypeScript
- **Styling**: SCSS with CSS variables for theming
- **Content**: Markdown files with [react-markdown](https://github.com/remarkjs/react-markdown)
- **Deployment**: [Vercel](https://vercel.com/)

## Prerequisites

- Node.js 18.0 or later
- npm

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/andres.villarreal.co.cr.git
   cd andres.villarreal.co.cr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Development

### Running the Development Server

Start the development server with hot reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm run start` - Starts the production server (requires build first)

### Project Structure

```
├── _content/           # Markdown content files
│   ├── en/            # English content
│   └── es/            # Spanish content
├── components/        # React components
├── lib/              # Utility functions
├── pages/            # Next.js pages
├── public/           # Static assets (images, icons)
└── styles/           # SCSS stylesheets
```

## License

This repository uses a dual licensing approach:

### Code (MIT License)
All source code files (JavaScript, TypeScript, HTML, CSS, configuration files, and build tooling) are licensed under the [MIT License](LICENSE).

### Content (CC BY 4.0)
All non-code assets including content in `/_content/`, images in `/public/`, and other media files are licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-content).

See the [NOTICE](NOTICE) file for detailed information about which files fall under each license.

**Attribution**: When reusing any content from this repository, please provide appropriate credit to Andrés Villarreal as required by the respective licenses.
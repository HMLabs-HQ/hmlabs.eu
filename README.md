# main-site

The main website for [henrymeyer.de](https://henrymeyer.de), built with [Next.js](https://nextjs.org).

## Tech stack

- [Next.js](https://nextjs.org) / React
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
- [Radix UI](https://www.radix-ui.com) primitives in [`src/components/ui`](./src/components/ui)
- [Three.js](https://threejs.org)

## Getting started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command                 | Description                   |
| ----------------------- | ----------------------------- |
| `npm run dev`           | Start the development server  |
| `npm run build`         | Create a production build     |
| `npm run start`         | Serve the production build    |
| `npm run lint`          | Run ESLint                    |
| `npm run audit:runtime` | Audit production dependencies |

`npm audit` currently reports an upstream vulnerability in `braces`, pulled in
only by the Next.js ESLint configuration. The available npm fix downgrades
`eslint-config-next` to an incompatible Next.js 14 release. Use
`npm run audit:runtime` to verify the dependencies included in deployment; it
currently reports no vulnerabilities.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the required values.

## Deployment

The site is deployed on [Vercel](https://vercel.com); see `vercel.json` for configuration.

## License

Refer to the [LICENSE](./LICENSE) file in this directory.

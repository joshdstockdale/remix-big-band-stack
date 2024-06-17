# Remix Big Band Stack

![The Remix Big Band Stack](https://github.com/joshdstockdale/remix-big-band-stack/blob/main/public/hero.png)

Remix TypeScript with Drizzle, PostgreSQL, Docker deploy to Fly.io, shadcn/ui TailwindCSS.

## Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## DB (Postgres)

Rename .env.sample > .env
Enter DATABASE_URL

Drizzle Migrate DB:

```
npm run db:generate
npm run db:migrate
```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

## Fly

First time

```
fly auth signup
fly launch
```

After set up

```
fly deploy
```

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

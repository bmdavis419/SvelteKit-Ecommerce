# SvelteKit E-Commerce Site: Sediment Art

This is a real world e-commerce site which uses Stripe for payments and Cloudinary for image hosting. It is built with SvelteKit and TypeScript, and will be used in the real world (*soon*).

## The Stack

- ⚙️ [SvelteKit]("https://kit.svelte.dev/docs/introduction"): Full stack JS framework that handles our server and client side code
- 💦 [Drizzle]("https://orm.drizzle.team/docs/overview"): Lightweight high power ORM for interfacing with our DB
- 🌩️ [Cloudinary]("https://svelte.cloudinary.dev/"): Image hosting and manipulation
- 💳 [Stripe]("https://stripe.com/docs"): Payment processing
- 💽 [PlanetScale]("https://planetscale.com/"): Cloud hosted MySQL database (with data branching)
- 🚀 [Vercel]("https://vercel.com/home"): Serverless hosting
- 🎨 [ShadCN for Svelte]("https://www.shadcn-svelte.com/"): Beautifully designed components
- 🖌️ [TailwindCSS]("https://tailwindcss.com/docs/installation"): Inline styles
- 🔒 [Lucia V3]("https://v3.lucia-auth.com/"): Authentication library and OAuth helpers
- 📦 [Pnpm]("https://pnpm.io/"): Package manager

## Getting Started

In order to run this project you will need to setup **Cloudinary, Stripe, GitHub OAuth, and PlanetScale**.

### Cloudinary

1. Create a Cloudinary account: https://cloudinary.com/users/register_free
2. Create a new Cloudinary project, and add the cloud name to your ```.env```:
```VITE_PUBLIC_CLOUDINARY_CLOUD_NAME="your env here"```
3. [Create a new upload preset]("https://cloudinary.com/documentation/upload_presets#managing_upload_presets_using_the_settings_ui"), and add the preset name to your ```.env```:
```PUBLIC_CLOUDINARY_UPLOAD_PRESET="your env here"```
4. Add your images into your cloudinary account, then insert them into the ```seed.ts``` file where it is marked "TODO CLOUDINARY:"

### PlanetScale

1. Create a PlanetScale account: https://app.planetscale.com
2. Create a new database, then add your DB credentials to the ```.env``` file (you can find the credentials under the "Connect" tab in PlanetScale):
```DATABASE_HOST="your env here"```
```DATABASE_USERNAME="your env here"```
```DATABASE_PASSWORD="your env here"```
3. Get a database connection string (from the same place) and add it to your ```.env``` (it will be under "NodeJS"):
```DATABASE_CONNECTION_STRING="mysql://your env here"```
4. Apply the schema to your database with ```pnpm run db:push```
5. Wait to seed the database until your setup stripe

### Stripe

1. Create a Stripe account: https://dashboard.stripe.com/register
2. Get your (TEST) public and secret keys, and add them to the ```.env```:
```PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."```
```STRIPE_SECRET_KEY="sk_test_..."```
3. Create your products in stripe, then add them to the ```seed.ts``` file where it is marked "TODO STRIPE:" (it is also a good idea to change the products, prices, and images in the ```seed.ts``` file to match your own products)
4. Install the stripe CLI and get webhook signing secret: https://stripe.com/docs/stripe-cli, then add it your your ```.env```:
```STRIPE_WEBHOOK_SECRET="whsec_..."```

### GitHub OAuth

1. Create a new GitHub OAuth app: https://github.com/settings/developers, make sure you set the redirect url to ```http://localhost:5173/auth/callback/github```
2. Add your client id and secret to the ```.env```:
```GITHUB_CLIENT_ID="your env here"```
```GITHUB_CLIENT_SECRET="your env here"```

### Run the project

1. Install the dependencies with ```pnpm i```
2. Run the project with ```pnpm run dev```

## Contributors

*Thanks to all who have helped out and made this project possible!*

- [llmaboi](https://github.com/llmaboi)
- [Peter Buschenreiter](https://github.com/Peter-512)
- [Miguel Gargallo](https://github.com/miguelgargallo)

## License

You are free to use this code as you wish, just not any of the images or text for sediment art. If you do use this code, please give credit to this repo and the contributors.
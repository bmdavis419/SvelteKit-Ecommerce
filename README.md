## All the Stripe Ids that Matter

- lineItemId: id of a line item in stripe checkout ("li_1OAF...")
- priceId: the price id of a product in stripe,
not the actual id of the product itself ("price_1OAF...")
- productId: the id of a product in stripe ("prod_1OAF...")
- checkoutId: the id of a checkout session in stripe ("cs_test_...")

## Versions of this project

Currently in its current form we are implementing everything from scratch, this is great for demonstration purposes, but is not really practical. 

The idea is to make a super bare bones version with core functionality that we can put live, then create a second version that uses something like MedusaJS to handle the CMS and more.

## Setting up a local db

This project includes a basic system for setting up a local db, in this case we are using LibSQL, so our DB will be a file called ```local.db```. To set this up do the following:

1. Update your ```seed.ts``` file to have the correct ids in it for Stripe and Cloudinary.
2. Create your database with ```pnpm run push```
3. Seed your database with ```pnpm run seed```
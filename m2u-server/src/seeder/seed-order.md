# Seeding Order

## Seed - /src/seeder/index.ts

-   /src/seeder/0001/index.ts - That file seeds the user role names and user role id from roles folder in batabase, user permissions data from the user permissions folder in database, Static cities data from static cities folder in batabase.

-   /src/seeder/0002/index.ts - That file seeds the admin user data from users folder in batabase and admin user login email admin@gmail.com and password 12345, doctor categories data from doctor categories folder in batabase, healthcenter categories data from healthcenter categories folder in batabase, job categories data from job categories folder in database,subscription plan details data from plans folder in database and you can able to edit the subscription plan from admin user profile page at plans section.

# Seeder Command

```
yarn seed   /- Can seed the data from the database

yarn seed -d   /- Can delete all seeded data from the database
```

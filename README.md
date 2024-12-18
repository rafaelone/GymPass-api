# App

GymPass Style App

## RFs

- [] Should be able to registered;
- [] Should be able to authenticated;
- [] Should be able to get a logged user profile;
- [] Should be able to get a number of check-ins by logged user;
- [] Should be able to get a history of check-ins;
- [] Should be able for users to search for nearby gyms;
- [] Should be able for user to search gyms by name;
- [] Should be able for user to check in at a gym;
- [] Should be able validate a user check-in;
- [] Should be able to register a new gym;

## RNs

- [] The user must not be able to register with a duplicate email;
- [] The user cannot make 2 check-ins on the same day;
- [] The user cannot check-in if he/she is not close (100m) to the gym
- [] The check-in can only be validated up to 20 minutes after being created;
- [] The check-in can only be validated by administrators
- [] The gym can only be registered by administrators

# RNFs

- [] The user password must be encrypted
- [] Application data must be persisted in a PostgreSQL database
- [] All data lists must be paginated with 20 items per page

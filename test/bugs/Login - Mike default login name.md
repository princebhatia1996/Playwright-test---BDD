## Bug - Mike keeps showing when you try to login as the username

#### We should not be showing any username when we login, refresh the page or when we log out

### Expected behavior

I expect the username field to be empty when we login, refresh the login page or when we logout

### Current behavior

Mike keeps populating the username field when we login, refresh the login page or when we logout

### Steps to reproduce the bug

1. Login into the app
2. Observe the username field populated with Mike

### Environment

Happening when I run the App locally. I don't have access to Prod environment to verify if it happening there.

### Severity

High impact as we don't know who mike is and don't want to leak any usernames to people.

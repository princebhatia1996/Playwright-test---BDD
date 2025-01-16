import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { Login } from "../pom/Login";
import { CustomWorld } from "../support/custom-world";
import { expect } from "@playwright/test";

Given("I am logged in with valid credentials as {string}", async function (this: CustomWorld, username: string) {
  const loginPage = new Login(this);
  const validPassword = "findex";
  await loginPage.loginAs(username, validPassword);
});

Given("I am on the login page", async function (this: CustomWorld) {
  await this.page.getByRole("heading", { name: "Log in" }).waitFor({ state: "visible" });
});

When("I fill in the login form with:", async function (this: CustomWorld, dataTable: DataTable) {
  const loginPage = new Login(this);
  const data = dataTable.rowsHash();
  await loginPage.login(data["Username"], data["Password"]);
});

Given("I click the log in button", async function (this: CustomWorld) {
  const loginPage = new Login(this);
  await loginPage.loginButtonOnPage();
});

Then("I should see the welcome message Welcome {string}", async function (this: CustomWorld, welcomeUsername: string) {
  await expect(this.page.getByRole("heading", { name: `Welcome ${welcomeUsername}` })).toBeVisible();
});

Then("I should see the error message", async function (this: CustomWorld) {
  const loginPage = new Login(this);
  await loginPage.getErrorMessage();
});

Then("I should remain on the login page", async function (this: CustomWorld) {
  const loginPage = new Login(this);
  await loginPage.remainOnLoginPage();
});

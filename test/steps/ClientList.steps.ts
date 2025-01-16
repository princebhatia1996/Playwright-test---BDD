import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { ClientList } from "../pom/ClientList";
import { Login } from "../pom/Login";
import { ICustomWorld } from "../support/custom-world";

Given("I am on the client list page", async function (this: ICustomWorld) {
  await this.page.getByRole("heading", { name: "Clients" }).waitFor({ state: "visible" });
});

Given("I see the client {string} in the list", async function (this: ICustomWorld, clientName: string) {
  const clientList = new ClientList(this);
  const clients = clientName.split(", ");
  for (const clientName of clients) {
    await clientList.getClient(clientName).waitFor({ state: "visible" });
  }
});

When("I fill in the client form with:", async function (this: ICustomWorld, dataTable: DataTable) {
  const clientList = new ClientList(this);
  const data = dataTable.rowsHash();
  await clientList.clientNameInput.fill(data["Name"]);

  await clientList.clientStatusSelect.click();
  await this.page.getByRole("option", { name: data["Status"], exact: true }).click();
});

When("I click the add client button", async function (this: ICustomWorld) {
  const clientList = new ClientList(this);
  await clientList.addClientButton.click();
});

When("I should see the client {string} in the list", async function (this: ICustomWorld, clientName: string) {
  const clientList = new ClientList(this);
  await clientList.getClient(clientName).waitFor({ state: "visible" });
});

When("I remove the client {string}", async function (this: ICustomWorld, clientName: string) {
  const clientList = new ClientList(this);
  await clientList.removeClient(clientName);
});

Then("I should not see the client {string} in the list", async function (this: ICustomWorld, clientName: string) {
  const clientList = new ClientList(this);
  await clientList.getClient(clientName).waitFor({ state: "hidden" });
});

When("I log out", async function (this: ICustomWorld) {
  const login = new Login(this);
  await login.logout();
});

Then("I should see an error message", async function (this: ICustomWorld) {
  const clientList = new ClientList(this);
  await clientList.errorAlert();
});

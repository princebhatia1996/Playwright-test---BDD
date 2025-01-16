import { Locator } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

export class ClientList {
  clientNameInput = this.world.page.getByPlaceholder("Client name");
  clientStatusSelect = this.world.page.getByRole("combobox");
  addClientButton = this.world.page.getByRole("button", { name: "Add client" });
  errorMessage = this.world.page.getByRole("alert");
  clientList = this.world.page.getByRole("table");

  constructor(public world: ICustomWorld) {}

  async openClientList(): Promise<void> {
    await this.world.page.locator("//h1").waitFor({ state: "visible" });
  }

  getClient(clientName: string): Locator {
    return this.world.page.getByRole("row", { name: clientName });
  }

  async removeClient(clientName: string): Promise<void> {
    const clientRow = this.getClient(clientName);
    await clientRow.getByRole("button").click();
  }

  async checkClientsAreNotInList(clientNames: string[]): Promise<void> {
    for (const clientName of clientNames) {
      await this.getClient(clientName).isHidden();
    }
  }

  async errorAlert(): Promise<void> {
    await this.errorMessage.isVisible();
  }
}

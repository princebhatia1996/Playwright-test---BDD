import { ICustomWorld } from "../support/custom-world";
import { expect } from "@playwright/test";

export class Login {
  usernameInput = this.world.page.locator("//input[contains(@type, 'text')]");
  passwordInput = this.world.page.locator("//input[contains(@type, 'password')]");
  loginButton = this.world.page.locator("button");
  logoutButton = this.world.page.getByRole("button", { name: "log out" });
  errorMessage = this.world.page.getByRole("alert");

  constructor(public world: ICustomWorld) {}

  async loginAs(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async loginButtonOnPage() {
    await this.loginButton.click();
  }

  async getErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
  }

  async remainOnLoginPage() {
    await this.usernameInput.isVisible();
    await this.passwordInput.isVisible();
    await this.loginButton.isVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

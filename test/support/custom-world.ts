import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import * as messages from "@cucumber/messages";
import { APIRequestContext, Browser, BrowserContext, Page, PlaywrightTestOptions } from "@playwright/test";

export interface ICustomWorld<CustomProperties = unknown> extends World {
  debug: boolean;
  context: BrowserContext;
  page: Page;

  testName?: string;
  startTime?: Date;
  feature?: messages.Pickle;

  server: APIRequestContext;
  browserRef: Browser;
  playwrightOptions?: PlaywrightTestOptions;
  store: Record<string, unknown>;
  customData: CustomProperties;
  parameters: { [key: string]: string };
}

export class CustomWorld extends World implements ICustomWorld<{ testProcessId: string | undefined }> {
  constructor(options: IWorldOptions) {
    super(options);
    this.parameters = options.parameters;
  }
  testName?: string | undefined;
  startTime?: Date | undefined;
  feature?: messages.Pickle | undefined;
  playwrightOptions?: PlaywrightTestOptions | undefined;
  z: any;
  debug = false;
  page!: Page;
  server = null;
  context!: BrowserContext;
  browserRef!: Browser;
  store = {};
  customData = { testProcessId: undefined };
  parameters;
}

setWorldConstructor(CustomWorld);

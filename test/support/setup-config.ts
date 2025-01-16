/* eslint-disable require-atomic-updates */
/* eslint-disable functional/immutable-data */
import {
    Browser,
    BrowserContext,
    BrowserContextOptions,
    Page,
    chromium,
    firefox,
    webkit,
} from "@playwright/test";
import { existsSync } from "node:fs";
import { config } from "../support/config";
import { ICustomWorld } from "../support/custom-world";

export const createBrowser = async (): Promise<Browser> => {
    switch (config.browser) {
        case "firefox":
            return await firefox.launch(config.browserOptions);
        case "webkit":
            return await webkit.launch(config.browserOptions);
        default:
            return await chromium.launch(config.browserOptions);
    }
};

export const setupStorageState = async (world: ICustomWorld, browser: Browser): Promise<void> => {
    if (existsSync("./storage-state.json")) {
        return;
    }
    const context = await browser
        .newContext({ storageState: "./storage-state.json" })
        .catch(() => browser.newContext());
    const page = await context.newPage();
    await page.goto(world.parameters.currentAppUrl).catch(async (error: Response) => {
        const isFrontendDown = error.toString().includes("ERR_CONNECTION_REFUSED");
        if (isFrontendDown && process.env["ENV"] === "local") {
            throw new Error("Could not reach the frontend. Did you start it?");
        }
        throw new Error(`Could not load page. Error: ${error.toString()}`);
    });

    await page.context().storageState({ path: "./storage-state.json" });
    await page.close();
};

export const setupConfig = async (
    world: ICustomWorld,
    definedConfig: BrowserContextOptions
): Promise<[BrowserContext, Page]> => {
    const newContext = await world.browserRef.newContext({
        acceptDownloads: true,
        storageState: "./storage-state.json",
        recordVideo: process.env["PWVIDEO"] === "1" ? { dir: "screenshots" } : undefined,
        viewport: { width: 1200, height: 800 },
        timezoneId: "Australia/Sydney",
        locale: "en-AU",
        ...definedConfig,
    });

    const page = await newContext.newPage();

    return [newContext, page];
};

/**
 * Due to the integration between cucumber and playwright, we can't use test.use to change the configuration of context,
 * for example when chaning timezones, locales, and other browser config. So we need to destroy and re-create the context
 * with the new configuration in order to test such scenarios.
 */
export const reloadConfig = async function (world: ICustomWorld, config: BrowserContextOptions): Promise<ICustomWorld> {
    if (!world.browserRef) {
        throw `
        Reload config not possible before running setupConfig.
        Are you sure you are running setupConfig on a beforeAll hook?`;
    }
    const oldUrl = world.page.url();
    await world.context.tracing.stop();
    await world.context.close();
    const [context, page] = await setupConfig(world, config);

    world.context = context;
    world.page = page;
    await world.context.tracing.start();
    await world.page.goto(oldUrl);
    return world;
};

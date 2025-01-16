/* eslint-disable functional/immutable-data */
import {
    After,
    AfterAll,
    Before,
    BeforeAll,
    ITestCaseHookParameter,
    Status,
} from "@cucumber/cucumber";
import { ChromiumBrowser, ConsoleMessage, FirefoxBrowser, WebKitBrowser } from "@playwright/test";
import { ensureDir } from "fs-extra";
import { ICustomWorld } from "./custom-world";
import { createBrowser, setupConfig, setupStorageState } from "./setup-config";

// eslint-disable-next-line functional/no-let
let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = "traces";

declare global {
    // eslint-disable-next-line no-var
    var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

BeforeAll(async function () {
    console.log("Starting browser");
    browser = await createBrowser();
    await ensureDir(tracesDir);
});

// Execute before each test, creates context, page and server, as well as tracing
Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
    this.startTime = new Date();
    this.testName = pickle.name.replace(/\W/g, "-");
    this.browserRef = browser;
    await setupStorageState(this, browser);

    const [context, page] = await setupConfig(this, {});
    this.context = context;
    this.page = page;
    await this.page.goto(this.parameters.currentAppUrl);
    await this.context.tracing.start({ screenshots: true, snapshots: true });

    this.page.on("console", async (msg: ConsoleMessage) => {
        if (msg.type() === "log") {
            this.attach(msg.text());
        }
    });
    this.feature = pickle;
});

// If feature file has @ignore tag, skip it
Before({ tags: "@ignore" }, async function () {
    return "skipped";
});

// If feature file has @debug tag, enable debug mode
Before({ tags: "@debug" }, async function (this: ICustomWorld) {
    this.debug = true;
});

// Teardown logic, closes page and context, stops tracing
After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
    if (result) {
        this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

        if (result.status !== Status.PASSED) {
            const image = await this.page?.screenshot();
            image && this.attach(image, "image/png");
            await this.context?.tracing.stop({
                path: `${tracesDir}/${this.testName}-trace.zip`,
            });
        }
    }
    this.store = {};
    await this.page?.close();
    await this.context?.close();
});

// Final teardown logic, closes browser, can have more logic in the future like sending reports or cleaning up databases
AfterAll(async function () {
    await browser.close();
});

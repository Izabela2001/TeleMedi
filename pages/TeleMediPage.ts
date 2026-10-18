import {Page} from "@playwright/test";

export class TeleMediPage{

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly buttonLogin: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.buttonLogin = page.locator('.MuiButton-containedPrimary').first();
        }

    }

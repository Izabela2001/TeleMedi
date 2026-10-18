import { expect, Locator, Page } from "@playwright/test";

export class TeleMediPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly buttonLogin: Locator;
    readonly welcomeElement: Locator;
    readonly buttonMeet: Locator;
    readonly menuButton: Locator;
    readonly formInputDragsWrapper: Locator;
    readonly formInputDragsInput: Locator;
    readonly checkAll: Locator;
    readonly buttonCancel: Locator;
    readonly buttonPay: Locator;
    readonly buttonFree: Locator;
    readonly nextButton: Locator;
    readonly confirmButton: Locator;
    readonly categoryItems: Locator;
    readonly medicineItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.buttonLogin = page.locator('.MuiButton-containedPrimary').first();
        this.welcomeElement = page.locator('.MuiAvatar-root');
        this.buttonMeet = page.locator('button.MuiButton-containedPrimary').filter({
            has: page.locator('.icon-calendar-blank')
        });
        this.menuButton = page.locator('[id="consultationNestedMenu:prescriptionHeader"]');
        this.formInputDragsWrapper = page.locator('.fk-input__select-wrapper');
        this.formInputDragsInput = page.locator('.fk-input__select-wrapper input');
        this.checkAll = page.locator('label.fk-checkbox__label[for="checkAll"]');
        this.buttonCancel = page.locator('.buttons-wrapper .fk-button--outline');
        this.buttonPay = page.locator('.footer-bar .fk-button:not(.fk-button--outline):not(.fk-button--secondary)');
        this.buttonFree = page.locator('.footer-bar .fk-button.fk-button--secondary');
        this.nextButton = page.locator('.fk-buttons-group .fk-button:not(.fk-button--outline)').first();
        this.confirmButton = page.locator('.fk-buttons-group .fk-button').filter({ hasNot: page.locator('.fk-button--outline') }).last();
        this.categoryItems = page.locator('.diseases-categories .category-item');
        this.medicineItems = page.locator('.diseases-categories .category-item');
    }

    async goto() {
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                await this.page.goto('/login');
                return;
            } catch (error) {
                if (attempt === 2) throw error;
                await this.page.waitForTimeout(250);
            }
        }
    }

    async login(email: string, pass: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.buttonLogin.click();
    }

    async chooseMeet() {
        await this.buttonMeet.click();
        await expect(this.menuButton).toBeVisible();
        await this.menuButton.click();
    }

    async writeDrags(text: string = 'acc', paymentType: 'free' | 'pay' = 'pay') {
        await this.formInputDragsInput.click();
        await this.formInputDragsInput.clear();
        await this.formInputDragsInput.pressSequentially(text, { delay: 100 });

        const firstOption = this.page.getByRole('option').first();
        await expect(firstOption).toBeVisible({ timeout: 10000 });
        await firstOption.click();

        await expect(this.checkAll).toBeVisible();
        await this.checkAll.click();

        if (paymentType === 'free') {
            await this.buttonFree.click();
        } else {
            await this.buttonPay.click();
        }
    }

    async writeDrags1(text: string = 'acc') {
        await this.writeDrags(text, 'free');
    }

    async writeDrags2(text: string = 'acc') {
        await this.writeDrags(text, 'pay');
    }

    async clickNext() {
        await expect(this.nextButton).toBeEnabled();
        await this.nextButton.click();
    }

    async confirmData() {
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
    }

    async selectCategoryByNumber(indexNumber: number) {
        const element = this.categoryItems.nth(indexNumber - 1);
        await expect(element).toBeVisible();
        await element.click();
    }

    async selectMedicineByName(medicineName: string) {
        const item = this.medicineItems.filter({
            has: this.page.locator('.item-name', { hasText: medicineName })
        }).first();

        await expect(item).toBeVisible({ timeout: 10000 });
        await item.click();
    }
}
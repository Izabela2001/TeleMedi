import { test, expect, Page } from '@playwright/test';
import {TeleMediPage} from "../pages/TeleMediPage";


test.describe('Medi TEST', () => {
    let teleMediPage: TeleMediPage;

    async function expectLoggedIn(page: Page) {
        await expect(page).not.toHaveURL(/\/login$/);
    }

    test.beforeEach(async ({ page }) => {
        teleMediPage = new TeleMediPage(page);
        await teleMediPage.goto();

        await teleMediPage.login(
            process.env.email!,
            process.env.password!
        );
        await expectLoggedIn(page);
    });

    test('Correct login', async () => {
        await expect(teleMediPage.welcomeElement).toBeVisible();
    });

    test('Appointment Successfully view', async () => {
        await teleMediPage.chooseMeet();
        await expect(teleMediPage.formInputDragsInput).toBeVisible();
    });

    test('Appointment Successfully path 1', async () => {
        await teleMediPage.chooseMeet();
        await teleMediPage.writeDrags2();
        await expect(teleMediPage.nextButton).toBeVisible();
    });

    test('Appointment Successfully path 2', async () => {
        await teleMediPage.chooseMeet();
        await teleMediPage.writeDrags1();
        await teleMediPage.clickNext();
        await teleMediPage.confirmData();
        await expect(teleMediPage.confirmButton).not.toBeVisible();
    });

    test('Appointment Successfully path 3', async () => {
        await teleMediPage.chooseMeet();
        await teleMediPage.selectCategoryByNumber(1);
        await teleMediPage.selectMedicineByName('Aerius');
        await teleMediPage.checkAll.click();
        await teleMediPage.buttonPay.click();
        await expect(teleMediPage.nextButton).toBeVisible();
    });

    test('Appointment Successfully path 4', async () => {
        await teleMediPage.chooseMeet();
        await teleMediPage.selectCategoryByNumber(1);
        await teleMediPage.selectMedicineByName('Aerius');
        await teleMediPage.checkAll.click();
        await teleMediPage.buttonFree.click();
        await teleMediPage.clickNext();
        await teleMediPage.confirmData();
        await expect(teleMediPage.confirmButton).not.toBeVisible();
    });
});
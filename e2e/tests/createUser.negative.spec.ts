import { test, expect } from "@playwright/test";
import { UsersPage } from "../pages/usersPage";

test.describe("Create a user validation", () => {
  let usersPage: UsersPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    usersPage = new UsersPage(page);
  });

  test("Gets validation error when name length is too short", async () => {
    await expect(usersPage.nameField).toBeVisible();
    await usersPage.nameField.fill("Tom");
    await expect(usersPage.nameFieldValidationError).toHaveText(
      "name is too short"
    );
  });

  test("Gets validation error when name length is too long", async () => {
    await expect(usersPage.nameField).toBeVisible();
    await usersPage.nameField.fill("Mr Tomas Chris Jn");
    await expect(usersPage.nameFieldValidationError).toHaveText(
      "name is too long"
    );
  });

  test("Create button is disabled when name field is empty", async () => {
    await usersPage.professionField.fill("QA Engineer");
    await usersPage.dobField.fill("1998-07-29");
    await usersPage.dobField.press("Enter");
    await expect(usersPage.addNewUserButton).toBeDisabled();
  });

  test("Create button is disabled when Profession field is empty", async () => {
    await usersPage.nameField.fill("Mr Tomas Chris J");
    await usersPage.dobField.fill("1998-07-29");
    await usersPage.dobField.press("Enter");
    await expect(usersPage.addNewUserButton).toBeDisabled();
  });
});

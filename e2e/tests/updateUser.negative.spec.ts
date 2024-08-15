import { test, expect } from "@playwright/test";
import { UsersPage } from "../pages/usersPage";
import { User } from "../dataClasses/user";

test.describe("Update a user validation", () => {
  let user: User;
  let usersPage: UsersPage;

  /**
   * Test Data generation is done here. Ideally should be done via API calls
   */
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    user = new User("Tomas Jackson", "Manual QA", new Date(1979, 9, 29));
    usersPage = new UsersPage(page);
    await usersPage.createUser(user);
  });

  test("Gets validation error when name length is too short", async () => {
    await usersPage.usersTable.clickEditUser(user.name);
    await usersPage.nameField.fill("Tom");
    await expect(usersPage.nameFieldValidationError).toHaveText(
      "name is too short"
    );
    await expect(usersPage.updateButton).toBeDisabled();
  });

  test("Gets validation error when name length is too long", async () => {
    await usersPage.usersTable.clickEditUser(user.name);
    await usersPage.nameField.fill("Tomas James Kane J");
    await expect(usersPage.nameFieldValidationError).toHaveText(
      "name is too long"
    );
    await expect(usersPage.updateButton).toBeDisabled();
  });

  test("Gets validation error when name field is empty", async () => {
    await usersPage.usersTable.clickEditUser(user.name);
    await usersPage.nameField.clear();
    await expect(usersPage.nameFieldValidationError).toHaveText(
      "This field is required"
    );
    await expect(usersPage.updateButton).toBeDisabled();
  });

  test("Gets validation error when profession field is empty", async () => {
    await usersPage.usersTable.clickEditUser(user.name);
    await usersPage.professionField.clear();
    await expect(usersPage.professionFieldValidationError).toHaveText(
      "This field is required"
    );
    await expect(usersPage.updateButton).toBeDisabled();
  });

  /**
   * Test Data clean up is done here. Ideally should be done via API calls.
   */
  test.afterEach(async () => {
    await usersPage.usersTable.clickDeleteUser(user.name);
  });
});

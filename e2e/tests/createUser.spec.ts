import { test, expect } from "@playwright/test";
import { UsersPage } from "../pages/usersPage";
import { format } from "date-fns";
import { UsersTableColumnNames } from "../constants/usersTableColumnNames";
import { User } from "../dataClasses/user";

test.describe("Create a user", () => {
  let usersPage: UsersPage;
  let user: User;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    usersPage = new UsersPage(page);
    user = new User("Tom Jackson", "QA Engineer", new Date(1979, 8, 16));
  });

  test("A user is able to create a new user", async () => {
    // Enter user details > Click Add User button
    await usersPage.createUser(user);

    // Verify user has been added
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.Name)
    ).toHaveText(user.name);
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.DoB)
    ).toHaveText(format(user.dob, "yyyy-MM-dd"));
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.Profession)
    ).toHaveText(user.profession);
  });

  /**
   * Test Data clean up is done here. Ideally should be done via API calls.
   */
  test.afterEach(async () => {
    await usersPage.usersTable.clickDeleteUser(user.name);
  });
});

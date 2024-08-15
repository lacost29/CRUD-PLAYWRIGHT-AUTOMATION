import { test, expect } from "@playwright/test";
import { UsersPage } from "../pages/usersPage";
import { User } from "../dataClasses/user";
import { UsersTableColumnNames } from "../constants/usersTableColumnNames";

test.describe("Delete a user", () => {
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

  test("A user is able to delete a user", async () => {
    // Delete a user
    await usersPage.usersTable.clickDeleteUser(user.name);

    // Verify user has been deleted
    const nameColumnValuesAfterDelete =
      await usersPage.usersTable.getColumnValues(UsersTableColumnNames.Name);
    await expect(nameColumnValuesAfterDelete).not.toContain(user.name);
  });
});

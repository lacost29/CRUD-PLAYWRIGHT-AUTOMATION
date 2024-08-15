import { test, expect } from "@playwright/test";
import { UsersPage } from "../pages/usersPage";
import { User } from "../dataClasses/user";
import { UsersTableColumnNames } from "../constants/usersTableColumnNames";
import { format } from "date-fns";

test.describe("Update a user", () => {
  let user: User;
  let updatedUser: User;
  let usersPage: UsersPage;

  /**
   * Test Data preparation is done here. Ideally it should be done via API calls
   */
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    user = new User("Tomas Jackson", "Manual QA", new Date(1979, 9, 29));
    updatedUser = new User(
      "Jack Stevenson",
      "Test Automation Engineer",
      new Date(1998, 8, 8)
    );
    usersPage = new UsersPage(page);
    await usersPage.createUser(user);
  });

  test("A user is able to update a user", async () => {
    // Verify initial user details in Update User form
    await usersPage.usersTable.clickEditUser(user.name);
    await expect(usersPage.userFormTitle).toHaveText("edit users");
    await expect(usersPage.addNewUserButton).not.toBeVisible();
    await expect(usersPage.updateButton).toBeVisible();
    await expect(usersPage.cancelButton).toBeVisible();
    await expect(usersPage.nameField).toHaveValue(user.name);
    await expect(usersPage.dobField).toHaveValue(
      format(user.dob, "yyyy-MM-dd")
    );
    await expect(usersPage.professionField).toHaveValue(user.profession);

    // Update user details > Click Update
    await usersPage.enterUserDetails(updatedUser);
    await usersPage.updateButton.click();

    // Verify user has been updated
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.Name)
    ).toHaveText(updatedUser.name);
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.DoB)
    ).toHaveText(format(updatedUser.dob, "yyyy-MM-dd"));
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.Profession)
    ).toHaveText(updatedUser.profession);

    // Verify Update user form is not visible
    await expect(usersPage.updateButton).not.toBeVisible();
    await expect(usersPage.cancelButton).not.toBeVisible();
    await expect(usersPage.addNewUserButton).toBeVisible();
    await expect(usersPage.userFormTitle).toHaveText("Add users");
  });

  test("A user is able to cancel update", async () => {
    // Update user details > Click Cancel
    await usersPage.usersTable.clickEditUser(user.name);
    await usersPage.enterUserDetails(updatedUser);
    await usersPage.cancelButton.click();

    // Verify user has not been updated
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.Name)
    ).toHaveText(user.name);
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.DoB)
    ).toHaveText(format(user.dob, "yyyy-MM-dd"));
    await expect(
      await usersPage.usersTable.getCell(UsersTableColumnNames.Profession)
    ).toHaveText(user.profession);

    // Verify Update user form is not visible
    await expect(usersPage.updateButton).not.toBeVisible();
    await expect(usersPage.cancelButton).not.toBeVisible();
    await expect(usersPage.addNewUserButton).toBeVisible();
    await expect(usersPage.userFormTitle).toHaveText("Add users");

    // Reassigne user to proceed with data clean up
    updatedUser = user;
  });

  /**
   * Generated test data clean up done here. Ideally it should be done via API calls
   */
  test.afterEach(async () => {
    await usersPage.usersTable.clickDeleteUser(updatedUser.name);
  });
});

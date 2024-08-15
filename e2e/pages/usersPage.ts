import { Locator, Page } from "@playwright/test";
import { format } from "date-fns";
import { UsersTable } from "./pageComponents/usersTable";
import { User } from "../dataClasses/user";

export class UsersPage {
  readonly page: Page;
  readonly userFormTitle: Locator;
  readonly nameField: Locator;
  readonly nameFieldValidationError: Locator;
  readonly professionFieldValidationError: Locator;
  readonly professionField: Locator;
  readonly dobField: Locator;
  readonly addNewUserButton: Locator;
  readonly updateButton: Locator;
  readonly cancelButton: Locator;
  readonly usersTable: UsersTable;

  constructor(page: Page) {
    this.page = page;
    this.userFormTitle = page.locator("//div[@class='user-form']/h1");
    this.nameField = page.locator("[name='name']");
    this.nameFieldValidationError = page.locator(
      "//input[@name='name']/parent::div/div[@class='form-error']"
    );
    this.professionFieldValidationError = page.locator(
      "//input[@name='profession']/parent::div/div[@class='form-error']"
    );
    this.professionField = page.locator("[name='profession']");
    this.dobField = page.locator(".react-datepicker__input-container input");
    this.addNewUserButton = page.locator("//button[text()='Add new user']");
    this.updateButton = page.locator("//button[text()='Update']");
    this.cancelButton = page.locator("//button[text()='Cancel']");
    this.usersTable = new UsersTable(page);
  }

  async createUser(user: User) {
    await this.enterUserDetails(user);
    await this.addNewUserButton.click();
  }

  async enterUserDetails(user: User) {
    await this.nameField.fill(user.name);
    await this.professionField.fill(user.profession);
    await this.dobField.fill(format(user.dob, "yyyy-MM-dd"));
    await this.dobField.press("Enter");
  }
}

import { Locator, Page } from "@playwright/test";
import { UsersTableColumnNames } from "../../constants/usersTableColumnNames";

export class UsersTable {
  private static readonly BODY_ROW_SELECTOR: string = "//tbody/tr";
  private static readonly CELL_SELECTOR: string = "//td";

  readonly page: Page;
  readonly rootLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rootLocator = page.locator("//table");
  }

  async getColumnValues(columnIndex: UsersTableColumnNames): Promise<string[]> {
    return await this.rootLocator
      .locator(`//tbody//td[${columnIndex}]`)
      .allInnerTexts();
  }

  async getCell(
    columnIndex: UsersTableColumnNames,
    rowIndex?: number
  ): Promise<Locator> {
    if (rowIndex === undefined) {
      let rowCount = await this.getRowCount();
      rowIndex = rowCount - 1;
    }

    return await this.rootLocator
      .locator(UsersTable.BODY_ROW_SELECTOR)
      .nth(rowIndex)
      .locator(UsersTable.CELL_SELECTOR)
      .nth(columnIndex);
  }

  async clickEditUser(userName: string) {
    await this.rootLocator
      .locator(
        `//tbody//td[text()='${userName}']/following-sibling::td/button[text()='edit']`
      )
      .click();
  }

  async clickDeleteUser(userName: string) {
    await this.rootLocator
      .locator(
        `//tbody//td[text()='${userName}']/following-sibling::td/button[text()='delete']`
      )
      .click();
  }

  private async getRowCount(): Promise<number> {
    return await this.rootLocator.locator(UsersTable.BODY_ROW_SELECTOR).count();
  }
}

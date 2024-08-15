# Playwright Automation Tech Task

## Overview
This codebase contains a basic implementation of the Playwright testing framework for a simple web application.

## Running the Tests

1. Run the `yarn install` command to install dependencies.
2. Run the `yarn start` command to start the web application locally.
3. Run the `yarn playwright test` command to execute all Playwright tests, or run `yarn playwright test <test name>` to execute a specific Playwright test.
4. Run the `yarn playwright show-report` command to view the generated HTML report.

## Issues Found During Testing

1. **Required fields are not marked as mandatory**: The Name, Profession, and Date of Birth fields are not visually indicated as required.  
   ![image](https://github.com/user-attachments/assets/0a21ef1f-791a-42e8-beb5-e0d64206c133)

2. **Confusing required field indicators**: The Name and Profession fields are marked as required when a user enters and then clears a value in these fields. The red asterisk appears below the field, causing confusion about which field is actually required.  
   ![image](https://github.com/user-attachments/assets/9ec440ca-3b10-49a3-aa12-1b3bc1b52fc4)

3. **Inconsistent form titles**: The 'Edit User' form title is in all lowercase and incorrectly refers to multiple users instead of one. Actual result: `edit users` / Expected result: `Edit User`. Note that the same issue exists in the 'Add User' form.  
   ![image](https://github.com/user-attachments/assets/0f30ddbb-ab62-4f27-8958-fa7ad1acab16)

4. **No user notifications**: Users do not receive any notifications when a user is created, updated, or deleted. This causes accessibility and usability issues.

5. **Lack of confirmation dialogs during the delete flow**: There are no confirmation dialogs when deleting a user, which may lead to accidental data loss and poses accessibility issues.

6. **No confirmation dialogs for unsaved changes**: When a user wants to cancel the update process with unsaved changes, there is no confirmation dialog. This might result in the loss of unsaved changes.

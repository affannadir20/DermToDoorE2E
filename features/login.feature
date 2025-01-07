@Login
Feature: Successful login

  Scenario: Successful login
    Given the user navigates to "https://staging.dermtodoor.app/assetsV1/doctors/v2/login.html"
    When the user enters "drlily@dermtodoor.com" as email and "D2dportal2022!" as password
    And the user clicks the "Login" button
    Then the user should see "Dashboard" text

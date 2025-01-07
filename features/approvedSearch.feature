@SearchApproved
Feature: Successful login and search approved orders

  Scenario: Successful login and search approved orders
    Given the user is logged into
    When the user clicks on Approved button
    And the user enters "Nathan" as search parameter
    And the user click on Search button
    
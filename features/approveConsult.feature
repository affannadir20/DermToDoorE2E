@approveConsult
Feature: Successful login, search order and approve consult

  Scenario: Successful login, search order and approve consult
    Given the user is loged
    When the user clicks the Pending button
    And the user enters "7620981218" as search value
    And the user hits on the Search button
    And the user clicks on the order with ID "7620981218"
    And the user clicks on the Approve Consultation button
    
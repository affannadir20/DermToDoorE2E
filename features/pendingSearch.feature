@Search
Feature: Successful login and search

  Scenario: Successful login and search
    Given the user is logged in
    When the user clicks on Pending button
    And the user enters "Marcus" as search param
    And the user clicks on Search button
    
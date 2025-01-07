@SearchPatient
Feature: Successful login and search patient

  Scenario: Successful login and search patient
    Given the user is logged in the app
    When the user clicks on Patient button
    And the user enters "Marcus" as search query
    And the user clicks on the Search button
    
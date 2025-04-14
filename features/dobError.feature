@dobError
Feature: Verify age restriction on signup

  Scenario: User enters a date of birth under 18 years old
    Given the user hits to the url "https://staging.dermtodoor.app/"
    When the person clicks on the Get personalized treatment button
    And the person enters "01-09-2009" as date of birth
    And the person accepts the terms and conditions
    And the person clicks on the Get my prescription button
    Then the user should see an error modal with text "You need to be 18 years or older to order a prescription from us!"
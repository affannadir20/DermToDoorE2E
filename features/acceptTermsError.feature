@acceptTermsError
Feature: Verify age restriction on signup

  Scenario: User enters a date of birth under 18 years old
    Given the user tries the url "https://staging.dermtodoor.app/"
    When the person hits on the Get personalized treatment button
    And the person types "01-09-2009" as date of birth
    And the person hits on the Get my prescription button
    Then the user must see an error modal with text "You must check the box to agree on the terms mentioned!"
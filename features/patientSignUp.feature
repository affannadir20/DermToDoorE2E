@Signup
Feature: User Signup Flow

  Scenario: User completes the signup steps
    Given the user goes to "https://staging.dermtodoor.app/"
    When the user clicks on the Get personalized treatment button
    And the user enters "01-08-1998" as date of birth
    And the user accepts the terms and conditions
    And the user clicks on the Get my prescription button
    When the user clicks on the continue button
    When the user enters personal details:
      | firstName  | lastName | email                | phone        |
      | TestMac       | User     | test@example.com     | 2504105873   |
    And the user accepts all checkboxes
    And the user clicks on the Get Started button
    When the user enters the OTP as the last 6 digits of their phone number
    And the user clicks on the Verify button
    And the user selects "Seek discreet, professional care"
    And the user clicks on the "Let's go" button
    And the user clicks on the continue button after preferences
    And the user enters medical history:
      | pmedicalc           | testing automation 2   |
    And the user clicks on the continue button after medical history
    When the user enters "doctor notes" in the doctor notes field
    And the user clicks on the continue button after doctor notes
    And the user clicks on the final continue button
    And the user clicks on I prefer not to send a photo at this time
    And the user enters "test notes" in the text field
    And the user checks the "I understand warts" checkbox
    And the user clicks on the continue button to submit
    And the user clicks on the continue button on the confirmation screen
    And the user scrolls to the element with selector "#nextFrom13"
    And the user agrees to the terms and conditions
    And the user clicks on the final continue button before payment
    And the user enters the payment details:
      | field       | value               |
      | cardNumber  | 4242424242424242    |
      | expiry      | 05/27               |
      | cvv         | 237                 |
      | zip         | 72222               |
    And the user enters the shipping details:
      | field       | value           |
      | fname       | test            |
      | lname       | test22          |
      | address1    | address         |
      | address2    | 2               |
      | city        | city            |
      | zip         | 45188           |
      | phoneStripe | 2501854787      |
    And the user agrees to the checkout terms
    And the user clicks on the "Checkout" bbutton
@SignupAcne
Feature: User Signup Flow with Acne

  Scenario: User completes the signup steps with Acne
    Given the user goes to "https://staging.dermtodoor.app/" website
    When the user clicks on the Get personalized treatment button buttons
    And the user enters "01-08-1998" as date of birth births
    And the user accepts the terms and conditions conditions
    And the user clicks on the Get my prescription buttons
    When the user clicks on the continue buttons
    When the user enters personal detailss:
      | firstName  | lastName | email                | phone        |
      | TestMacs       | Users     | tests@example.com     | 2504105873   |
    And the user accepts all checkboxess
    And the user clicks on the Get Started buttons
    When the user enters the OTP as the last 6 digits of their phone numbers
    And the user clicks on the Verify buttons
    And the user selectss "Target breakouts effectively"
    And the user clicks on the "Let's go" buttons
    And the user clicks on the continue button after preferencess
    And the user enters medical historys:
      | pmedicalc           | testing automation 2   |
    And the user clicks on the continue button after medical historys
    When the user enters "doctor notes" in the doctor notes fields
    And the user clicks on the continue button after doctor notess
    And the user clicks on the final continue buttons
    And the user uploads the picture from "l1.jpeg"
    And the user clicks the file submit continue
    And the user clicks the yes looks buttond
    And the user clicks the sec last continue buttonds
    And the user accepts the last terms
    And the user clicks the cross continue button
    And the user enters card details "4242424242424242", "12/26", "455", "26874"
    And the user enters shipment details:
      | field       | value           |
      | firstNames       | test            |
      | lastNames       | test22          |
      | address1    | address         |
      | address2    | noth               |
      | city        | city            |
      | zip         | 45188           |
      | phoneStr | 2501854787      |
    And the user agrees to the checkout termss
    And the user clicks on the "Checkout" bbuttons
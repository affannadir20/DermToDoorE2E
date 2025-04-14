@PatientLogin

Feature: Patient Login with OTP
  Scenario: User logs in with phone number and OTP
    Given the user hits the "https://staging.dermtodoor.app/"
    When the user clicks on loggin but
    When the user enters "2504105874" as phone number
    When the user clicks the login button
    When the user enters the "105874" in the verification field
    When the user clicks the verify button
  

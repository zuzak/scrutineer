Feature: Observer verification
  Background:
    Given I visit the homepage
    And I click "Log in / create account"
    And I click the "Yes" button
    And I click the "Continue" button
    And I type "test account 1" in the username field
    And I type "thisisapassword" in the password field
    And I click the "Log in" button
    And I click "test account 1"
    And I click "verify your accreditation"

Scenario: I have no badge
  When I click the "No" button
  And I click the "Continue" button
  Then the h2 should say "You need to be accredited"

Scenario: I have a badge with invalid details
  When I click the "Yes" button
  And I type "Bloggs" in the ec-surname field
  And I type "1234" in the ec-number field
  And I click the "Continue" button
  Then I should get an error message

Scenario: I have a badge with valid details
  When I click the "Yes" button
  And I type "7782" in the ec-number field
  And I type "Jordan" in the ec-surname field
  And I click the "Continue" button
  Then the h3 should say "Is this you?"
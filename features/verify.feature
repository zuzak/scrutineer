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

Scenario: I have a badge
  When I click the "Yes" button
  And I type "Bloggs" in the ec-surname field
  And I type "1234" in the ec-number field
  And I click the "Continue" button
  Then I should get an error message
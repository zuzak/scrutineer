Feature: Account log in

Background:
  Given I visit the homepage
  And I click "Log in / create account"
  And I click the "Yes" button
  And I click the "Continue" button

Scenario: Logging in
  When I type "test account 1" in the username field
  And I type "thisisapassword" in the password field
  And I click the "Log in" button
  Then the heading should read "What would you like to do?"
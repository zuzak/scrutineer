Feature: Account creation

Background:
  Given I visit the homepage
  And I click "Log in / create account"
  And I click the "No" button
  And I click the "Continue" button

Scenario: Typing in a bad username
  When I type "void" in the username field
  And I type "foobar82" in the password field
  And I type "example@example.com" in the email field
  Then the heading should read "Create account"

Scenario: Typing in a poor password
  When I type "1234567" in the password field
  And I type "username1" in the username field
  And I type "example@example.net" in the email field

Scenario: Linking to the log in link
  When I click "log in to an existing account"
  Then the heading should read "Log into existing account"

Scenario: Creating an account
  When I type "test account 1" in the username field
  And I type "thisisapassword" in the password field
  And I type "example@example.org" in the email field
  And I click the "Create account" button
  Then the heading should read "Information we hold about you"
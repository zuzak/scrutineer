Feature: Log in / create account disambiguator

Background:
  Given I visit the homepage
  And I click "Log in / create account"

Scenario: Accessing the disambiguator
  Then the heading should read "Do you already have an account?"

Scenario: Accessing the create account page
  When I click the "No" button
  And I click the "Continue" button
  Then the heading should read "Create account"

Scenario: Accessing the log in page
  When I click the "Yes" button
  And I click the "Continue" button
  Then the heading should read "Log into existing account"

Scenario: Not filling out the disambiguation form
  When I click the "Continue" button
  Then the heading should read "Do you already have an account?"
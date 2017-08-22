Feature: Viewing the homepage

Scenario: Homepage
  When I visit the homepage
  Then I should see the header
  Then I should see a link to log in
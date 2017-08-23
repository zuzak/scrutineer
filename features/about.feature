Feature: About page

Scenario: About page footer
  When I visit the homepage
  And I click "About this website"
  Then the heading should read "About this website"
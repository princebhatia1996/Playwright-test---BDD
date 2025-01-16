@login
Feature: User Authentication tests
    As a user
    I want to login
    So that I can access the application

    Background:
        Given I am on the login page

    Scenario: Login with valid credentials
        When I fill in the login form with:
            | Username | Tester |
            | Password | findex |
        And I click the log in button
        Then I should see the welcome message Welcome "Tester"

    Scenario: Login with wrong password
        When I fill in the login form with:
            | Username | Tester |
            | Password | wrongpassword |
        And I click the log in button
        Then I should see the error message
        Then I should remain on the login page

    Scenario: Login with empty username and password
        When I fill in the login form with:
            | Username |  |
            | Password |  |
        And I click the log in button
        Then I should see the error message
        Then I should remain on the login page
    
    Scenario: Login with missing username
        When I fill in the login form with:
            | Username |  |
            | Password | findex |
        And I click the log in button
        Then I should see the error message
        Then I should remain on the login page

    Scenario: Login with missing password        
        When I fill in the login form with:
            | Username | Tester |
            | Password |  |
        And I click the log in button
        Then I should see the error message
        Then I should remain on the login page

    Scenario: Login with SQL Injection Attempt:        
        When I fill in the login form with:
            | Username | " or ""=" |
            | Password | " or ""=" |
        And I click the log in button
        Then I should see the error message
        Then I should remain on the login page 

    Scenario: Login with Long Username and Password:      
        When I fill in the login form with:
            | Username | ThisIsASuperLongSentenceWhichShouldBeBlocked |
            | Password | ThisIsASuperLongSentenceWhichShouldBeBlocked |
        And I click the log in button
        Then I should see the error message
        Then I should remain on the login page
          
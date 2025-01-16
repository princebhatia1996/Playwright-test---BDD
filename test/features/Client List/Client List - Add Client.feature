@client-list
Feature: Client List - Add Client
    As a user
    I want to add a client
    So that I can keep track of my clients

    Background:
        Given I am logged in with valid credentials as "TestUser"
        And I am on the client list page

    Scenario: Add a client with Active status
        When I fill in the client form with:
            | Name   | Test Client |
            | Status | Active     |
        And I click the add client button
        Then I should see the client "Test Client" in the list

    Scenario: Add a client with Inactive status
        When I fill in the client form with:
            | Name   | Test Client |
            | Status | Inactive     |
        And I click the add client button
        Then I should see the client "Test Client" in the list

    Scenario: Add a client without a Name
        When I fill in the client form with:
            | Name   |  |
            | Status | Active |
        And I click the add client button
        Then I should see an error message

    Scenario: Add a client with a duplicate name
        When I fill in the client form with:
            | Name   | Test Client |
            | Status | Active     |
        And I click the add client button
     Then I should see an error message

    Scenario: Add a client with special characters in the name
        When I fill in the client form with:
            | Name   | Test@Client! |
            | Status | Active       |
        And I click the add client button
      Then I should see an error message

    Scenario: Add a client with a very long name
        When I fill in the client form with:
            | Name   | This is exceeding the char limit |
            | Status | Active |
        And I click the add client button
         Then I should see an error message


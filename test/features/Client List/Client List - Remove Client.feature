@client-list
Feature: Client List - Remove Client
    As a user
    I want to remove clients
    So that I update my clients list

    Background:
        Given I am logged in with valid credentials as "TestUser"
        And I am on the client list page

    Scenario: Remove a client
        And I see the client "Homer Simpson" in the list
        When I remove the client "Homer Simpson"
        Then I should not see the client "Homer Simpson" in the list
    
    Scenario: Remove multiple clients
        And I see the client "Homer Simpson, Moe Szyslak" in the list
        When I remove the client "Homer Simpson"
        And I remove the client "Moe Szyslak"
        Then I should not see the client "Homer Simpson, Moe Szyslak" in the list


    Scenario: Remove a client, log out, and log back in
        And I see the client "Homer Simpson" in the list
        When I remove the client "Homer Simpson"
        And I log out
        And I am logged in with valid credentials as "TestUser"
        Then I should not see the client "Homer Simpson" in the list
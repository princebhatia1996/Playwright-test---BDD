##### Notes: This is a really small example of a bug report, if you want to add any bug reports feel free to do so creating files in this folder
##### if you plan on doing so, it is not necessary to follow this example template, you can use whichever template you feel is best

## Bug - Login username is accepting extremely long names
#### This is not realistic, and can lead to problems displaying names for the user in some UI elements

### Expected behavior
When i login i should enter my name, user name or email. Very long text should not be allowed.
Special character should be limited to avoid potential security problems.

### Current behavior
When i login i can enter a super long string of text, with attempts to sql injections for example this is accepted currently
window.alert("Problem!")" or 1=1

### Evidence



describe("sanity check", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    })
    
    afterEach(() => {
        indexedDB.deleteDatabase("firebaseLocalStorageDb");
    })
    it("visits the the site localhost 3000", () => {
        cy.contains("Helpful Resources And Links");
    })
    it("logs in an admin", () => {
        // must export CYPRESS_ADMIN_EMAIL AND CYPRESS_ADMIN_PASSWORD for successful tests
        cy.get("input[placeholder='Email']").type(Cypress.env("ADMIN_EMAIL"));
        cy.get("input[placeholder='Password']").type(Cypress.env("ADMIN_PASSWORD"))
        cy.contains("Login").click();
        
        cy.contains("Student Queue")
        cy.contains("Log Out")
    })
})
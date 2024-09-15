describe("User app", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passwordInput = () => cy.get('input[name="password"]');

    it("can types in the inputs", () => {
        nameInput()
            .should("have.value", "")
            .type("Karla")
            .should("have.value", "Karla");

        emailInput()
            .should('have.value', "")
            .type("k@k.com")
            .should("have.value", "k@k.com");

        passwordInput()
            .should("have.value", "")
            .type("rememberthis1")
            .should("have.value", "rememberthis1");
    })
});


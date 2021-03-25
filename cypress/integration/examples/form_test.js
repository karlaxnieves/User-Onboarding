describe("User app", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    const nameInput = () => cy.get('input[name="name"]');

    it("can types in the inputs", () => {
        nameInput()
            .should("have.value", "")
            .type("Karla")
            .should("have.value", "Karla");
    })
});


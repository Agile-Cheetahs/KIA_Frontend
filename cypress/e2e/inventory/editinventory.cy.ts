describe('Edit inventory item ', () => {
    beforeEach(() => {
        //presist session across tests. can reuse this - change the below user depending on your setup
        //cy.fixture('user').as('usersJson') 
        let user = {
            "name": "dsaw@ari.com",
            "password": "oi_&Hn'P+sY1Wr71%"
        }
        cy.session(user.name, () => {
            cy.visit('/')
            cy.get('[data-testid=login-email]').type(user.name)
            cy.get('[data-testid=login-password]').type(user.password)
            cy.get('[data-testid=signin-button]').contains('Sign in').click()
            cy.url().should('contain', '/inventory')
          })
      
      });
      
    
    // NOTE: temporary inventory item pagge for editing items - will be removed and refactored later
    it('check edit invetory item page', () => {
        cy.visit('/editinventory');
        cy.contains('Edit Inventory item');
    });

    it('Open an existing invetory item', () => {
        cy.visit('/editinventory');
    });

    it.skip('Change the quantity field', () => {
        
        // cy.get('quantity');
    });
});
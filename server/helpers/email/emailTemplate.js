
const emailTemplate = {
    welcome: {
        from: {email: 'no-reply@loanem.com'},
        subject: 'Loanem account created',
        text: 'Thank you for creating an account at Loanem',
        html: `
        <h1 style="color: #6C54EC"> Welcome to Loanem</h1>
        Log in into your account to start contributing.
         `
    },
    loanApply: {
        from: {email:'no-reply@loanem.com'},
        subject: 'Loan Application',
        text: 'Your loan application is currently being processed ',
        html: `
        <h1 style="color: #6C54EC"> Welcome to Loanem</h1>
        You are receiving this mail because you applied for loan
        on loanem. Your application is being processed. You will receive 
        reply within 7 working days.
         `
    },
    loanAccepted: {
        from: {email:'no-reply@loanem.com'},
        subject: 'Loan Application Accepted',
        text: 'Your loan application has been accepted ',
        html: `
        <h1 style="color: #6C54EC"> Welcome to Loanem</h1>
        You are receiving this mail has been accepted. Please proceed
        To the Loanem office to receive your loan
         `
    },
    loanRejected: {
        from: {email:'no-reply@loanem.com'},
        subject: 'Loan Application Rejected',
        text: 'Your loan application has been rejected ',
        html: `
        <h1 style="color: #6C54EC"> Welcome to Loanem</h1>
        You are receiving this mail has been rejected. 
         `
    },
};

export default emailTemplate;

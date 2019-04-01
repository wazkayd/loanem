
const emailTemplate = {
    welcome: {
        from: {email: 'no-reply@chemcos.com'},
        subject: 'Chemcos account created',
        text: 'Thank you for creating an account at Chemcos',
        html: `
        <h1 style="color: #6C54EC"> Welcome to Chemcos</h1>
        Log in into your account to start accessing loans.
         `
    },
    loanApply: {
        from: {email:'no-reply@chemcos.com'},
        subject: 'Loan Application',
        text: 'Your loan application is currently being processed ',
        html: `
        <h1 style="color: #6C54EC"> Application Received</h1>
        You are receiving this mail because you applied for loan
        on Chemcos. Your application is being processed. You will receive 
        reply within 7 working days.
         `
    },
    loanAccepted: {
        from: {email:'no-reply@chemcos.com'},
        subject: 'Loan Application Accepted',
        text: 'Your loan application has been accepted ',
        html: `
        <h1 style="color: #6C54EC"> Loan Application accepted</h1>
        You loan has been accepted. Please proceed
        To the Chemcos office to receive your loan
         `
    },
    loanRejected: {
        from: {email:'no-reply@chemcos.com'},
        subject: 'Loan Application Rejected',
        text: 'Your loan application has been rejected ',
        html: `
        <h1 style="color: #6C54EC"> Loan Application Rejected</h1>
        Your loan has been rejected. 
         `
    },
    completed: {
        from: {email:'no-reply@chemcos.com'},
        subject: 'Loan Application Payment Completed',
        text: 'Your loan application has been rejected ',
        html: `
        <h1 style="color: #6C54EC"> Loan Application Payment Completed</h1>
        You have successfully completed the payment of your loan on CHEMCOS. 
        You are now eligible to apply for another loan. 
         `
    },
};

export default emailTemplate;

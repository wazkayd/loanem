const addLoanBtn = document.getElementById('addMenuBtn');
const loader = document.getElementById('loaderDiv');
const errorHandle = document.getElementById('signUpErrorHandler');
/* eslint-disable class-methods-use-this */
/**
 * Represents all the different fetch type to be done.
 */
class Loans extends Request {

    Addloan(){
        const loanAmount = document.getElementById('loanAmount').value;
        const firstGuarantor = document.getElementById('firstGuarantor').value;
        const secondGuarantor = document.getElementById('secondGuarantor').value;
        const thirdGuarantor = document.getElementById('thirdGuarantor').value;
        const forthGuarantor = document.getElementById('forthGuarantor').value;
        const durationCat = document.getElementById('durationCategory');
        const monthCategory = durationCat.options[durationCat.selectedIndex].value;

        const alphabetOnly = (/^[A-Z ]+$/i);
        const numOnly = (/^[0-9]+$/);



        if(!loanAmount || !firstGuarantor || !secondGuarantor || !thirdGuarantor || !forthGuarantor){
            errorHandle.innerHTML = 'Please fill all field';
            return
        }

        if (!loanAmount.match(numOnly)){
            errorHandle.innerHTML = "Loan can only Be Integer number";
            return;
        }
        if (loanAmount> 1500000){
            errorHandle.innerHTML = 'Loan can not be more than 1.5 Million';
            return;
        }
        if (loanAmount < 100000){
            errorHandle.innerHTML = 'Loan should not be less than one hundred thousand ';
            return;
        }

        if(monthCategory === '0'){
            errorHandle.innerHTML = 'Please select Duration of payment';
            return;
        }

        if(!firstGuarantor.match(alphabetOnly) ||
        !secondGuarantor.match(alphabetOnly) ||
        !thirdGuarantor.match(alphabetOnly) ||
        !forthGuarantor.match(alphabetOnly)){
            errorHandle.innerHTML = 'Guarantor names can only be Alphabet';
            return;
        }
         const payload = {
            amount: loanAmount,
            paymentDuration: monthCategory,
            guarantorOne: firstGuarantor,
            guarantorTwo: secondGuarantor,
            guarantorThree: thirdGuarantor,
            guarantorFour: forthGuarantor
         }
         this.addLoan(payload);
    }
    /**
     * This function post data to the endpoint
     * @param {object} payload - the loan data
     * @returns {Promise} Returns the information from the endpoint.
     */
  addLoan(payload) {
    loader.style.display = 'flex';
    const uDrl = '/loans';
    console.log(payload);
    this.post(uDrl, payload)
      .then((res) => {
        if (res.error) {
          loader.style.display = 'none';
          errorHandle.innerHTML = res.error;
          return;
        }
        setTimeout(() => {
          location.href = 'loans.html';
        },
        2000);
      });
  }
}

const loans = new Loans;

addLoanBtn.onclick = () => {
    loans.Addloan();
}



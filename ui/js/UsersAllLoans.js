
/* eslint-disable class-methods-use-this */
/**
 * Represent the user loans history
 */
class PresAllLoans extends Pagination {
    /**
         * @param {array} loansArray - the array of all loans;
         * @param {integer} snBeginning - the beginning of the index;
         * @returns {HTMLElement} - return HTMLElement of the loans
         */
    loadLoans(loansArray) {
        if (this.allCompleteDataArray.length < 1) {
            document.querySelector('.no-loan-history')
                .innerHTML = '<h1>No Loan History</h1>';
            return false;
        }
        const historyTable = document.querySelector('.order-table');
        historyTable.innerHTML = '';
        const titleRow = historyTable.insertRow(0);
        titleRow.className = 'table-title';
        titleRow.innerHTML = `<th>Loan Id</th>
        <th>Loan Details</th>
        <th> Name</th>
        <th>Department </th>
        <th>Loan</th>
        <th> Loan Status</th>`;

        loansArray.forEach((element, index) => {
            const loanDate = new Date(element.loan_added_date).toLocaleString();
            const row = historyTable.insertRow(index + 1);
            row.className = 'table-content modal-btn';
            const cellIndex = row.insertCell(0);
            const cellViewLoan = row.insertCell(1);
            const cellName = row.insertCell(2);
            const cellDepartment = row.insertCell(3);
            const cellLoanAmount = row.insertCell(4);
            const cellRequest = row.insertCell(5);

            cellIndex.innerHTML = element.loan_id;
            cellIndex.className = 'serial-number';
            cellViewLoan.innerHTML = '<div class="view-details">view Details</div>';
            cellName.innerHTML = element.user_name;
            cellDepartment.innerHTML = element.user_dept;
            cellLoanAmount.innerHTML = `&#8358 ${element.loan_amount}`;
            cellLoanAmount.className = 'arrange-order-price';
            if (element.loan_status === 'new') {
                cellRequest.innerHTML = `processing`;
            }
            else if (element.loan_status === 'committee-accepted') {
                cellRequest.innerHTML = 'processing';
            }
            else if (element.loan_status === 'committee-cancelled') {
                cellRequest.innerHTML = 'Rejected';
            }
            else if (element.loan_status === 'accepted') {
                cellRequest.innerHTML = 'accepted';
            }
            else if (element.loan_status === 'rejected') {
                cellRequest.innerHTML = 'Rejected';
            }
            else if (element.loan_status === 'complete') {
                cellRequest.innerHTML = 'Loan Paid';
            }
            else {
                cellRequest.innerHTML = element.loan_status;
            }

            const orderModal = document.querySelector('.all-modal');
            orderModal.innerHTML += `
                            <div id="myModal" class="modal order-modal">
    
                            <!-- Modal content -->
                            <div class="modal-content">
    
                                <span class="close-order-modal">&times;</span>
                                <div class="modal-body del-order-body">
                                    <div class="order-details-wrapper">
                                        <h1>Loan Details</h1>
                                        <div class="order-details">
                                            <div><b>Loan Id:</b>${element.loan_id}</div>
                                            <div><b>Name:</b>${element.user_name}</div>
                                        </div>
                                        <div class="order-details">
                                            <div> <b>Department:</b>${element.user_dept}</div>
                                            <div><b>Date:</b>${loanDate}</div>
                                        </div>
                                        <div class="order-details">
                                          <div> <b>First guarantor:</b>${element.loan_guarantor_one}</div>
                                          <div><b>Second Guarantor:</b>${element.loan_guarantor_two}</div>
                                        </div>
                                      <div class="order-details">
                                        <div> <b>Third Guarantor:</b>${element.loan_guarantor_three}</div>
                                        <div><b>Fourth Guarantor:</b>${element.loan_guarantor_four}</div>
                                      </div>
                                    </div>
                                    <div class="order-loan-item">
                                        <div class="food-items order-food-title">

                                            <div>
                                                <b>Loan Amount:</b>
                                            </div>
                                            <div>
                                                <b>Interest</b>
                                            </div>
                                            <div>
                                                <b>Amount to Pay</b>
                                            </div>
                                        </div>
                                        <div class="food-items">
         
                                            <div>
                                                <b>&#8358 ${element.loan_amount}</b>
                                            </div>
                                            <div>
                                                <b>&#8358 ${element.loan_interest}</b>
                                            </div>
                                            <div>
                                                <b>&#8358 ${element.loan_amount_to_pay}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            `;
        });
        const ordersModal = document.querySelectorAll('.order-modal');
        const modalTableRow = document.querySelectorAll('.view-details');
        const closeOrderModal = document.querySelectorAll('.close-order-modal');
        const setOrderModal = (index) => {
            ordersModal[index].style.display = 'block';
        };
        for (let i = 0; i < modalTableRow.length; i += 1) {
            modalTableRow[i].onclick = () => {
                setOrderModal(i);
            };
            closeOrderModal[i].onclick = () => {
                ordersModal[i].style.display = 'none';
            };

            window.addEventListener('click', (event) => {
                if (event.target === ordersModal[i]) {
                    ordersModal[i].style.display = 'none';
                }
            });
        }
    }

    /**
         * This function get data from the endpoint
         * @returns {Promise} Returns the information from the endpoint.
         */
    getAllLoans() {
        const decoded = jwt_decode(token);
        const uDir = `/loans/${decoded.userId}`;
        this.get(uDir)
            .then((res) => {
                this.allCompleteDataArray = res.loan;
                
                this.arrayOutputNumber = 10;
                if (this.allCompleteDataArray.length < 1) {
                    document.querySelector('.no-loan-history')
                        .innerHTML = '<h1>No Loan History</h1>';
                    return false;
                }
                this.loadData = this.loadLoans;
                this.createPagination(this.allCompleteDataArray);
            });
    }

    /**
         * This function post data to the endpoint
         * @returns {HTMLElement} Returns the information from the endpoint.
         */
    categoryOnchange() {
        const foodCategory = document.querySelector('.select-category');
        foodCategory.addEventListener('change', () => {
            const selectedCategory = foodCategory.options[foodCategory.selectedIndex].value;
            let selectedDataArray = '';
            if (selectedCategory === 'all') {
                selectedDataArray = this.allCompleteDataArray;
            } else {
                selectedDataArray = this.allCompleteDataArray
                    .filter(loan => loan.loan_status === selectedCategory);
            }
            if (selectedDataArray.length < 1) {
                document.querySelector('.pagination').innerHTML = '';
                const historyTable = document.querySelector('.order-table');
                historyTable.innerHTML = '';
                const titleRow = historyTable.insertRow(0);
                titleRow.className = 'table-title';
                titleRow.innerHTML = `<th>S/N</th>
            <th>Date</th>
            <th> Quantity</th>
            <th> Price</th>
            <th> Status</th>`;
                document.querySelector('.no-loan-history')
                    .innerHTML = '<h1>No loan History</h1>';
                return false;
            }
            document.querySelector('.no-loan-history')
                .innerHTML = '';
            this.createPagination(selectedDataArray);
        }, false);
    }
}

const userOrderHistory = new PresAllLoans();
userOrderHistory.getAllLoans();
userOrderHistory.categoryOnchange();

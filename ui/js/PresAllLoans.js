
/* eslint-disable class-methods-use-this */
/**
 * Represent the user orders history
 */
class PresAllLoans extends Pagination {
  /**
       * @param {array} loansArray - the array of all orders;
       * @param {integer} snBeginning - the beginning of the index;
       * @returns {HTMLElement} - return HTMLElement of the orders
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
      if (element.loan_status === 'committee-accepted') {
        cellRequest.innerHTML = `<button class="accept-btn" data-loanId="${element.loan_id}">&#x2714;</button>
                                  <button class="reject-btn modal-btn" data-loanId="${element.loan_id}">&#x2718;</button>`;
        const rejectOrderModal = document.querySelector('.all-reject-order-modal');
        rejectOrderModal.innerHTML += ` <div id="myModal" class="modal reject-order-modal">
  
            <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close-reject-order">&times;</span>
                    <h3>Reject Loan</h3>
                </div>
                <div class="modal-body">
                    <h4>Are you sure u want to Reject this Loan?</h4>
                    <div class="form-btn">
                        <button class="del-ques-btn reject-order-yes" type="submit">Yes</button>
                        <button class="del-ques-btn reject-order-no" type="submit">No</button>
                    </div>
                </div>
                <div class="modal-footer">
                    <h3>CHEMCOS LOAN</h3>
                </div>
            </div>
  
        </div>`;
      }
      if (element.loan_status === 'accepted') {
        cellRequest.innerHTML = `<button class="complete-btn" data-loanId="${element.loan_id}">Complete</button>`;
      }
      else if (element.loan_status === 'committee-cancelled') {
        cellRequest.innerHTML = 'committee-rejected';
      }
      else if (element.loan_status === 'cancelled') {
        cellRequest.innerHTML = 'Rejected';
      }
      else if (element.loan_status === 'complete') {
        cellRequest.innerHTML = 'Completed';
      }
      else if (element.loan_status === 'new') {
        cellRequest.innerHTML = 'New';
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
    this.requestEventclicks();
  }

  /**
       * This function post data to the endpoint
       * @returns {Promise} Returns the information from the endpoint.
       */
  getAllLoans() {
    const uDir = '/loans';
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

  /**
   * this function handles the request onclick events
   * @returns {HTMLElement} returns the actions needed after the events
   */
  requestEventclicks() {
    const acceptBtn = document.querySelectorAll('.accept-btn');
    const rejectBtn = document.querySelectorAll('.reject-btn');
    const completeBtn = document.querySelectorAll('.complete-btn');


    for (let i = 0; i < acceptBtn.length; i += 1) {
      acceptBtn[i].onclick = () => {
        const loanId = acceptBtn[i].getAttribute('data-loanId');
        const payload = {
          loanStatus: 'accepted'
        };
        this.updateOrderStatus(loanId, payload)
          .then((res) => {
            if (res.loan.loan_status === 'accepted') {
              acceptBtn[i].parentElement.innerHTML = `<button class="complete-btn" data-loanId="${loanId}">Complete</button>`;
              this.requestEventclicks();
            }
          });
      };
    }

    for (let i = 0; i < rejectBtn.length; i += 1) {
      rejectBtn[i].onclick = () => {
        const loanId = acceptBtn[i].getAttribute('data-loanId');
        const openModal = document.querySelectorAll('.reject-order-modal');
        const closeRejectOrderModal = document.querySelectorAll('.close-reject-order');
        const selectYes = document.querySelectorAll('.reject-order-yes');
        const selectNo = document.querySelectorAll('.reject-order-no');
        openModal[i].style.display = 'block';
        selectYes[i].onclick = () => {
          const payload = {
            loanStatus: 'rejected'
          };
          this.updateOrderStatus(loanId, payload)
            .then((res) => {
              if (res.loan.loan_status === 'cancelled') {
                rejectBtn[i].parentElement.innerHTML = 'Cancelled';
              }
              openModal[i].style.display = 'none';
            });
        };
        selectNo[i].onclick = () => {
          openModal[i].style.display = 'none';
        };
        closeRejectOrderModal[i].onclick = () => {
          openModal[i].style.display = 'none';
        };
        window.addEventListener('click', (event) => {
          if (event.target === openModal[i]) {
            openModal[i].style.display = 'none';
          }
        });
      };
    }

    for (let i = 0; i < completeBtn.length; i += 1) {
      completeBtn[i].onclick = () => {
        const loanId = completeBtn[i].getAttribute('data-loanId');
        const payload = {
          loanStatus: 'complete'
        };
        this.updateOrderStatus(loanId, payload)
          .then((res) => {
            if (res.loan.loan_status === 'complete') {
              completeBtn[i].parentElement.innerHTML = 'Completed';
            }
          });
      };
    }
  }

  /**
   * This function
   * @param {integer} loanId - the loanId to be updated
   * @param {object} payload - the data to be inserted
   * @returns {Array} - returns array of details of the order updated
   */
  updateOrderStatus(loanId, payload) {
    const uDir = `/loans/${loanId}`;
    return this.put(uDir, payload);
  }
}
const userOrderHistory = new PresAllLoans();
userOrderHistory.getAllLoans();
userOrderHistory.requestEventclicks();
userOrderHistory.categoryOnchange();

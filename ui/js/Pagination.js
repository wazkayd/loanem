

/* eslint-disable class-methods-use-this */
/**
 * Represent the pagination
 */
class Pagination extends Request {
/**
 * @constructs allordersArray
 */
  constructor() {
    super();
    this.allCompleteDataArray = '';
    this.arrayOutputNumber = '';
    this.currentDataArray = '';
    this.loadData = '';
  }

  /**
     * This function post data to the endpoint
     * @param {array} ordersArray - the array of all loans
     * @returns {HTMLElement} Returns the created paginataion linkers.
     */
  createPagination(ordersArray) {    
    document.querySelector('.pagination').innerHTML = '';
    this.currentDataArray = ordersArray;
    const paginationDiv = document.querySelector('.pagination');
    paginationDiv.innerHTML += '<a class="arrow-backward">&laquo;</a>';

    let count = 1;
    for (let i = 0; i < ordersArray.length; i += this.arrayOutputNumber) {
      paginationDiv.innerHTML += `<a class="pagination-list">${count}</a>`;
      document.getElementsByClassName('pagination-list')[count - 1]
        .setAttribute('data-pageId', count);
      count += 1;
    }
    if(ordersArray.length === undefined){
      if(ordersArray.loan_id){
        paginationDiv.innerHTML += `<a class="pagination-list">${count}</a>`;
        document.getElementsByClassName('pagination-list')[0]
          .setAttribute('data-pageId', 1);
      }
    }
    paginationDiv.innerHTML += '<a class="arrow-forward">&raquo;</a>';
    const activeClass = document.getElementsByClassName('pagination-list')[0];
    activeClass.className += ' active';
    const firstPageArray = ordersArray
      .slice(0, this.arrayOutputNumber);
    this.paginationOnClick();
    this.arrowsOnclick();
    this.loadData(firstPageArray, 0);
  }

  /**
     * This function set the array needed and send to loadpage function
     * @param {Integer} pageId - the dataId of the selected
     * @returns {array} Returns the created pagination linkers.
     */
  changeDisplayList(pageId) {
    const to = this.arrayOutputNumber * pageId;
    const from = (this.arrayOutputNumber * (pageId - 1));
    const arrayToDisplay = this.currentDataArray.slice(from, to);
    this.loadData(arrayToDisplay, from);
  }

  /**
       * This function change the loan history to the necessary one on click
       * @returns {HTMLElement} Returns array of the necessary loan history
       */
  paginationOnClick() {
    const allPaginationList = document.querySelectorAll('.pagination-list');
    for (let i = 0; i < allPaginationList.length; i += 1) {
      allPaginationList[i].addEventListener('click', () => {
        const pageId = document.getElementsByClassName('pagination-list')[i].getAttribute('data-pageId');
        this.changeDisplayList(pageId);
        const newActiveClass = document.getElementsByClassName('pagination-list')[i];
        const activeClass = document.getElementsByClassName('active')[0];
        activeClass.classList.remove('active');
        newActiveClass.classList.add('active');
      }, false);
    }
  }

  /**
       * This function listen to the arraow key and use the active class to
       * calculate the next pagination anchor that should be active and set it
       * @returns {HTMLElement} Returns array of the necessary loan history
       */
  arrowsOnclick() {
    const arrowBackward = document.getElementsByClassName('arrow-backward')[0];
    const arrowForward = document.getElementsByClassName('arrow-forward')[0];
    arrowBackward.addEventListener('click', () => {
      const activeClass = document.getElementsByClassName('active')[0];
      const activeDataId = activeClass.getAttribute('data-pageId');
      const prevPage = document.getElementsByClassName('pagination-list')[activeDataId - 2];
      if (prevPage) {
        this.changeDisplayList(Number(activeDataId) - 1);
        activeClass.classList.remove('active');
        prevPage.classList.add('active');
      }
    }, false);

    arrowForward.addEventListener('click', () => {
      const activeClass = document.getElementsByClassName('active')[0];
      const activeDataId = activeClass.getAttribute('data-pageId');
      const nextData = document.getElementsByClassName('pagination-list')[activeDataId];
      if (nextData) {
        this.changeDisplayList(Number(activeDataId) + 1);
        activeClass.classList.remove('active');
        nextData.classList.add('active');
      }
    }, false);
  }
}

// const url = `http://localhost:5050/fibonacci/:number`;
const buttonIs = document.querySelector('#buttonIs');
const loader = document.querySelector('#loader');
const validationMessageOne = document.querySelector('#invalidNumber');
let resultToUser = document.querySelector('#resultToUser');
let serverErrorFortyTwo = document.querySelector('#serverErrorFortyTwo');
let errorMessageInput = document.querySelector("#errorMessageInput");


function displayLoader(){
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 3000);
}

function hideLoader() {
  loader.classList.remove("display");
}


const getAllResults = () => {

  fetch("http://localhost:5050/getFibonacciResults")
  .then((response) => response.json()
  .then((data) => {

    const resultList = document.querySelector("#resultList");
    let resultListTitle = document.querySelector("#resultsListTitle");
    resultListTitle.innerHTML = "Results";

    data["results"].sort(function(a, b){
      return b.createdDate - a.createdDate;
    }) 

    for( let i = 0; i < 5; i++){
    let itemResult = document.createElement("div")
    itemResult.classList.add("item-result");
    let timeStamp = new Date(data.results[i].createdDate);
    itemResult.innerHTML = `The Fibonacci of <b>${data.results[i].number}</b> is <b>${data.results[i].result}</b>. Calculated at ${timeStamp}`;
  
    resultList.append(itemResult);
    }
  }));
  
}

getAllResults();

const getResult = () => {
  
  displayLoader();
  // getAllResults()
  let userInput = document.querySelector('#userInput').value;

  if(userInput > 50){
    errorMessageInput.classList.remove("hidden");
    serverErrorFortyTwo.classList.add("hidden");
    resultToUser.classList.add("hidden");
    errorMessageInput.innerHTML = `<p class="error-message-input" id="errorMessageInput">Can't be larger than 50 </p>`;
    document.querySelector('#userInput').classList.add("border-color");
  } else if( userInput !== 42) {
    document.querySelector('#userInput').classList.remove("border-color");
    resultToUser.classList.remove("hidden");
    errorMessageInput.classList.add("hidden");
    serverErrorFortyTwo.classList.add("hidden");
    fetch(`http://localhost:5050/fibonacci/${userInput}`)
    .then((response) => response.json()
    .then((data) => {
    resultToUser.style.display = "block";
    resultToUser.innerHTML = data.result;
    hideLoader();
})
  .catch(function(error){
    document.querySelector('#userInput').classList.remove("border-color");
    serverErrorFortyTwo.classList.remove("hidden");
    errorMessageInput.classList.add("hidden");
    resultToUser.classList.add("hidden");
    serverErrorFortyTwo.innerHTML = `<p>Server Error: 42 is the meaning of life`;
}));
  }
  getAllResults();
}
  buttonIs.addEventListener("click", getResult);




  /*
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  */

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {return !inputElement.validity.valid})
};

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if(hasInvalidInput(inputList)){
    disableButton(buttonElement, inactiveButtonClass);
  }else{
    enableButton(buttonElement, inactiveButtonClass);
  }
};

/*4 LVL */
const showInputError = (inputElement, inputErrorClass, errorElement, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};
/*4 LVL */
const hideInputError = (inputElement, inputErrorClass, errorElement, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

/* 3 LVL*/
const checkInputValidity=(formElement, inputElement, inputErrorClass, errorClass)=>{
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`)
  if(inputElement.validity.valid){
    //no error
    hideInputError(inputElement, inputErrorClass, errorElement, errorClass);
  }else{
    //error
    showInputError(inputElement, inputErrorClass, errorElement, errorClass, inputElement.validationMessage)
  }
}

/* 2 LVL*/
const setEventListeners=(formElement, {inputSelector, inputErrorClass, errorClass,submitButtonSelector, inactiveButtonClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
      })
    });
    toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
}

/* 1 LVL*/ 
export function enableValidation({formSelector, ...rest}){
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement =>{
    formElement.addEventListener('submit',(event)=>{
      event.preventDefault();
    })
    setEventListeners(formElement,rest)
  })
};
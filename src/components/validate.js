const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {return !inputElement.validity.valid})
};

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

export const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

export const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if(hasInvalidInput(inputList)){
    disableButton(buttonElement, inactiveButtonClass);
  }else{
    enableButton(buttonElement, inactiveButtonClass);
  }
};


const showInputError = (inputElement, inputErrorClass, errorElement, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, inputErrorClass, errorElement, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};


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


export function enableValidation({formSelector, ...rest}){
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement =>{
    formElement.addEventListener('submit',(event)=>{
      event.preventDefault();
    })
    setEventListeners(formElement,rest)
  })
};
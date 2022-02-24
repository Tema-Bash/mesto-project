//5 проверяка на ваилдность каждого инпута
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {return !inputElement.validity.valid})
};
//включаем кнопку
const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};
//выключаем кнопку
export const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};
//4 если не валидна форма делаем кнопку недоступной для клика
export const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if(hasInvalidInput(inputList)){
    disableButton(buttonElement, inactiveButtonClass);
  }else{
    enableButton(buttonElement, inactiveButtonClass);
  }
};

//показываем сообщение об ошибке
const showInputError = (inputElement, inputErrorClass, errorElement, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};
//прячем сообщение об ошибке
const hideInputError = (inputElement, inputErrorClass, errorElement, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

//3 проверяем валидность поля
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

//2 вешаем слушатель на ввод данных
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

//1 - вешаем слушатель на сабмит для всех форм
export function enableValidation({formSelector, ...rest}){
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement =>{
    formElement.addEventListener('submit',(event)=>{
      event.preventDefault();
    })
    setEventListeners(formElement,rest) 
  })
};
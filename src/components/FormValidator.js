/*
const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
*/

export class FormValidator {
  constructor(options, targetElement) {

  }

  //имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {return !inputElement.validity.valid})
  };
  //включаем кнопку
  _enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  };
  //выключаем кнопку
  _disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  };
  //4 если не валидна форма делаем кнопку недоступной для клика
  _toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    if(hasInvalidInput(inputList)){
      _disableButton(buttonElement, inactiveButtonClass);
    }else{
      _enableButton(buttonElement, inactiveButtonClass);
    }
  };
  
  //показываем сообщение об ошибке
  _showInputError = (inputElement, inputErrorClass, errorElement, errorClass, errorMessage) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
  };
  //прячем сообщение об ошибке
  _hideInputError = (inputElement, inputErrorClass, errorElement, errorClass) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };
  
  //3 проверяем валидность поля
  _checkInputValidity=(formElement, inputElement, inputErrorClass, errorClass)=>{
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`)
    if(inputElement.validity.valid){
      //no error
      _hideInputError(inputElement, inputErrorClass, errorElement, errorClass);
    }else{
      //error
      _showInputError(inputElement, inputErrorClass, errorElement, errorClass, inputElement.validationMessage)
    }
  }
  
  //2 вешаем слушатель на ввод данных
  _setEventListeners=(formElement, {inputSelector, inputErrorClass, errorClass,submitButtonSelector, inactiveButtonClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
          _toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
        })
      });
      _toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
  }
  //имеет публичный метод enableValidation, который включает валидацию формы.
  enableValidation({formSelector, ...rest}){
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement =>{
      formElement.addEventListener('submit',(event)=>{
        event.preventDefault();
      })
      this._setEventListeners(formElement,rest) 
    })
  };
}
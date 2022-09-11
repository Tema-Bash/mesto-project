export class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass}, formForValidation) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = formForValidation;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); //в форме ищу все интпуты
    this._buttonElement = this._form.querySelector(this._submitButtonSelector); // ищем кнопку
  }
// публичный метод для навешивания функции валидации
  enableValidation(){

    this._toggleButtonState(this._form);
    //вешаю на каждый инпут слушатель которой при введении символа проверяет валиден он или нет
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(this._form, input, this._inputErrorClass, this._errorClass);
        this._toggleButtonState(this._form);
      })
    })
    //отключаю штатную оправку формы
    this._form.addEventListener('submit' , event => { 
      event.preventDefault();
    })
  };

  //имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
  _hasInvalidInput = () => {
    return this._inputList.some((input) => {return !input.validity.valid})
  };
  //включаем кнопку
  _enableButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };
  //выключаем кнопку
  disableButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };
  //4 если не валидна форма делаем кнопку недоступной для клика
  _toggleButtonState = () => {
    if(this._hasInvalidInput()){
      this.disableButton();
    }else{
      this._enableButton();
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
      this._hideInputError(inputElement, inputErrorClass, errorElement, errorClass);
    }else{
      //error
      this._showInputError(inputElement, inputErrorClass, errorElement, errorClass, inputElement.validationMessage)
    }
  }
}
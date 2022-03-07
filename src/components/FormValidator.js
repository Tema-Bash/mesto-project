export class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass}, formIdForValidation) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._formSelectorForValidation = formIdForValidation;
  }
// публичный метод для навешивания функции валидации
  enableValidation(){
    const form = document.querySelector(this._formSelectorForValidation); //ищу форму
    const inputList = Array.from(form.querySelectorAll(this._inputSelector)); //в форме ищу все интпуты

    //вещаю на каждый инпут слушатель которой при введении символа проверяет валиден он или нет
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input, this._inputErrorClass, this._errorClass);
        this._toggleButtonState(form, inputList);
      })
    })
    //отключаю штатную оправку формы
    form.addEventListener('submit' , event => { 
      event.preventDefault();
    })
  };

  //имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {return !input.validity.valid})
  };
  //включаем кнопку
  _enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  };
  //выключаем кнопку
  disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  };
  //4 если не валидна форма делаем кнопку недоступной для клика
  _toggleButtonState = (formElement, inputList) => {
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    if(this._hasInvalidInput(inputList)){
      this.disableButton(buttonElement, this._inactiveButtonClass);
    }else{
      this._enableButton(buttonElement, this._inactiveButtonClass);
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
  
  //2 вешаем слушатель на ввод данных
  _setEventListeners=(formElement, {inputSelector, inputErrorClass, errorClass,submitButtonSelector, inactiveButtonClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
          this._toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
        })
      });
      console.log(1)
      this._toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
  }
}
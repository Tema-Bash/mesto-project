const setEventListeners=(formElement, config)=>{
  const inputList=formElement.querySelectorAll
}

export function enableValidation(config){
  /*
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  */
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  console.log(formList)
  formList.forEach(formElement =>{
    formElement.addEventListener('submit',(event)=>{
      event.preventDefault();
    })
  })
}; 
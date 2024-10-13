/* 
const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
*/

export function enableValidation (validationData) {
  const formList = Array.from(document.querySelectorAll(validationData.formSelector));

  formList.forEach((formElement) => {
    setEventListener (validationData, formElement);
  });
};

function setEventListener (validationData, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));
  const buttonElement = formElement.querySelector(validationData.submitButtonSelector);

  toggleButtonState (validationData, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid (validationData, formElement, inputElement);
      toggleButtonState (validationData, inputList, buttonElement);
    })
  });
};

export function clearValidation (formElement, validationData) {
  const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));
  const buttonElement = formElement.querySelector(validationData.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hiddenInputError (validationData, formElement, inputElement);
    inputElement.setCustomValidity('');
  });
  buttonElement.disabled = true;
  buttonElement.classList.add(validationData.inactiveButtonClass);
};

function isValid (validationData, formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity('');
  };

  if (!inputElement.validity.valid) {
    showInputError (validationData, formElement, inputElement, inputElement.validationMessage);
  } else {
    hiddenInputError (validationData, formElement, inputElement);
  };
};

function showInputError (validationData, formElement, inputElement, errorMessage) {
 const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

 inputElement.classList.add(validationData.inputErrorClass);
 errorElement.textContent = errorMessage;
 errorElement.classList.add(validationData.errorClass);
};

function hiddenInputError (validationData, formElement, inputElement) {
 const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

 inputElement.classList.remove(validationData.inputErrorClass);
 errorElement.classList.remove(validationData.errorClass);
 errorElement.textContent = '';
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState (validationData, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationData.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationData.inactiveButtonClass);
  };
};

import throttle from 'lodash.throttle';

const refs = {
  email: document.querySelector(`input[name="email"]`),
  textarea: document.querySelector(`textarea`),
  form: document.querySelector(`.feedback-form`),
};

const STORAGE_KEY = `feedback-form-state`;

const formData = {
  email: ``,
  message: ``,
};

populateInput();

refs.form.addEventListener('input', throttle(handleInputForm, 500));
refs.form.addEventListener('submit', handleSubmit);

function handleInputForm(event) {
  if (event.target.name === `email`) {
    formData[`email`] = event.target.value;
    formData[`message`] = refs.textarea.value;
  } else {
    formData[`email`] = refs.email.value;
    formData[`message`] = event.target.value;
  }

  const formDataString = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataString);
}

function handleSubmit(event) {
  event.preventDefault();

  if (refs.email.value === '' || refs.textarea.value === '') {
    return alert('Заполните, пожалуйста, все поля');
  }

  const savedDataString = localStorage.getItem(STORAGE_KEY);
  const savedData = JSON.parse(savedDataString);
  console.log(savedData);

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
}

function populateInput() {
  const savedDataString = localStorage.getItem(STORAGE_KEY);
  const savedData = JSON.parse(savedDataString);

  if (!savedData) return;

  refs.email.value = savedData[`email`];
  refs.textarea.value = savedData[`message`];
}
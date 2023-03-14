
// Get registry office elements
const registryOffice = document.getElementById('registryOffice');
const registrationNumber = document.getElementById('registrationNumber');

// Get Child elements
const childName = document.getElementById('childName');
const childSurname = document.getElementById('childSurname');
const childSexList = document.getElementsByName('childSex');
const birthDate = document.getElementById('birthDate');
const placeOfBirth = document.getElementById('placeOfBirth');
const childReligionDropdown = document.getElementById("childReligionDropdown");
const childReligionInput = document.getElementById('childReligionInput');

// Get Mother elements
const motherFamilyName = document.getElementById('motherFamilyName');
const motherBirthName = document.getElementById('motherBirthName');
const motherSurname = document.getElementById('motherSurname');
const motherReligionDropdown = document.getElementById('motherReligionDropdown');
const motherReligionInput = document.getElementById('motherReligionInput');

// Get Father elements
const fatherFamilyName = document.getElementById('fatherFamilyName');
const fatherBirthName = document.getElementById('fatherBirthName');
const fatherSurname = document.getElementById('fatherSurname');
const fatherReligionDropdown = document.getElementById('fatherReligionDropdown');
const fatherReligionInput = document.getElementById('fatherReligionInput');

//Get Further information element
const furtherInformation = document.getElementById('furtherInformation');

// Get submit button
const submitBtn = document.getElementById('submitBtn');

//for quick testing 
const setValuesToFormForTesting = () => {
  
  registryOffice.value = 'berlin';
  registrationNumber.value = 'HG77L7';
  childName.value = 'ramy';
  childSurname.value = 'gouiaa';
  birthDate.value = '15-12-1990';
  placeOfBirth.value = 'marsa';
  const childSexM = document.getElementById("childSexM");
  childSexM.checked = true;

  motherFamilyName.value = 'gouiaa';
  motherBirthName.value = 'tissaoui';
  motherSurname.value = 'lobna';

  fatherFamilyName.value = 'gouiaa';
  fatherBirthName.value = 'tissaoui';
  fatherSurname.value = 'lobna';

}


const H2 = document.getElementById('setAllvalues');

H2.addEventListener('click',()=> {
  setValuesToFormForTesting();
})

const getSelectedSex = (childSexList) => {
  var selectedChildSex;
  childSexList.forEach((element) => {
    if (element.checked) {
      selectedChildSex = element.value;
    }
  });

  return selectedChildSex || '';
}

const getReligion = (dropdownElement, inputElement) => {
  return dropdownElement.value != 'Other' ? dropdownElement.value : inputElement.value;
}

const replaceIfEmpty = (inputElement) => {
  return inputElement.value.length != 0 ? inputElement.value : 'n/a'
}

const isValidForm = () => {

  var valid = true;

  // Validate registryOffice
  if (registryOffice.value === "") {
    document.getElementById("registryOffice").nextElementSibling.innerHTML = "Please enter the registry office.";
    valid = false;
  } else {
    document.getElementById("registryOffice").nextElementSibling.innerHTML = "";
  }

  // Validate registrationNumber
  if (registrationNumber.value === "") {
    document.getElementById("registrationNumber").nextElementSibling.innerHTML = "Please enter the registration number.";
    valid = false;
  } else {
    document.getElementById("registrationNumber").nextElementSibling.innerHTML = "";
  }
  
  // Validate childName
  if (childName.value === "") {
    document.getElementById("childName").nextElementSibling.innerHTML = "Please enter the child's name.";
    valid = false;
  } else {
    document.getElementById("childName").nextElementSibling.innerHTML = "";
  }
  
  // Validate childSurname
  if (childSurname.value === "") {
    document.getElementById("childSurname").nextElementSibling.innerHTML = "Please enter the child's surname.";
    valid = false;
  } else {
    document.getElementById("childSurname").nextElementSibling.innerHTML = "";
  }
  
  //ChildSex
  if (getSelectedSex(childSexList) === "") {
    document.getElementById("error-message").innerHTML = "Please enter the child's gender.";
    valid = false;
  } else {
    document.getElementById("error-message").innerHTML = "";
  }
  
  // Validate birthDate
  if (birthDate.value === "") {
    document.getElementById("birthDate").nextElementSibling.innerHTML = "Please enter the birth date.";
    valid = false;
  } else {
    document.getElementById("birthDate").nextElementSibling.innerHTML = "";
  }
  
  // Validate placeOfBirth
  if (placeOfBirth.value === "") {
    document.getElementById("placeOfBirth").nextElementSibling.innerHTML = "Please enter the place of birth.";
    valid = false;
  } else {
    document.getElementById("placeOfBirth").nextElementSibling.innerHTML = "";
  }
  
  // Child religion
  if (getReligion(childReligionDropdown, childReligionInput) === '') {
    document.getElementById("childReligionInput").nextElementSibling.innerHTML = "Please enter the Child religion.";
    valid = false;
  } else {
    document.getElementById("childReligionInput").nextElementSibling.innerHTML = "";
  }
  
  // Mother Family Name
  if (motherFamilyName.value === "") {
    document.getElementById("motherFamilyName").nextElementSibling.innerHTML = "Please enter the Mother family name.";
    valid = false;
  } else {
    document.getElementById("motherFamilyName").nextElementSibling.innerHTML = "";
  }
  
  // Mother birth Name
  if (motherBirthName.value === "") {
    document.getElementById("motherBirthName").nextElementSibling.innerHTML = "Please enter the Mother birth name.";
    valid = false;
  } else {
    document.getElementById("motherBirthName").nextElementSibling.innerHTML = "";
  }
  
  // Mother Surname 
  if (motherSurname.value === "") {
    document.getElementById("motherSurname").nextElementSibling.innerHTML = "Please enter the Mother Surname.";
    valid = false;
  } else {
    document.getElementById("motherSurname").nextElementSibling.innerHTML = "";
  }
  
  // Mother religion
  if (getReligion(motherReligionDropdown, motherReligionInput) === '') {
    document.getElementById("motherReligionInput").nextElementSibling.innerHTML = "Please enter the Mother religion.";
    valid = false;
  } else {
    document.getElementById("motherReligionInput").nextElementSibling.innerHTML = "";
  }

  // Father Family Name
  if (fatherFamilyName.value === "") {
    document.getElementById("fatherFamilyName").nextElementSibling.innerHTML = "Please enter the Father family name.";
    valid = false;
  } else {
    document.getElementById("fatherFamilyName").nextElementSibling.innerHTML = "";
  }

  // Father birth Name
  if (fatherBirthName.value === "") {
    document.getElementById("fatherBirthName").nextElementSibling.innerHTML = "Please enter the Father birth name.";
    valid = false;
  } else {
    document.getElementById("fatherBirthName").nextElementSibling.innerHTML = "";
  }

  // Father Surname 
  if (fatherSurname.value === "") {
    document.getElementById("fatherSurname").nextElementSibling.innerHTML = "Please enter the Father Surname.";
    valid = false;
  } else {
    document.getElementById("fatherSurname").nextElementSibling.innerHTML = "";
  }

  // Father religion
  if (getReligion(fatherReligionDropdown, fatherReligionInput) === '') {
    document.getElementById("fatherReligionInput").nextElementSibling.innerHTML = "Please enter the Father religion.";
    valid = false;
  } else {
    document.getElementById("fatherReligionInput").nextElementSibling.innerHTML = "";
  }
  
  return valid;
}

//var modalTestButton = document.getElementById('modalTestButton');
var spinner = document.getElementById('mySpinner')
var myModal = new bootstrap.Modal(document.getElementById('myModal'))
const modalBody = document.getElementById('injectText');
// Add a click event listener to the button
submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const birthAct = [registryOffice.value, registrationNumber.value,
  [childName.value, childSurname.value, getSelectedSex(childSexList), birthDate.value, placeOfBirth.value, getReligion(childReligionDropdown, childReligionInput)],
  [motherFamilyName.value, motherBirthName.value, motherSurname.value, getReligion(motherReligionDropdown, motherReligionInput)],
  [fatherFamilyName.value, fatherBirthName.value, fatherSurname.value, getReligion(fatherReligionDropdown, fatherReligionInput)],
  replaceIfEmpty(furtherInformation)];

  console.log(birthAct);
  //console.log('furtherInformation',furtherInformation.value.length);
  //testRequest();

  
  const result = isValidForm();
  if (result) {
    
     // Show the spinner
  spinner.removeAttribute("hidden");
  // Disable the button to prevent multiple clicks
  submitBtn.disabled = true;
  //spinner.textContent = 'Encrypting...'
  console.log(spinner.hidden);
  setTimeout(async() => {
    const encryptedPayload = await sendPayloadToEncryptionService('05b3ef07de3d49491f7459202ba96fa215abbba696300710ae78837f47652cf8844cbbeb84b552e3d06c1624c1d2cabe98da16b525b102914eb7fbe7b3f8a23f',birthAct);
  spinner.setAttribute("hidden", "");
  spinner.textContent = ''
  submitBtn.textContent = "Encryption Done";
  console.log(encryptedPayload);
  }, 3000);
  

  } else {
    console.log('form incomplete');
  }






});

/*
modalTestButton.onclick = async function () {
  const text = await testRequest();
  modalBody.innerText = text;
  myModal.toggle();
}
*/
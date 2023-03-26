  function removeNonAlphaNumeric(str) {
    return str.replace(/[^a-zA-Z0-9äüöß/./\s+/g ]/g, '');
  }
  
  function formatOCRText(input) {
    const regex = /(?<=^|\n)(?:(Kind|Mutter|Vater)\n)?((?:(?!^(?:Kind|Mutter|Vater)\n).*?(?=\n))+(?:\n|$))/g;
    let output = '';
    let matches;
    while (matches = regex.exec(input)) {
      let [_, parent, data] = matches;
      if (parent) {
        output += `${parent}${data.replace(/\n(?!\n)/g, `\n${parent}`)}`;
      } else {
        output += data;
      }
    }
    output += ' endoftext';
    return output;
  }
  
  function splitByLineBreaks(ocrOutput) {
    return ocrOutput.split(/\r?\n/);
  }

  function addPrefixes(inputArray) {
    inputArray[10] = "Mutter" + inputArray[10];
    inputArray[14] = "Vater" + inputArray[14];
    return inputArray;
  }

  function convertArrayToObject(inputArray) {
    const outputObject = {};
    inputArray.forEach((element) => {
      const separatorIndex = element.indexOf(" ");
      const key = element.slice(0, separatorIndex);
      const value = element.slice(separatorIndex + 1);
      outputObject[key] = value.trim() || "";
    });
    return outputObject;
  }

  function formatDate(dateString) {
    var dateParts = dateString.split("/");
    var year = dateParts[2];
    var month = dateParts[1].padStart(2, "0");
    var day = dateParts[0].padStart(2, "0");
    return year + "-" + month + "-" + day;
  }
  
  
  // load data to the inputs from loaded file
const setFormValuesFromLoadedFile = (obj) => {
  
  /*
   obj: {
      : "endoftext",
      Geburtsort: "Oberhausen Sterkrade /",
      Geburtstag: "15/12/1990",
      Geburtsurkund: "Geburtsurkunde",
      Geschlecht: "Männlich",
      K: "Siegel Urkundsperson ggäj",
      KindGeburtsname: "Gouiaa",
      KindVornamen: "Ramy",
      MutterFamilienname: "Gouiaa",
      MutterGeburtsname: "Tissaoui",
      MutterVornamen: "Lobna /",
      Ort: "Tag   5 X",
      Registernummer: "1234/4321",
      Religion: "Islamisch",
      Standesamt: "berlin behörde",
      VaterFamilienname: "Gouiaa",
      VaterGeburtsname: "Gouiaa",
      VaterVornamen: "Ghosn Z a g"
    }
  */
    registryOffice.value = obj.Standesamt;
    registrationNumber.value = obj.Registernummer;
  
    childName.value = obj.KindGeburtsname;
    childSurname.value = obj.KindVornamen;
    birthDate.value = formatDate(obj.Geburtstag);
    placeOfBirth.value = obj.Geburtsort;
    if (obj.Geschlecht === "Männlich") {
      const childSexM = document.getElementById("childSexM");
    childSexM.checked = true;
    }else {
      const childSexF = document.getElementById("childSexF");
    childSexF.checked = true;
    }
    
    motherFamilyName.value = obj.MutterFamilienname;
    motherBirthName.value = obj.MutterGeburtsname;
    motherSurname.value = obj.MutterVornamen;
  
    fatherFamilyName.value = obj.VaterFamilienname;
    fatherBirthName.value = obj.VaterGeburtsname;
    fatherSurname.value = obj.VaterVornamen;
  
  }
  
  function computeAndParseText(ocroutput){
    const newText = formatOCRText(ocroutput);
    const newTextcleaned = removeNonAlphaNumeric(newText);
    const textToArray = splitByLineBreaks(newTextcleaned);
    const updatedArr = addPrefixes(textToArray);
    return convertArrayToObject(updatedArr);
    }

function recognizeText(image) {
    Tesseract.recognize(
        image,
        'deu',
        { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            console.log(text);
            const parsedData = computeAndParseText(text);
            setFormValuesFromLoadedFile(parsedData);
            console.log('parsedData:',parsedData);
        })
        .catch((error) => {
            console.error(error);
        });
}

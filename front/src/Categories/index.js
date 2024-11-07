const urlCategories = `http://localhost/API/category_API.php`;
const form = document.getElementById('chefe');

const categoryInput = document.getElementById("barra_categoria");
const localStorageKeyproducts = "products";
const taxInput = document.getElementById("barra_tax");
const botao_add = document.getElementById("botao_add");
const formchefe = document.getElementById("chefe");

showValues();

function addnewcategory() {

        formData = new FormData();

        if(validfinal() == false){
          //pass
        }else{
          value = validfinal();
          tax = taxInput.value;
          console.log(value);
 

          formData.append("category",value);
          formData.append("tax",tax);

          fetch(urlCategories, {
              method: 'POST',
              body: formData
          })
          .then(response => response.text())
          .then(data => {
              location.reload();
          })
          .catch(error => {
              alert("Error", error);
          });
          showValues()
        }
        categoryInput.value = "";
        taxInput.value = "";
      };


// VALIDAÇÃO
function isCategoryValid(inputvalue) {
  const categoryRegex = new RegExp(/[a-zA-Z]/);
  if (categoryRegex.test(inputvalue)) {
    return true;
  } else {
    return false;
  }
}

function isTaxValid(inputvalue) {
  const taxRegex = new RegExp(/^[0-9]/);
  if (taxRegex.test(inputvalue)) {
    return true;
  } else {
    return false;
  }
}

function replacecategory(categoryvalue) {
  return categoryvalue
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^\s+|\s+$/g, "");
}


function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function validfinal(){
  categoryfinal = replacecategory(categoryInput.value)
  categoryfinal = titleCase(categoryfinal)
  tax = taxInput.value
  quantia = 10


  if (!categoryfinal || !taxInput.value) {
    alert("please provide valid information!");
    return false;
  }
  // nao deixa o usuario utlizar numeros ou caracteres especiais
  if (!isCategoryValid(categoryfinal)) {
     alert("only letters are allowed in the name category");
    return false;
  }
  // nao deixa o usuario utlizar algo que nao sabe do tipo numero
  if (!isTaxValid(tax)) {
    alert("only numbers are allowed in the tax");
    return false;
  }
  if (tax <= 0 || tax >= 100) {
    alert("Please enter a value greater equal to 0 or less than or equal to 100");
    return false;
  }
  if(categoryfinal.length >= quantia){
    alert("the size of the registered category is larger than allowed, check the category (the suggested size is smaller than 10)")
    return false;
  }
    return categoryfinal;
}

// Faz as tabelas atulizarem pos lançamento

async function showValues() {
    const tabela = document.getElementById("tabela");
    const response = await fetch(urlCategories);
    const categoriesList = await response.json();
    
    tabela.innerHTML = "";
    for (let i = 0; i < categoriesList.length; i++) {
      
      tabela.innerHTML += `
         <tr>
          <td>${categoriesList[i].cod_categories}</td>
          <td>${categoriesList[i].name_categories}</td>
          <td>${categoriesList[i].tax}%</td>
          <td><button id="delete_1_categoria" onclick = removeItem(${categoriesList[i].cod_categories})>Delete</button></td>
         </tr>
          `
    }
}

async function removeItem(code) {
  if (confirm("Are you sure you want to delete this category? ")) {
    try{
        const response = await fetch(`http://localhost/API/category_API.php?code=${code}`, {            
            method: "DELETE"
        }).then((response) => {
          location.reload()
        })
    }catch{
      console.log("erro");
    }

  }
}
showValues()


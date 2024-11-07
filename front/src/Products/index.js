const urlCategories = `http://localhost/API/category_API.php`;
const urlProducts = `http://localhost/API/product_API.php`;
const urlhome = `http://localhost/API/HOME_API.php`;
const urlhistory = `http://localhost/API/history_API.php`

const localStorageKeyproducts = "products";
const categoryselect = document.querySelector("#categoryselect");
const form = document.getElementById("chefe");
//inputs
const productinput = document.getElementById("productname");
const amountinput = document.getElementById("amount");
const unitpriceinput = document.getElementById("unitprice");
//mostras dados

//

async function addnewproduct() {
  if (validadados() == false) {
    //pass
  } else {
    formData = new FormData();

    value = validadados();
    amount = amountinput.value;
    price = unitpriceinput.value;
    categorychose = categoryselect.value;

    formData.append("product", value);
    formData.append("amount", amount);
    formData.append("price", price);
    formData.append("categorychose", categorychose);

    await fetch(urlProducts, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Product created successfully!");
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  productinput.value = "";
  amountinput.value = "";
  unitprice.value = "";
}

async function showcategorychose() {
  const response = await fetch(urlCategories);
  if (response) {
    const categoriesList = await response.json();
    const select = document.getElementById("categoryselect");
    categoriesList.forEach((category) => {
      select.innerHTML += `<option value = "${category.cod_categories}">${category.name_categories}</option>`;
    });
  }
}
showcategorychose();

function validadados() {
  productfinal = replaceproducts(productinput.value);
  productfinal = titleCase(productfinal);
  amount = amountinput.value;
  price = unitpriceinput.value;
  const quantia = 15;

  if (!productfinal || !amount || !price) {
    alert("please provide valid information!");
  }
  // nao deixa o usuario utlizar numeros ou caracteres especiais
  if (!isproductValid(productfinal)) {
    alert("only letters are allowed in the product name");
    return false;
  }
  // nao deixa o usuario utlizar algo que nao sabe do tipo numero
  if (!isnumberValid(amount)) {
    alert("only numbers are allowed in the amount");
    return false;
  }
  // nao deixa o usuario utlizar algo que nao sabe do tipo numero
  if (!isnumberValid(price)) {
    alert("only numbers are allowed in the unit price");
    return false;
  }
  //limita o tamanho do amount
  if (amount <= 0) {
    alert("Please enter a value greater to 0 in the amount");
    return false;
  }
  //limita o valor do price
  if (price <= 0) {
    alert("Please enter a value greater to 0 in the unit price");
    return false;
  }
  //limita a quanti de letras
  if (productfinal.length >= quantia) {
    alert(
      "the size of the registered category is larger than allowed, check the category (the suggested size is smaller than 15)"
    );
    return false;
  }
  return productfinal;
}

//Validação

function isproductValid(inputvalue) {
  const categoryRegex = new RegExp(/[a-zA-Z]/);
  if (categoryRegex.test(inputvalue)) {
    return true;
  } else {
    return false;
  }
}

function isnumberValid(inputvalue) {
  const taxRegex = new RegExp(/^[0-9]/);
  if (taxRegex.test(inputvalue)) {
    return true;
  } else {
    return false;
  }
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function replaceproducts(input) {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^\s+|\s+$/g, "");
}

async function showValues() {
  const tabela = document.getElementById("tabela_produtos");
  const response = await fetch(urlProducts);
  const productList = await response.json();

  tabela.innerHTML = "";
  for (let i = 0; i < productList.length; i++) {
    var numberindice = productList[i].categorychose;

    tabela.innerHTML += `
    <tr>
    <td>${productList[i].cod_product}</td>
    <td>${productList[i].name_product}</td>
    <td>${productList[i].amount_product}</td>
    <td>$${productList[i].price}</td>
    <td>${(await getNameById(numberindice)).name_categories}</td>
    <td><button id="delete_1" onclick = removeItem(${productList[i].cod_product})>Delete</button></td>
    </tr>
    `;
  }
}
async function getNameById(input) {
  const response = await fetch(urlCategories);
  const categoriesList = await response.json();

  return categoriesList.find((categories) => categories.cod_categories == input );
}
showValues();

async function findproductsell(input){
  const response = await fetch(urlhistory);
  const historyList = await response.json();
  console.log(historyList);
    
  search = historyList.find((history) => history.product_home == input);
  return search
}

async function removeItem(code) {
  check = await findproductsell(code)
  if(confirm("Are you sure you want to delete this category? ")){
    if(check){
      alert("the product being deleted cannot be deleted")
    }
    else{
      try {
        const response = await fetch(
          `http://localhost/API/product_API.php?code=${code}`,
          {
            method: "DELETE",
          }
        ).then((response) => {
          location.reload();
        });
      } catch {
        console.log("erro");
      }
    }
  }
}
  
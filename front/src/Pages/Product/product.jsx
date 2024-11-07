import { InputText } from "../../components/Input";
import { Inputbutton } from "../../components/submit";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./product.module.css";
import Table from "../../components/Table";


const Product = () => {
  const [category, setCategory] = useState([]);
  const [post, setpost] =useState(false)
  const [newproduct, setnewProduct] = useState({
    product: "",
    amount: "",
    price: "",
    select: "",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handlechange = (e) => {
    setnewProduct({
      ...newproduct,
      [e.target.name]: e.target.value,
    });
  };

  function validadados() {
    const productfinal = newproduct.product;

    const amount = newproduct.amount;
    const price = newproduct.price;
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
    return true;
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

  async function handlesubmit(event) {
    if (!validadados()) {
      //pass
    } else {
      event.preventDefault();
      const response = await fetch("http://localhost/API/product_API.php", {
        method: "POST",
        body: JSON.stringify(newproduct), 
      })
      alert("product added successfully");
      setpost((event) => !event)
    }
  }



  async function getCategories() {
    const response = await fetch("http://localhost/API/category_API.php");
    const responseData = await response.json();
    setCategory(responseData);
  }


  return (
    <div>
      <div>
        <form id={styles.main} onSubmit={handlesubmit}>
          <section id={styles.form}>
            <div id={styles.input}>
              <InputText
                type="text"
                id="bar_product"
                name="product"
                maxLength="15"
                minLength="0"
                value={newproduct.product || ""}
                onChange={handlechange}
                placeholder="Product"
                required
              />
              <InputText
                type="number"
                id="bar_amount"
                name="amount"
                min="0"
                value={newproduct.amount || ""}
                onChange={handlechange}
                placeholder="Amount"
                required
              />
              <InputText
                type="number"
                id="bar_price"
                name="price"
                min="0"
                value={newproduct.price || ""}
                onChange={handlechange}
                placeholder="Unit Price"
                required
              />
              <select
                name="select"
                id="categorychose"
                onChange={handlechange}
                required
              >
                <option value="" hidden>
                  Category
                </option>
                {Object.values(category).map((category) => (
                  <option key={category.code} value={category.code}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Inputbutton
                type="submit"
                name="submit"
                className="submit"
                content="Add Product"
              />
            </div>
          </section>
          <div id={styles.bord_mid}></div>
          <section id={styles.table}>
          <div id={styles.vitor}>
            <Table
              api="product"
              columns={["Cod", "Product", "Amount", "Price", "Category"]}
              params={["code", "name", "amount", "price", "category"]}
              vitor={post}
            />
          </div>
        </section>
        </form>
      </div>
    </div>
  );
};
export default Product;

import { InputText } from "../../components/Input";
import styles from "./category.module.css";
import { Inputbutton } from "../../components/submit";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";

const Category = () => {
  const [data, SetData] = useState([]);
  const [post, setpost] =useState(false)
  const [newpost, setnewpost] = useState({
    category_bar: "",
    tax_bar: "",
  });

  function validadados() {
    const categoryfinal = newpost.category_bar;
    const tax = newpost.tax_bar;
    const quantia = 15;

    if (!categoryfinal || !tax) {
      alert("please provide valid information!");
    }
    // nao deixa o usuario utlizar numeros ou caracteres especiais
    if (!isproductValid(categoryfinal)) {
      alert("only letters are allowed in the category name");
      return false;
    }
    // nao deixa o usuario utlizar algo que nao seja do tipo numero
    if (!isnumberValid(tax)) {
      alert("only numbers are allowed in the tax");
      return false;
    }
    //limita o tamanho do tax
    if (tax <= 0) {
      alert("Please enter a value greater to 0 in the amount");
      return false;
    }
    //limita a quanti de letras
    if (categoryfinal.length >= quantia) {
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


  useEffect(() => {
    axios
      .get("http://localhost/API/category_API.php")
      .then((res) => SetData(res.data))
      .catch((er) => console.log(er));
  }, []);

  const handlechange = (e) => {
    setnewpost({
      ...newpost,
      [e.target.name]: e.target.value,
    });
  };

  async function handlesubmit(event) {
    if(!validadados()){
      //pass
    }else{
    event.preventDefault();
    const response = await fetch("http://localhost/API/category_API.php", {
      method: "POST",
      body: JSON.stringify(newpost),
    })
    setpost((event) => !event)
    alert("category added successfully");
   }

  function removeItem(code, name) {
    if (window.confirm(`Are you sure you want to delete category ${name}? `)) {
      try {
        const response = axios.delete(
          `http://localhost/API/category_API.php?code=${code}`,
          {
            method: "DELETE",
          }
        );
        SetData(data.filter((e) => e.code != code));
        alert("category deleted successfully");
      } catch {
        alert("An error was found, please check");
      }
      }
    }
  }
  return (
    <div>
      <form id={styles.main} onSubmit={handlesubmit}>
        <section id={styles.form}>
          <div id={styles.input}>
            <InputText
              type="text"
              name="category_bar"
              maxLength="15"
              minLength="0"
              onChange={handlechange}
              placeholder="Category Name"
              required
            />
            <InputText
              type="number"
              name="tax_bar"
              max="100"
              min="0"
              onChange={handlechange}
              placeholder="Tax"
              required
            />
            <Inputbutton
              type="submit"
              className="submit"
              content="Add Category"
            />
          </div>
        </section>
        <div id={styles.bord_mid}></div>
        <section id={styles.table}>
          <div id={styles.vitor}>
            <Table
              api="category"
              columns={["Cod", "Category", "Tax"]}
              params={["code", "name", "tax"]}
              vitor={post}
              edit = {false}
            />
          </div>
        </section>
      </form>
    </div>
  );
};
export default Category;

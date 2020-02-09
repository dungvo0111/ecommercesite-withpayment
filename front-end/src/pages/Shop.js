import React, { useState, useEffect } from "react";
import "../App.css";
import Footer from "../pageComponents/Footer";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure()

export default function Shop() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const data = await fetch(
      "https://fortnite-api.theapinetwork.com/store/get"
    );
    const items = await data.json();

    //console.log(items.data);
    setItems(items.data);
  };

  const clickCart = e => {
    //console.log(e.target.parentElement.parentElement);
    const shopItem = e.target.parentElement.parentElement;
    const title = shopItem.getElementsByClassName("shop-item-title")[0]
      .innerText;
    const price = shopItem.getElementsByClassName("shop-item-price")[0]
      .innerText;
    const imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    //console.log(title, price, imgSrc);
    addToCart(title, price, imgSrc);
  };

  const addToCart = (title, price, imgSrc) => {
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    const cartItems = document.getElementsByClassName("cart-items")[0];
    const cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText === title) {
        alert("This item is already added to the cart");
        return;
      }
    }
    const cartRowContents = `
            <div class='cart-item cart-column'>
                <img class='cart-item-image' src='${imgSrc}' />
                <span class='cart-item-title'>${title}</span>
            </div>
                <span class='cart-price cart-column'>${price}</span>
                <div class='cart-item cart-column'>
                    <input class='cart-quantity-input' type='number'/>
                    <button class='btn btn-danger' type='button'>REMOVE</button>
            </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    //console.log(cartRow);
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", handleRemove);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
  };

  const handleRemove = e => {
    e.target.parentElement.parentElement.remove();
    updateCartTotal();
  };

  const quantityChanged = e => {
    const input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  };

  const updateCartTotal = () => {
    const cartItemContainer = document.getElementsByClassName("cart-items")[0];
    const cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      const priceElement = cartRow.getElementsByClassName("cart-price")[0];
      const quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      const price = parseFloat(priceElement.innerText.replace("$", ""));
      const quantity = quantityElement.value;
      total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + total;
  };

  async function handleToken(token) {
    var priceElement = document.getElementsByClassName("cart-total-price")[0];
    var price = parseFloat(priceElement.innerText.replace("$", "")) * 100;

    const response = await axios.post("http://localhost:5000/purchase", {
      token,
      price
    });
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast.success("Success! Check email for details");
      const cartItems = document.getElementsByClassName("cart-items")[0];
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
      }
      updateCartTotal();
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <section>
        <h1 className="section-header">Items</h1>
        <div className="shop-items">
          {items.map(item => (
            <div className="shop-item" key={item.itemId}>
              <span className="shop-item-title">{item.item.name}</span>

              <img className="shop-item-image" src={item.item.images.icon} />
              <div className="shop-item-details">
                <span className="shop-item-price">${item.store.cost}</span>
                <button
                  className="btn btn-primary shop-item-button"
                  type="button"
                  onClick={clickCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container content-section">
        <h1 className="section-header">CART</h1>
        <div className="cart-row ">
          <span className="cart-item cart-header cart-column">ITEM</span>
          <span className="cart-price cart-header cart-column">PRICE</span>
          <span className="cart-quantity cart-header cart-column">
            QUANTITY
          </span>
        </div>

        <div className="cart-items" />

        <div className="cart-total">
          <strong className="cart-total-title">Total</strong>
          <span className="cart-total-price">$0</span>
        </div>
        {/* <button
          className="btn btn-primary btn-purchase"
          type="button"
          onClick={purchaseClicked}
        >
          PURCHASE
        </button> */}
        <StripeCheckout
          stripeKey="pk_test_LDKgmNqDE4RjWmi7M8yXSyOq00ZoPbA5vo"
          token={handleToken}
        />
      </section>
      <Footer />
    </div>
  );
}

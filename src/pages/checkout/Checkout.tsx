import React, { useState } from "react";
import CheckoutHeader from "../../components/checkout.components/checkout.hedear";
import AddressCart from "../../components/checkout.components/Address.cart";

const CheckOutPage: React.FC = () => {
  const [title, setTitle] = useState<string>("Home");
  const [shipAddress, setShipAddress] = useState<string>("Somewhere You Live");

  const shippingAddress = localStorage.getItem("shipping");

  if (!shippingAddress) {
    console.log("Using default address");
  } else {
    const parsedAddress = JSON.parse(shipAddress);
    setTitle(parsedAddress.title);
    setShipAddress(parsedAddress.shipAddress);
  }

  return (
    <div>
      <div className="mx-8 my-4 ">
        <CheckoutHeader />
        <h2 className="font-semibold text-2xl mt-9">Shipping Address</h2>
        <AddressCart title={title} address={shipAddress} />
      </div>
    </div>
  );
};

export default CheckOutPage;

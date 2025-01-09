import React, { useState } from "react";
import CheckoutHeader from "../../components/checkout.components/checkout.hedear";
import AddressCart from "../../components/checkout.components/Address.cart";
import DeliveryCard from "../../components/checkout.components/delivery.card";
import PromoCode from "../../components/checkout.components/PromoCode";
import OrderList from "../../components/checkout.components/OrderList";

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
        <hr className="w-[95%] mx-auto my-5" />
        <h2 className="font-semibold text-2xl">Order List</h2>
        <OrderList />
        <hr className="w-[95%] mx-auto my-5" />
        <h2 className="font-semibold text-2xl mb-4">Choose Shipping</h2>
        <DeliveryCard />
        <hr className="w-[95%] mx-auto my-5" />
        <h2 className="font-semibold text-2xl mb-4">Promo Code</h2>
        <PromoCode />
      </div>
    </div>
  );
};

export default CheckOutPage;

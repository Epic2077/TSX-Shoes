import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { useSelector } from "react-redux";
import CheckoutHeader from "../../components/checkout.components/checkout.hedear";
import AddressCart from "../../components/checkout.components/Address.cart";
import DeliveryCard from "../../components/checkout.components/delivery.card";
import PromoCode from "../../components/checkout.components/PromoCode";
import OrderList from "../../components/checkout.components/OrderList";
import { RootState } from "../../store";

interface Address {
  name: string;
  address: string;
}

const CheckOutPage: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.token);

  const { data: addresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await axios.get<Address[]>(`${BASE_URL}/api/address`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    },
  });

  const defaultAddress =
    addresses?.find((addr) => addr.name === "Home") || addresses?.[0];

  return (
    <div>
      <div className="mx-8 my-4 ">
        <CheckoutHeader />
        <h2 className="font-semibold text-2xl mt-9">Shipping Address</h2>
        <AddressCart
          title={defaultAddress?.name || "Home"}
          address={defaultAddress?.address || "Add an address"}
        />
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

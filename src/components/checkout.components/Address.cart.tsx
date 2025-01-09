import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { RootState } from "../../store";
import { Address } from "node:cluster";
import { useNavigate } from "react-router-dom";

interface addressProps {
  title: string;
  address: string;
}

const AddressCart: React.FC<addressProps> = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const selectedAddressName = localStorage.getItem("selectedAddress");

  const { data: addresses } = useQuery({
    queryKey: ["addresses", selectedAddressName], // Add selectedAddressName to trigger refresh
    queryFn: async () => {
      const response = await axios.get<Address[]>(`${BASE_URL}/api/address`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    },
  });

  const selectedAddress = addresses?.find(
    (addr) => addr.name === selectedAddressName
  );

  return (
    <div className="bg-slate-50 w-full h-28 mt-6 rounded-3xl p-5 flex gap-4 items-center">
      <div className="w-16 h-16 bg-slate-200 rounded-full grid justify-center items-center">
        <div className="h-11 w-11 bg-black rounded-full grid justify-center items-center">
          <img src="../../../src/assets/icons/location.svg" alt="location" />
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-[24px]">
          {selectedAddress?.name || "Add address"}
        </h1>
        <p className="text-gray-500">
          {selectedAddress?.address || "Please select an address"}
        </p>
      </div>
      <div
        onClick={() => navigate("/Checkout/address")}
        className="w-10 h-10 ml-auto rounded-full grid place-items-center cursor-pointer"
      >
        <img
          src="../../../src/assets/icons/pen.svg"
          alt="edit"
          className="w-6 h-6"
        />
      </div>
    </div>
  );
};

export default AddressCart;

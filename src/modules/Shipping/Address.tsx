import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { toast } from "react-toastify";
import ShippingCard from "../../components/checkout.components/Shipping.cards";
import { useQuery } from "react-query";
import { RootState } from "../../store";
import { useQueryClient } from "react-query";

interface Address {
  name: string;
  address: string;
}

const Address: React.FC = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", address: "" });
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const queryClient = useQueryClient();

  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await axios.get<Address[]>(`${BASE_URL}/api/address`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    },
  });

  const handleAddressSelect = (addressName: string) => {
    setSelectedAddress(addressName);
    localStorage.setItem("selectedAddress", addressName);
    toast.success("Address selected successfully!");
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/address`, newAddress, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Address added successfully!");
      queryClient.invalidateQueries(["addresses"]);
      setShowForm(false);
      setNewAddress({ name: "", address: "" });
    } catch (error) {
      toast.error("Failed to add address");
      console.error("Failed to add address:", error);
    }
  };

  const handleApply = () => {
    if (!selectedAddress) {
      toast.error("Please select an address first");
      return;
    }

    localStorage.setItem("selectedAddress", selectedAddress);
    toast.success("Address applied successfully!");
    navigate(-1);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Addresses</h2>
      </div>

      {/* Existing Addresses */}
      <div className="space-y-4">
        {addresses?.map((addr) => (
          <ShippingCard
            key={addr.name}
            title={addr.name}
            address={addr.address}
            icon="location"
            active={selectedAddress === addr.name}
            def={addr.name === "Home"}
            onClick={() => handleAddressSelect(addr.name)}
          />
        ))}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="bg-gray-300 text-black px-4 py-4 rounded-full w-full mt-4"
      >
        Add New Address
      </button>

      {/* Add Apply Button */}
      <button
        onClick={handleApply}
        className="bg-black text-white px-4 py-4 rounded-full w-full mt-4 sticky bottom-0 left-0"
      >
        Apply
      </button>

      {/* Add Address Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Address Name (e.g., Home)"
                  className="w-full p-3 rounded-lg border"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Full Address"
                  className="w-full p-3 rounded-lg border"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 p-3 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 p-3 bg-black text-white rounded-lg"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;

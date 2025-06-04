import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../hooks/useCart";
import { useAddresses } from "../hooks/useAddresses";
import useCheckout from "../hooks/useCheckout";
import FormInput from "../components/common/Input/FormInput";
import FormButton from "../components/common/Button/FormButton";
import CartTable from "../components/cart/CartTable";
import LoadingState from "../components/common/LoadingState/LoadingState";

export default function CheckoutPage() {
  const { cart, loading: cartLoading } = useCart();
  const { checkout, loading: placingOrder, error } = useCheckout();
  const { addresses, loading: addressesLoading } = useAddresses();
  const navigate = useNavigate();

  const [selectedDeliveryId, setSelectedDeliveryId] = useState("new");
  const [selectedBillingId, setSelectedBillingId] = useState("new");
  const [sameAsDelivery, setSameAsDelivery] = useState(true);

  const [newDeliveryAddr, setNewDeliveryAddr] = useState({
    streetLine: "",
    postalCode: "",
    city: "",
    county: "",
    country: "",
  });

  const [newBillingAddr, setNewBillingAddr] = useState({
    streetLine: "",
    postalCode: "",
    city: "",
    county: "",
    country: "",
  });

  const [paymentType, setPaymentType] = useState("CASH");

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      cartId: cart.id,
      paymentType,
    };

    // Handle delivery address
    if (selectedDeliveryId === "new") {
      orderData.deliveryAddress = newDeliveryAddr;
    } else {
      orderData.deliveryAddressId = parseInt(selectedDeliveryId);
    }

    // Handle billing address
    if (sameAsDelivery) {
      if (selectedDeliveryId === "new") {
        orderData.invoiceAddress = newDeliveryAddr;
      } else {
        orderData.invoiceAddressId = parseInt(selectedDeliveryId);
      }
    } else {
      if (selectedBillingId === "new") {
        orderData.invoiceAddress = newBillingAddr;
      } else {
        orderData.invoiceAddressId = parseInt(selectedBillingId);
      }
    }

    try {
      const orderResponse = await checkout(orderData);
      navigate("/order-confirmation", { state: { order: orderResponse } });
    } catch {
      return;
    }
  };

  if (cartLoading || addressesLoading) return <LoadingState />;

  if (!cart.entries.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p>Your cart is empty.</p>
        <Link to="/products" className="underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  const itemCount = cart.entries.reduce((n, e) => n + e.quantity, 0);

  return (
    <section className="px-6 max-w-6xl mx-auto py-16 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl uppercase font-light">Checkout</h1>
        <Link to="/cart" className="relative group">
          <ShoppingBagIcon className="w-8 h-8" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-yellow-400 text-[10px] font-semibold text-black flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Delivery Address Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-light uppercase">Delivery Address</h2>
            
            {addresses.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Address</label>
                <select
                  value={selectedDeliveryId}
                  onChange={(e) => setSelectedDeliveryId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xs bg-offwhite focus:outline-none focus:ring-2 focus:ring-richblack"
                >
                  <option value="new">Add New Address</option>
                  {addresses.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.streetLine}, {addr.city} {addr.postalCode}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedDeliveryId === "new" && (
              <div className="space-y-4 pt-4">
                <FormInput
                  label="Street"
                  id="d-street"
                  name="streetLine"
                  value={newDeliveryAddr.streetLine}
                  onChange={handleChange(setNewDeliveryAddr)}
                  required
                />
                <FormInput
                  label="Postal Code"
                  id="d-postal"
                  name="postalCode"
                  value={newDeliveryAddr.postalCode}
                  onChange={handleChange(setNewDeliveryAddr)}
                  required
                />
                <FormInput
                  label="City"
                  id="d-city"
                  name="city"
                  value={newDeliveryAddr.city}
                  onChange={handleChange(setNewDeliveryAddr)}
                  required
                />
                <FormInput
                  label="County"
                  id="d-county"
                  name="county"
                  value={newDeliveryAddr.county}
                  onChange={handleChange(setNewDeliveryAddr)}
                  required
                />
                <FormInput
                  label="Country"
                  id="d-country"
                  name="country"
                  value={newDeliveryAddr.country}
                  onChange={handleChange(setNewDeliveryAddr)}
                  required
                />
              </div>
            )}
          </div>

          {/* Billing Address Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-light uppercase">Billing Address</h2>
            
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="sameAsDelivery"
                checked={sameAsDelivery}
                onChange={(e) => setSameAsDelivery(e.target.checked)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <label htmlFor="sameAsDelivery" className="text-sm text-gray-700">
                Same as delivery address
              </label>
            </div>

            {!sameAsDelivery && (
              <>
                {addresses.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Address</label>
                    <select
                      value={selectedBillingId}
                      onChange={(e) => setSelectedBillingId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xs bg-offwhite focus:outline-none focus:ring-2 focus:ring-richblack"
                    >
                      <option value="new">Add New Address</option>
                      {addresses.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                          {addr.streetLine}, {addr.city} {addr.postalCode}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedBillingId === "new" && (
                  <div className="space-y-4 pt-4">
                    <FormInput
                      label="Street"
                      id="i-street"
                      name="streetLine"
                      value={newBillingAddr.streetLine}
                      onChange={handleChange(setNewBillingAddr)}
                      required
                    />
                    <FormInput
                      label="Postal Code"
                      id="i-postal"
                      name="postalCode"
                      value={newBillingAddr.postalCode}
                      onChange={handleChange(setNewBillingAddr)}
                      required
                    />
                    <FormInput
                      label="City"
                      id="i-city"
                      name="city"
                      value={newBillingAddr.city}
                      onChange={handleChange(setNewBillingAddr)}
                      required
                    />
                    <FormInput
                      label="County"
                      id="i-county"
                      name="county"
                      value={newBillingAddr.county}
                      onChange={handleChange(setNewBillingAddr)}
                      required
                    />
                    <FormInput
                      label="Country"
                      id="i-country"
                      name="country"
                      value={newBillingAddr.country}
                      onChange={handleChange(setNewBillingAddr)}
                      required
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Payment Method Section */}
          <div className="space-y-2">
            <label
              htmlFor="paymentType"
              className="text-base font-medium text-gray-700"
            >
              Payment Method
            </label>
            <select
              id="paymentType"
              name="paymentType"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xs bg-offwhite focus:outline-none focus:ring-2 focus:ring-richblack"
            >
              <option value="CARD">Card</option>
              <option value="CASH">Cash</option>
              <option value="APPLE_PAY">Apple Pay</option>
              <option value="GOOGLE_PAY">Google Pay</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          
          <FormButton loading={placingOrder} loadingText="Placing Order...">
            Place Order
          </FormButton>
        </form>

        <div className="space-y-6">
          <CartTable entries={cart.entries} compact />
          <div className="flex justify-end text-xl">
            <span className="font-light mr-4">Total</span>
            <span className="font-medium">{cart.totalPrice} lei</span>
          </div>
        </div>
      </div>
    </section>
  );
}

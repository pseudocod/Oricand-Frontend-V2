import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../hooks/useCart";
import useCheckout from "../hooks/useCheckout";
import FormInput from "../components/common/Input/FormInput";
import FormButton from "../components/common/Button/FormButton";
import CartTable from "../components/cart/CartTable";
import LoadingState from "../components/common/LoadingState/LoadingState";

export default function CheckoutPage() {
  const { cart, loading } = useCart();
  const { checkout, loading: placingOrder, error } = useCheckout();
  const navigate = useNavigate();

  const [deliveryAddr, setDeliveryAddr] = useState({
    streetLine: "",
    postalCode: "",
    city: "",
    county: "",
    country: "",
  });

  const [invoiceAddr, setInvoiceAddr] = useState({
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
    await checkout({
      cartId: cart.id,
      paymentType,
      deliveryAddr,
      invoiceAddr,
    });
    navigate("/account");
  };

  if (loading) return <LoadingState />;

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-light uppercase">Delivery Address</h2>
            <FormInput
              label="Street"
              id="d-street"
              name="streetLine"
              value={deliveryAddr.streetLine}
              onChange={handleChange(setDeliveryAddr)}
              required
            />
            <FormInput
              label="Postal Code"
              id="d-postal"
              name="postalCode"
              value={deliveryAddr.postalCode}
              onChange={handleChange(setDeliveryAddr)}
              required
            />
            <FormInput
              label="City"
              id="d-city"
              name="city"
              value={deliveryAddr.city}
              onChange={handleChange(setDeliveryAddr)}
              required
            />
            <FormInput
              label="County"
              id="d-county"
              name="county"
              value={deliveryAddr.county}
              onChange={handleChange(setDeliveryAddr)}
              required
            />
            <FormInput
              label="Country"
              id="d-country"
              name="country"
              value={deliveryAddr.country}
              onChange={handleChange(setDeliveryAddr)}
              required
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-light uppercase">Invoice Address</h2>
            <FormInput
              label="Street"
              id="i-street"
              name="streetLine"
              value={invoiceAddr.streetLine}
              onChange={handleChange(setInvoiceAddr)}
              required
            />
            <FormInput
              label="Postal Code"
              id="i-postal"
              name="postalCode"
              value={invoiceAddr.postalCode}
              onChange={handleChange(setInvoiceAddr)}
              required
            />
            <FormInput
              label="City"
              id="i-city"
              name="city"
              value={invoiceAddr.city}
              onChange={handleChange(setInvoiceAddr)}
              required
            />
            <FormInput
              label="County"
              id="i-county"
              name="county"
              value={invoiceAddr.county}
              onChange={handleChange(setInvoiceAddr)}
              required
            />
            <FormInput
              label="Country"
              id="i-country"
              name="country"
              value={invoiceAddr.country}
              onChange={handleChange(setInvoiceAddr)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="paymentType" className="text-base font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentType"
              name="paymentType"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xs bg-offwhite focus:outline-none focus:ring-2 focus:ring-richblack"
            >
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
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

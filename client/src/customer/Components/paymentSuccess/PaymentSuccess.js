import React from 'react';
import { useSelector } from 'react-redux';

const PaymentSuccess = ({ onClose }) => {
  const lastOrder = useSelector((state) => state.orders.orders[0]); // Assuming orders are sorted with the latest order first

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background p-8 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-muted-foreground">X</button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">THANK YOU</h1>
          <h2 className="text-3xl text-primary-foreground">YOUR ORDER IS CONFIRMED</h2>
          <p className="text-muted-foreground mt-2">We will be sending you an email confirmation to <span className="font-semibold">{lastOrder.email}</span> shortly</p>
        </div>
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 rounded-full p-4 shadow-lg">
            <img aria-hidden="true" alt="checkmark" src="https://openui.fly.dev/openui/24x24.svg?text=✔️" />
          </div>
        </div>
        <div className="border-t border-muted my-6"></div>
        <div className="text-center mb-6">
          <p className="text-muted-foreground">Order #<span className="font-bold">{lastOrder.orderNumber}</span> was placed on <span className="font-bold">{new Date(lastOrder.createdAt).toLocaleDateString()}</span> and is currently in progress</p>
          <p className="text-muted-foreground">Expected Delivery Date: <span className="font-bold">{new Date(lastOrder.expectedDelivery).toLocaleDateString()}</span></p>
          <a href="#" className="text-primary hover:underline mt-2 inline-block">Track Your Order</a>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-8">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-bold">ORDER DETAIL</h3>
            <p className="text-muted-foreground">#{lastOrder.orderNumber}</p>
            <h3 className="text-lg font-bold mt-4">DELIVERY ADDRESS</h3>
            <p className="text-muted-foreground">{lastOrder.shippingAddress.street}, {lastOrder.shippingAddress.city}<br/>{lastOrder.shippingAddress.state}, {lastOrder.shippingAddress.zipcode}</p>
            <h3 className="text-lg font-bold mt-4">BILLING ADDRESS</h3>
            <p className="text-muted-foreground">{lastOrder.billingAddress.street}, {lastOrder.billingAddress.city}<br/>{lastOrder.billingAddress.state}, {lastOrder.billingAddress.zipcode}</p>
            <h3 className="text-lg font-bold mt-4">CONTACT DETAILS</h3>
            <p className="text-muted-foreground">{lastOrder.contact.email}<br/>{lastOrder.contact.phone}</p>
          </div>
          <div className="flex-1 pl-4">
            <h3 className="text-lg font-bold">ORDER SUMMARY ({lastOrder.items.length})</h3>
            <p className="text-muted-foreground">Sub Total: <span className="font-bold">£{lastOrder.subTotal}</span></p>
            <p className="text-muted-foreground">Delivery: <span className="font-bold">£{lastOrder.deliveryFee}</span></p>
            <p className="text-lg font-bold mt-4">Total: <span className="font-bold">£{lastOrder.total}</span></p>
            <div className="mt-4 flex space-x-2">
              <button className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded flex-1">Pay with PayPal</button>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded flex-1">Download Invoice</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default PaymentSuccess

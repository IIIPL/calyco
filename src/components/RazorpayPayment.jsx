import React, { useEffect } from 'react';

const RazorpayPayment = ({ 
  amount, 
  currency = 'INR', 
  customerDetails, 
  onSuccess, 
  onError, 
  onClose 
}) => {
  useEffect(() => {
    // Load Razorpay script
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if script is already loaded
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const initializePayment = async () => {
      try {
        // Check if Razorpay key is configured
        const razorpayKey = import.meta.env.VITE_RAZORPAY_ID;
        console.log('Razorpay Key:', razorpayKey);
        
        if (!razorpayKey || razorpayKey === 'your_razorpay_key_id_here') {
          onError('Razorpay configuration missing. Please add your Razorpay Key ID to the .env file.');
          return;
        }

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          onError('Failed to load Razorpay SDK. Please check your internet connection.');
          return;
        }

        // Create a simple payment without order_id for testing
        console.log('Payment amount received:', amount);
        console.log('Amount in paise:', amount * 100);
        
        const options = {
          key: razorpayKey,
          amount: amount * 100, // Amount in paise (multiply by 100)
          currency: currency,
          name: 'Calyco Paints',
          description: `Paint Purchase - ₹${amount}`,
          // Remove order_id for direct payment
          handler: function (response) {
            console.log('Payment successful:', response);
            onSuccess(response);
          },
          prefill: {
            name: `${customerDetails.firstName} ${customerDetails.lastName}`,
            email: customerDetails.email,
            contact: customerDetails.phone,
          },
          notes: {
            address: customerDetails.address,
            city: customerDetails.city,
            postcode: customerDetails.postcode,
          },
          theme: {
            color: '#493657', // Your brand color
          },
          modal: {
            ondismiss: function() {
              console.log('Payment modal dismissed');
              onClose();
            }
          }
        };

        console.log('Initializing Razorpay with options:', options);
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          onError(`Payment failed: ${response.error.description || 'Unknown error'}`);
        });
        rzp.open();
      } catch (error) {
        console.error('Error initializing payment:', error);
        onError(`Payment initialization failed: ${error.message}`);
      }
    };

    initializePayment();
  }, [amount, currency, customerDetails, onSuccess, onError, onClose]);

  return null; // This component doesn't render anything
};

export default RazorpayPayment;

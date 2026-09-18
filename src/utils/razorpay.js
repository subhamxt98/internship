import axios from 'axios'

const API = 'http://localhost:5000/api/payment'

export const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

export const handlePayment = async ({ amount, user, onSuccess, onFailure }) => {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    alert('Razorpay SDK failed to load. Are you online?')
    return
  }

  try {
    // 1. Create order on backend
    const { data } = await axios.post(`${API}/create-order`, { amount })

    // 2. Open Razorpay checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // from .env
      amount: data.amount,
      currency: data.currency,
      name: "ANSHIÉ's GLAM",
      description: 'Premium Beauty Products',
      image: '/logo.png', // optional
      order_id: data.order_id,
      prefill: {
        name: user?.name || '',
        email: user?.email || '',
        contact: user?.phone || '',
      },
      theme: { color: '#3B82F6' },
      handler: async (response) => {
        // 3. Verify on backend
        try {
          const verify = await axios.post(`${API}/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })

          if (verify.data.success) {
            onSuccess?.(verify.data)
          } else {
            onFailure?.('Payment verification failed')
          }
        } catch (err) {
          onFailure?.(err.message)
        }
      },
      modal: {
        ondismiss: () => onFailure?.('Payment cancelled'),
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (err) {
    onFailure?.(err.message)
  }
}
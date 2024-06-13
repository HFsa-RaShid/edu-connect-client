import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const CheckoutForm = ({sessionId}) => {
    const [error, setError] = useState('');
    const [clientSecret,setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [tutorEmail, setTutorEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
     
  
    useEffect(() => {
        if (sessionId) {
            axiosSecure.get(`/sessions/${sessionId}`)
                .then(response => {
                    const { registrationFee, tutorEmail } = response.data;
                    setTutorEmail(tutorEmail);
                    
                    axiosSecure.post('/create-payment-intent', {
                        price: registrationFee
                    })
                    .then(res => {
                      
                        console.log(res.data.clientSecret);
                        
                       setClientSecret(res.data.clientSecret);
                    })
                   
                })
               
        }
    }, [axiosSecure, sessionId]);
   
    const handleSubmit = async(e) =>{
        e.preventDefault();

        if (!stripe || !elements) {
            return;
          }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }
        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if(confirmError){
            console.log('confirm error')
        }
        else{
            console.log('paymentIntent',paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id =', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                const currentDate = new Date().toISOString();

            // Save booked session info
            axiosSecure.post('/bookedSession', {
                studentEmail: user?.email,
                sessionId,
                tutorEmail,
                transactionId: paymentIntent.id,
                paymentStatus: paymentIntent.status,
                date: currentDate
            })
                .then(res => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Payment successful and session booked.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            navigate(`/sessionDetails/${sessionId}`);
                        }
                    });
                    
                })
                .catch(error => {
                    console.error('Error booking session:', error);
                    setError('Failed to book session');
                });
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
             <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn border my-6" type="submit" disabled={!stripe || !clientSecret }>
     
          Pay
        </button>


        <p className="text-red-700">
            {error}
        </p>
        {transactionId && <p className="text-green-700 mt-20">Your Transaction Id: {transactionId}</p>}

        </form>
    );
};

export default CheckoutForm;
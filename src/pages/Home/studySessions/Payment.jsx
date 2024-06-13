import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const {id} = useParams();
    return (
        <div className="min-h-screen">
            <h1 className="py-20">PAYMENT{id}</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm sessionId={id}>

                </CheckoutForm>

            </Elements>
        </div>
    );
};

export default Payment;
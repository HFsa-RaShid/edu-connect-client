import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const {id} = useParams();
    return (
        <div className="min-h-screen w-[70%] mx-auto ">
            <Helmet>
                <title>Payment | EduConnect</title>
            </Helmet>
            <h1 className="py-40 text-2xl text-center font-bold">PAYMENT</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm sessionId={id}>

                </CheckoutForm>

            </Elements>
        </div>
    );
};

export default Payment;
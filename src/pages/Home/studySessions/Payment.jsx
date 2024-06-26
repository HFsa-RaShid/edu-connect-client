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
            <p className="pt-24 w-[50%] mx-auto pb-24">
                <div className="divider divider-neutral text-xl md:text-3xl font-bold text-center">Payment Here!!</div>
            </p>
           
            <Elements stripe={stripePromise}>
                <CheckoutForm sessionId={id}>

                </CheckoutForm>

            </Elements>
        </div>
    );
};

export default Payment;
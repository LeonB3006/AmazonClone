const stripe = require('stripe')('sk_test_51J0IUkBsvZ5SKAgtKTb0njTGHZDLX6FrQwB8eMkKgJuyTUr9QqBpJjKsQ6Vr5B8JEYEcjPTh0ce4wPsLol9FaPnv003no7rtWN');

exports.handler = async (event) => {
    const {typeName, arguments} = event;

    if (typeName !== "Mutation") {
        throw new Error("Request is not a Mutation!");
    }

    if (!arguments?.amount) {
        throw new Error("Amount is required!");
    }

    // create Payment Intent

    const paymentIntent = await stripe.paymentIntents.create({
        amount: arguments.amount,
        currency: 'usd',

    });

    return {
        clientSecret: paymentIntent.client_secret,
    }

};

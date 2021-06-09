exports.handler = async event => {
  const body = JSON.parse(event.body);

  switch (event.type) {
    case 'payment_intent_succeeded':
      const paymentIntent = body.data.object;
      // Use this section to do stuff like update order to complete
      console.log('PaymentIntent was succesful');
      break;
    case 'payment_method.attached':
      const paymentMethod = body.data.object;
      console.log('PaymentMethod was attached to a User');
      break;
    default:
      console.log(`Unhandled event: ${body.type}`);
  }
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify({received: true}),
  };


  return response;
};

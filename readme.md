# Dibsy Component Examples

## Documentation

- [Build your Checkout](https://docs.dibsy.one/payments/build-your-checkout)
- [Dibsy Component Reference](https://docs.dibsy.one/dibsy-components/overview-)
- [Styling](https://docs.dibsy.one/dibsy-components/styling)

## Setting up locally.

The "server.js" file acts as your backend API, calling the Dibsy API when requested. The demo uses Express.js as the backend framework, and uses HTML, CSS and vanilla Javascript in the frontend. To run this demo locally:

1. Install Node.JS.
2. Clone the repo, and install dependencies using yarn or npm.
3. Add Dibsy API Secret Key and Dibsy API Public Key in the .env file.
4. Run the server using 'yarn start' or 'node server.js'.
5. Use "4242 4242 4242 4242" as test card number, any future value for expiry date, and any CVC.

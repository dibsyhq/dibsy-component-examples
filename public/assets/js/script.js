const DIBSY_PUBLIC_API = '<Your Dibsy API Public Key>';

const removeLoader = () => {
  document.querySelector("#mcForm").style.display = "block";
  document.querySelector("#checkout-loader-wrapper").style.display = "none";
};

const showErrorMessage = (message) => {
  document.querySelector("#error").style.display = "flex";
  document.querySelector("#error-content").innerText = message;
};
const payBtn = document.querySelector("#pay-button");

async function init() {
  // Initialize the Dibsy Object.
  const dibsy = await Dibsy(DIBSY_PUBLIC_API, {
    // When the user has inputted all legal values in the fields.
    canSubmit: (canSubmit) => {
      if (!canSubmit) {
        payBtn.setAttribute("disabled", "true");
      } else {
        payBtn.removeAttribute("disabled");
      }
    },

    // When all fields are loaded, remove the loader.
    onFieldReady: (field, fields) => {
      if (fields?.length === 3) {
        removeLoader();
      }
    },
  });

  // Create the four Card Holder Data Components using the dibsy.createComponent(type[, options]) function
  // and mount them in your checkout form using the component.mount(targetElement) function.

  const cardNumber = dibsy.createComponent("cardNumber");
  cardNumber.mount("#card-number");
  cardNumber.errorMessage("#card-number-error");

  const cardCode = dibsy.createComponent("cardCode");
  cardCode.mount("#card-code");
  cardCode.errorMessage("#card-code-error");

  const expiryDate = dibsy.createComponent("expiryDate");
  expiryDate.mount("#expiry-date");
  expiryDate.errorMessage("#expiry-date-error");

  // Request your backend to recieve the paymentToken
  fetch(`/init-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      // Listen to submit event.
      const form = document.querySelector("form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        payBtn.setAttribute("disabled", "true");
        payBtn.innerText = "Submitting...";
        document.querySelector("#error").style.display = "none";

        dibsy.submit({
          paymentToken: data?.paymentToken,
          state: (state) => {
            if (state === "complete") {
              payBtn.removeAttribute("disabled");
              payBtn.innerText = "Pay QAR 50.00";
            }
          },
          onClose: () => {
            showErrorMessage(
              "An error occured with your 3D Secure authentication. Please try again or use a different credit card"
            );
          },
          callback: (payment, error) => {
            if (error) {
              alert("Payment has failed, reason: " + error.message);
            } else {
              window.location.href = payment.redirectUrl;
            }
          },
          options: {
            issuerContainer: document.querySelector("#checkout-container"),
            disableCloseButton: true,
          },
        });
      });
    });
}

init();

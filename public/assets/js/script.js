// you will need a public key to create a dibsy instance
const pk = "pk_test_d70V5Wsqu263AdY4gXPIAWGMZqMRmy0BbNmi";
// your server endpoint
const server_endpoint = "http://localhost:4545";

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
  //INITIALIZE DIBSY WITH DIBSY PUBLIC KEY
  const dibsy = await Dibsy(pk, {
    type: "embed",
     
    canSubmit: (canSubmit) => {
      if (!canSubmit) {
        payBtn.setAttribute("disabled", "true");
      } else {
        payBtn.removeAttribute("disabled");
      }
    },
    
    onFieldReady: (field, fields) => {
      if (fields?.length === 4) {
        removeLoader();
      }
    },
  },
  );

  const cardNumber = dibsy.createComponent("cardNumber");
  cardNumber.mount("#card-number");
  cardNumber.errorMessage("#card-number-error");

  const cardHolder = dibsy.createComponent("cardHolder");
  cardHolder.mount("#card-holder");
  cardHolder.errorMessage("#card-holder-error");

  const cardCode = dibsy.createComponent("cardCode");
  cardCode.mount("#card-code");
  cardCode.errorMessage("#card-code-error");

  const expiryDate = dibsy.createComponent("expiryDate");
  expiryDate.mount("#expiry-date");
  expiryDate.errorMessage("#expiry-date-error");


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

      // step4 listen to submit event
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
              alert("Payment has failed, reason : " + error.message);
            } else {
              alert("Your payment has been successful.");
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

init()
async function init() {
  const DIBSY_PUBLIC_API = "pk_test_d70V5Wsqu263AdY4gXPIAWGMZqMRmy0BbNmi";

  const form = document.querySelector("form");
  const payBtn = document.querySelector("#payment-button");
  const errorMessage = document.querySelector(".error-message");

  const dibsy = await Dibsy(DIBSY_PUBLIC_API);

  const card = dibsy.createComponent("card", {
    showCardIcon: true,
    css: {},
  });

  card.mount("#card");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    payBtn.innerText = "Submitting...";

    const paymentToken = await fetch("/create-payment", {
      method: "POST",
    }).then((res) => res.text());

    dibsy.submit({
      paymentToken: paymentToken,
      callback: (error) => {
        errorMessage.textContent = error.message
        payBtn.innerText = "Submit";
        console.log(error);
      },
    });
  });
}

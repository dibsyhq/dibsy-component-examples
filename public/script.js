async function init() {
  const dibsy = await Dibsy("pk_live_eEubUrGyykXI3qZHWU3YIeBazoKgzF3ikzy3");

  const card = dibsy.createComponent("card",{
    showCardIcon:true,
    css:{
    }
  });

  card.mount("#card");
  //remove that
  const form = document.querySelector("form");
  const payBtn = document.querySelector("#payment-button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    //Retrieve the Payment Token from your Backend
    const paymentToken = await fetch("/create-payment", {
      method: "POST",
    }).then((res) => res.text());
    dibsy.submit({
      paymentToken: paymentToken,
      callback:(error)=>{
        console.log(error);
      }
    });
  });
}

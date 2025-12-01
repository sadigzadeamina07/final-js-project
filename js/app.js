let price= document.getElementById('price')
let totalprice=document.getElementById('totalprice')
let percent=document.getElementById('percent')
let t=document.getElementById('totalprice')
  const links = document.querySelectorAll(".tab-link");
    const cards = document.querySelectorAll(".card");

    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = link.getAttribute("href");

        // bütün kartları gizlət
        cards.forEach(card => card.classList.add("hidden"));

        // seçilmiş kartı göstər
        document.getElementById(target).classList.remove("hidden");
      });
    });
function updatePrice() {
    totalprice.innerHTML = `
        <p class="text-[45px] font-semibold mb-3">${price.value}₼</p>
    `;
}
updatePrice()
  price.addEventListener("input", updatePrice);

let price= document.getElementById('price')
let totalprice=document.getElementById('totalprice')
let percent=document.getElementById('percent')
let t=document.getElementById('totalprice')
function updatePrice() {
    totalprice.innerHTML = `
        <p class="text-[45px] font-semibold mb-3">${price.value}₼</p>
    `;
}
updatePrice()
  price.addEventListener("input", updatePrice);

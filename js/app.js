let price= document.getElementById('price')
let percent=document.getElementById('percent')
let time=document.getElementById('time')
let totalprice=document.getElementById('totalprice')
  const links = document.querySelectorAll(".tab-link");
  const tabs = document.querySelectorAll(".tab-body");
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

           const target = link.getAttribute("href").replace("#", "");
         tabs.forEach(tab => tab.classList.add("hidden"));
        document.getElementById(target).classList.remove("hidden");
      });
    });
function updatePrice() {
     const P = Number(price.value);           
    const n = Number(time.value);            
    const r = Number(percent.value)/12/100;  
    const total = P * (r * (1 + r)**n) / ((1 + r)**n - 1)
       totalprice.innerHTML = `
        <p class="text-[45px] font-semibold mb-1">${total.toFixed(2)}₼</p>
    `;
}
updatePrice()
price.addEventListener("input", updatePrice);
time.addEventListener("input", updatePrice);
percent.addEventListener("input", updatePrice);
function deposit(){
  
}


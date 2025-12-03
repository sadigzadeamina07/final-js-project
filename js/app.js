let price = document.getElementById('price')
let percent = document.getElementById('percent')
let time = document.getElementById('time')
let totalprice = document.getElementById('totalprice')
let depositprice = document.getElementById('depositCalculation')
let totalpriceofdeposit = document.getElementById('totalpriceofdeposit')
let monthlyincome = document.getElementById('monthlyincome')
let depositpercent = document.getElementById('depositpercent')
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
  const r = Number(percent.value) / 12 / 100;
  const total = P * (r * (1 + r) ** n) / ((1 + r) ** n - 1)
  totalprice.innerHTML = `
        <p class="text-[45px] font-semibold mb-1">${total.toFixed(2)}₼</p>
    `;
}
updatePrice()
price.addEventListener("input", updatePrice);
time.addEventListener("input", updatePrice);
percent.addEventListener("input", updatePrice);
const depositPercent = {
  3: 8,
  6: 8.5,
  12: 8.5,
  18: 9.0,
  24: 7.5,
  36: 7.5
};
let selectedmonth = 3
let depositMode = "month";
function deposit() {
  const amount = Number(depositprice.value)
  const percentofdeposit = depositPercent[selectedmonth]
  let totalpricedeposit = amount * ((percentofdeposit / 100) * (selectedmonth / 12));
  let monthlyincomepercent
  if (depositMode === "month") {
    monthlyincomepercent = amount * ((percentofdeposit / 100) * (1 / 12));

  }
  else {
    monthlyincomepercent = amount * (percentofdeposit / 100)
  }
  totalpriceofdeposit.innerHTML = `
        <p class="text-[45px] font-semibold mb-1">${totalpricedeposit.toFixed(2)}₼</p>
    `;
  monthlyincome.innerHTML = `
        <p class="text-sm font-semibold mb-1">${monthlyincomepercent.toFixed(2)}₼</p>
    `;
  depositpercent.innerHTML = `
        <p class="text-sm font-semibold mb-1">${percentofdeposit}%</p>
    `;
}

const monthButtons = document.querySelectorAll("#depositmonth")
monthButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedmonth = Number(btn.value)
    deposit()
  });
});
const everyMonthBtn = document.getElementById("every-month");
const everyYearBtn = document.getElementById("every-year");

everyMonthBtn.addEventListener("click", () => {
  depositMode = "month";
  deposit();
});

everyYearBtn.addEventListener("click", () => {
  depositMode = "year";
  deposit();
});
depositprice.addEventListener("input", deposit);
deposit()
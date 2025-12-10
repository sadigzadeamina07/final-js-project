let price = document.getElementById('price')
let percent = document.getElementById('percent')
let time = document.getElementById('time')
let totalprice = document.getElementById('totalprice')
let depositprice = document.getElementById('depositCalculation')
let totalpriceofdeposit = document.getElementById('totalpriceofdeposit')
let monthlyincome = document.getElementById('monthlyincome')
let depositpercent = document.getElementById('depositpercent')
const autoPrice = document.getElementById("autoPrice");
const autoPercent = document.getElementById("autoPercent");
const creditTimeofAuto = document.getElementById("creditTimeofAuto");
const totalpriceofauto = document.getElementById("totalpriceofauto");
const totalpriceof = document.getElementById("totalpriceof");
const totalpercent = document.getElementById("totalpercent");
const links = document.querySelectorAll(".tab-link");
const tabs = document.querySelectorAll(".tab-body")
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
//deposit
const monthButtons = document.querySelectorAll("#depositmonth");

const depositPercentAZN = {
  month:{
  3: 8,
  6: 8.5,
  12: 8.5,
  18: 9.0,
  24: 7.5,
  36: 7.5
  },
year:{
  3: 8,
  6: 9,
  12: 9.5,
  18: 10,
  24: 8.5,
  36: 8.5
}
};

const depositPercentUSD = {
  month:{
  3: 2,
  6: 2.5,
  12: 3,
  18:3
  },
  year:{
      3: 2.5,
  6: 3,
  12: 3.5,
  18:3.5
  }

};

let selectedmonth = 3;
let depositMode = "month";
let selectedCurrency = "AZN";
const monthModeBtn = document.getElementById("every-month");
const yearModeBtn = document.getElementById("every-year");
const aznBtn = document.getElementById("aznBtn");
const usdBtn = document.getElementById("usdBtn");

function deposit() {
    const amount = Number(depositprice.value);
    const symbol = selectedCurrency === "AZN" ? "₼" : "$";

    const percent =
        selectedCurrency === "AZN"
            ? depositPercentAZN[depositMode][selectedmonth]
            : depositPercentUSD[depositMode][selectedmonth];

    let totalProfit = amount * (percent / 100) * (selectedmonth / 12);
    let monthlyIncome =
        depositMode === "month"
            ? amount * (percent / 100) / 12
            : totalProfit / selectedmonth;

    totalpriceofdeposit.innerHTML = `<p>${totalProfit.toFixed(2)} ${symbol}</p>`;
    monthlyincome.innerHTML = `<p>${monthlyIncome.toFixed(2)} ${symbol}</p>`;
    depositpercent.innerHTML = `<p>${percent}%</p>`;
}

function updateMonthButtons() {
    monthButtons.forEach(btn => {
        const month = Number(btn.value);

        if (selectedCurrency === "USD" && (month === 24 || month === 36)) {
            btn.style.display = "none";
            btn.disabled = true;
        } else {
            btn.style.display = "inline-block";
            btn.disabled = false;
        }
    });
}

monthButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!btn.disabled) {
            selectedmonth = Number(btn.value);
            deposit();
        }
    });
});

monthModeBtn.addEventListener("click", () => {
    depositMode = "month";
    monthModeBtn.classList.add("active");
    yearModeBtn.classList.remove("active");
    deposit();
});

yearModeBtn.addEventListener("click", () => {
    depositMode = "year";
    yearModeBtn.classList.add("active");
    monthModeBtn.classList.remove("active");
    deposit();
});

aznBtn.addEventListener("click", () => {
    selectedCurrency = "AZN";
    updateMonthButtons();
    deposit();
});

usdBtn.addEventListener("click", () => {
    selectedCurrency = "USD";
    updateMonthButtons();
    deposit();
});

depositprice.addEventListener("input", deposit);

updateMonthButtons();
deposit();



//auto
  const autotypepercent={
Elektrik:13,
Hibrid:13.5,
Digər:14
}
let selectedType = "Elektrik"; 
function auto(){
    const percentInput = document.querySelector(`.percent-block[data-type="${selectedType}"] .autoPercent`);
    let percent = Number(percentInput.value);
 let monthly = Number(creditTimeofAuto.value)
let price  = Number(autoPrice.value)
/*
  let totalpaid=price-price*(percent/100)
  let topaymonthly=totalpaid*(autotypepercent[selectedType]/100/12)+totalpaid
let totalpriceauto = (topaymonthly) / monthly ;*/
  let totalpaid=price-price*(percent/100)
let n = monthly;
if(monthly/12>=3){
percent=autotypepercent[selectedType]+2
}
else if(monthly/12<=2 && monthly/12>1){
percent=autotypepercent[selectedType]+1
}
else{
percent=autotypepercent[selectedType]
}

  let r = percent / 100 / 12;
/*
let totalpriceauto = totalpaid * (r * Math.pow((1+r),n)) / (Math.pow((1+r),n)- 1);
   */
    // Aylıq ödəniş
    let monthlyPayment = totalpaid * (r * Math.pow((1+r), monthly)) / (Math.pow((1+r), monthly) - 1);

    // Komissiya
    let commissionAmount = totalpaid * 0.005;
    if(commissionAmount < 20) commissionAmount = 20;

    // Ümumi ödəniş
    let totalPayment = monthlyPayment * monthly + commissionAmount;

    // HTML yazılışı
    totalpriceofauto.innerHTML = `
        <p class="text-[45px] font-semibold mb-1">${monthlyPayment.toFixed(2)}₼</p>
    `;

    document.getElementById("komission").innerHTML = `
        <p class="text-sm font-semibold mb-1">${totalpaid.toFixed(2)} ₼</p>
    `;

    totalpercent.innerHTML = `
        <p class="text-sm font-semibold mb-1">${percent}%</p>
    `;

    document.getElementById("komissiya").innerHTML = `
        <p class="text-sm font-semibold mb-1">${commissionAmount.toFixed(2)} ₼</p>
    `;

    document.getElementById("totalpriceof").innerHTML = `
        <p class="text-sm font-semibold mb-1">${totalPayment.toFixed(2)} ₼</p>
    `  


    ;
}

const btnforcar = document.querySelectorAll('.btnforcar');
const percentBlocks = document.querySelectorAll('.percent-block');

// hər düyməyə klik
btnforcar.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedType = btn.dataset.type;
        percentBlocks.forEach(block => block.classList.add("hidden"));
        document.querySelector(`.percent-block[data-type="${selectedType}"]`).classList.remove("hidden");
        auto();
    });
});

// price və time dəyişəndə yenidən hesabla
autoPrice.addEventListener("input", auto);
creditTimeofAuto.addEventListener("input", auto);

// range input dəyişəndə auto() çağırmaq üçün:
document.querySelectorAll('.autoPercent').forEach(inp => {
    inp.addEventListener("input", auto);
});
auto()
//ipoteka


    const Mortgageprice = document.getElementById("Mortgageprice");
    const Mortgageyear = document.getElementById("Mortgageyear");
    const percentbtn = document.querySelectorAll(".percent");

    let yearPercent = 4;

    function update() {
        const mortageprice = Number(Mortgageprice.value);
        const n = Number(Mortgageyear.value) * 12;
        const r = yearPercent / 12 / 100;
        const pow = Math.pow(1 + r, n);
        const perMonth = mortageprice * (r * pow / (pow - 1));

        document.getElementById("Mortgageformonth").innerHTML =
            `<p class="text-sm font-semibold mb-1">${perMonth.toFixed(2)} ₼</p>`;
        document.getElementById("showpriceMortage").innerHTML =
            `<p class="text-sm font-semibold mb-1">${mortageprice.toFixed(2)} ₼</p>`;
        document.getElementById("PercentforYear").innerHTML =
            `<p class="text-sm font-semibold mb-1">${yearPercent.toFixed(2)} %</p>`;
    }

    percentbtn.forEach(btn => {
        btn.addEventListener("click", () => {
            yearPercent = parseInt(btn.dataset.percentM);
            update();
        });
    });

    Mortgageprice.addEventListener("input", update);
    Mortgageyear.addEventListener("input", update);

    update();


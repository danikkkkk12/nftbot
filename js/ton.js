const mainBalance = document.querySelector(".main-wrapper__balance");
const mainConnectWallet = document.querySelector(".main-connect-wallet");
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const modalForm = document.querySelector('.modal-form')
const sumPay = document.getElementById('sumPay')


const tonConnect = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: "https://danikkkkk12.github.io/nftbot/tonconnect-manifest.json",
  buttonRootId: "ton-connect",
});

async function getBalance(address) {
  const response = await fetch(
    `https://toncenter.com/api/v2/getAddressInformation?address=${address}`
  );
  const data = await response.json();

  if (data.ok && data.result && data.result.balance !== undefined) {
    return data.result.balance;
  } else {
    throw new Error("Ошибка получения баланса");
  }
}

async function updateBalance() {
  if (tonConnect.wallet && tonConnect.wallet.account) {
    try {
      const address = tonConnect.wallet.account.address;
      const balanceNano = await getBalance(address);
      const balanceTon = (balanceNano / 1e9).toFixed(2);
      mainBalance.innerHTML = `
        ${balanceTon} <img src="web/images/main/ton-icon.svg" alt="Token" class="main-balance__token">
      `;
    } catch (err) {
      console.error("Не удалось получить баланс:", err);
    }
  }
}



mainBalance.style = "cursor: pointer;"

mainBalance.addEventListener("click", () => {
  modal.classList.add('show')
});


closeBtn.addEventListener("click", () => {
  modal.style.display = 'none'
});


modalForm.addEventListener("submit", () => {  
  const amountTon = sumPay.value; 
  const wallet = "UQBbEo60L7OU5bSFFpo9t10whVNDqtyo2lsvRJzIBhI-0l75"; 

  const amountNanoTon = amountTon * 1e9;

  const url = `https://tonhub.com/transfer/${wallet}?amount=${amountNanoTon}`;
  window.open(url, "_blank");

  
});
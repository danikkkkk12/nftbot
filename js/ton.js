const mainBalance = document.querySelector(".main-balance");
const mainConnectWallet = document.querySelector(".main-connect-wallet");

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

const observer = new MutationObserver(() => {
  const button = document.querySelector('#ton-connect');
  if (button) {
    button.textContent = 'Connected✅'; 
    observer.disconnect(); 
  }
});

observer.observe(document.getElementById('ton-connect'), {
  childList: true,
  subtree: true
});

mainBalance.addEventListener("click", async () => {
  try {
    const res = await fetch("/create-invoice");
    const data = await res.json();
    window.open(data.invoice_url, "_blank");

    setTimeout(updateBalance, 5000);
  } catch (err) {
    console.error("Ошибка создания инвойса:", err);
  }
});

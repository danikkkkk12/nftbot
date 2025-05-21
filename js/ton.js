const mainBalance = document.querySelector(".main-balance");
const mainConnectWallet = document.querySelector(".main-connect-wallet");
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalHeaderBtn");
const modalForm = document.querySelector(".modal-form");
const sumPay = document.getElementById("sumPay");

const tonConnect = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: "https://danikkkkk12.github.io/nftbot/tonconnect-manifest.json",
  buttonRootId: "ton-connect",
});

async function getBalance(address) {
  try {
    const response = await fetch(
      `https://toncenter.com/api/v2/getAddressInformation?address=${address}`
    );
    const data = await response.json();

    if (data.ok && data.result && data.result.balance !== undefined) {
      return data.result.balance;
    } else {
      throw new Error("Ошибка получения баланса");
    }
  } catch (error) {
    console.error("Ошибка запроса баланса:", error);
    throw error;
  }
}

function shortenAddress(address) {
  return address.slice(0, 5) + '...' + address.slice(-4);
}


async function updateBalance() {
  if (tonConnect.wallet && tonConnect.wallet.account) {
    try {
      const address = tonConnect.wallet.account.address;
      const balanceNano = await getBalance(address);
      const balanceTon = (balanceNano / 1e9).toFixed(2);
      if (mainBalance) {
        mainBalance.innerHTML = `
          ${balanceTon} <img src="web/images/main/ton-icon.svg" alt="Token" class="main-balance__token">
        `;
      }
    } catch (err) {
      console.error("Не удалось получить баланс:", err);
    }
  }
}

tonConnect.onStatusChange(async (walletInfo) => {
  if (walletInfo && walletInfo.account && walletInfo.account.address) {
    const address = walletInfo.account.address;
    const shortAddr = shortenAddress(address);

    if (mainConnectWallet) {
      mainConnectWallet.innerText = shortAddr;
      mainConnectWallet.disabled = true; 
      mainConnectWallet.style.cursor = "default";
    }

    await updateBalance();
  }
});


function toggleActive() {
  if (modal) {
    modal.classList.toggle("activess");
  }
}

if (mainBalance) {
  mainBalance.addEventListener("click", toggleActive);
}

if (closeBtn) {
  closeBtn.addEventListener("click", toggleActive);
}

if (modalForm) {
  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!sumPay) {
      alert("Поле суммы не найдено");
      return;
    }

    const amountTon = parseFloat(sumPay.value);
    if (isNaN(amountTon) || amountTon <= 0) {
      alert("Введите корректную сумму");
      return;
    }

    const wallet = "UQBbEo60L7OU5bSFFpo9t10whVNDqtyo2lsvRJzIBhI-0l75";
    const amountNanoTon = amountTon * 1e9;
    const url = `https://tonhub.com/transfer/${wallet}?amount=${amountNanoTon}`;

    window.open(url, "_blank");
  });
}

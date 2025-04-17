// 로그인 처리
const ADMIN = { id: "admin", pw: "1234" };

// 로그인 시
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("username").value;
  const pw = document.getElementById("password").value;

  if (id === ADMIN.id && pw === ADMIN.pw) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html"; // 대시보드로 이동
  } else {
    alert("아이디 또는 비밀번호가 틀렸습니다.");
  }
});

// 로그아웃 시
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html"; // 로그인 페이지로 이동
}

// 알림 추가
function addNotice() {
  const title = document.getElementById("noticeTitle").value;
  const content = document.getElementById("noticeContent").value;
  const date = new Date().toLocaleString();

  const notices = JSON.parse(localStorage.getItem("notices") || "[]");
  notices.unshift({ title, content, date });
  localStorage.setItem("notices", JSON.stringify(notices));

  alert("알림이 추가되었습니다.");
  document.getElementById("noticeTitle").value = "";
  document.getElementById("noticeContent").value = "";
}

// 알림 목록 표시
function displayNotices() {
  const container = document.getElementById("noticeList");
  const notices = JSON.parse(localStorage.getItem("notices") || "[]");

  container.innerHTML = notices.map(n => `
    <div style="border-bottom: 1px solid #ccc; margin-bottom: 10px;">
      <h4>${n.title}</h4>
      <p>${n.content}</p>
      <small>${n.date}</small>
    </div>
  `).join('');
}

// 재고 추가
function addInventory() {
  const name = document.getElementById("itemName").value;
  const qty = parseInt(document.getElementById("itemQty").value);
  const price = parseInt(document.getElementById("itemPrice").value);
  const date = new Date().toLocaleString();

  if (!name || isNaN(qty) || isNaN(price)) {
    alert("모든 항목을 올바르게 입력해주세요.");
    return;
  }

  const items = JSON.parse(localStorage.getItem("inventory") || "[]");
  items.unshift({ name, qty, price, date });
  localStorage.setItem("inventory", JSON.stringify(items));

  alert("재고가 추가되었습니다.");
  document.getElementById("itemName").value = "";
  document.getElementById("itemQty").value = "";
  document.getElementById("itemPrice").value = "";
}

// 재고 목록 표시
function displayInventory() {
  const container = document.getElementById("inventoryList");
  const items = JSON.parse(localStorage.getItem("inventory") || "[]");

  container.innerHTML = items.map(i => `
    <div style="border-bottom: 1px solid #ccc; margin-bottom: 10px;">
      <strong>${i.name}</strong> - ${i.qty}개 × ${i.price}원<br>
      <small>${i.date}</small>
    </div>
  `).join('');
}

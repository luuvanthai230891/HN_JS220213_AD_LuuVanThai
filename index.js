// tạo mảng card rỗng để chứa danh sách thẻ
let cards = [];

/**
 * Hàm hiển thị thông báo yêu cầu nhập lại nội dung
 * @param {*} message : nội dung yêu cầu
 * AUTH: LVT (12/12/2023)
 */
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  // Ẩn thông báo sau 3 giây
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

/**
 *Hàm lưu danh sách thẻ
 * @returns
 */
function saveCard() {
  // tham chiếu đến các phần tử HTML
  const cardNumber = document.getElementById("cardNumber").value;
  const expiryDate = document.getElementById("expiryDate").value;
  const cvv = document.getElementById("cvv").value;
  const cardImage = document.getElementById("cardImage").value;
  // điều kiện trường nhập vào đối với thông tin card
  if (!cardNumber || !expiryDate || !cvv) {
    showNotification("Please fill in the information again ");
    return;
  }
  // khởi tạo object chứa thông tin card
  const card = {
    cardImage: cardImage,
    cardNumber: cardNumber,
    expiryDate: expiryDate,
    cvv: cvv,
  };
  // thêm card vào mảng
  cards.push(card);
  displayCardList();
  //   clearForm();
}

function displayCardList() {
  // tham chiếu đến phần tử có id cardList
  const cardList = document.getElementById("cardList");
  //   xoá nội dung hiện tại để cập nhật thông tin mới
  cardList.innerHTML = "";
  // duyệt qua mảng cards
  cards.forEach((card, index) => {
    // mỗi lần lặp sẽ thêm 1 hàng mới trong bảng và tạo các ô để hiển thị info thẻ
    const row = cardList.insertRow();
    const cellImg = row.insertCell(0);
    const cellNumber = row.insertCell(1);
    const cellExpiryDate = row.insertCell(2);
    const cellCvv = row.insertCell(3);
    const cellActions = row.insertCell(4);

    // ẩn 6 chữ số của số thẻ tính từ số thứ 7 và CVV
    const maskedCardNumber =
      card.cardNumber.substring(card.cardNumber.length - 7) +
      "*******" +
      (card.cardNumber.length - 9);
    const maskedCvv = "***";
    // hiển thị thông tin các thẻ đã được che lên bảng HTML
    cellNumber.innerHTML = maskedCardNumber;
    cellExpiryDate.innerHTML = card.expiryDate;
    cellCvv.innerHTML = maskedCvv;
    cellActions.innerHTML = `
      <button id="viewCardButton" onclick="viewCard(${index})">View</button>
      <button onclick="editCard(${index})">Edit</button>
      <button onclick="deleteCard(${index})">Delete</button>
    `;
  });
}

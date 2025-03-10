// 讀取參數
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// 讀取API並顯示資料
async function fetchAndDisplayData() {
  // 取得參數
  const city = getQueryParam("city"); // JSON 文件名
  const q = getQueryParam("q");   // 讀取的api資料位置

  if (!filename || !dataKey) {
    document.getElementById("output").textContent = "缺少参数";
    return;
  }

  // API 網址
  const apiUrl = `https://miku21meow.github.io/cctv/school/${city}.json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("API 讀取失敗");

    const data = await response.json();

    // 搜尋 JSON 資料
    const item = data.Sheet1[q]; // 读取 data.<dataKey>

    if (!item || typeof item !== "object") {
      document.getElementById("output").textContent = "未找到有效資料";
      return;
    }

    // 生成 HTML 内容
    let htmlContent = `
      <p><strong>學校名稱：</strong>${item.name || "無資料"}</p>
      <p><strong>創校日：</strong>${item.day || "無資料"}</p>
      <p><strong>電話：</strong>${item.tel || "無資料"}</p>
      <p><strong>地址：</strong>${item.address || "無資料"}</p>
      <p><strong>網址：</strong><a href="${item.url || "#"}" target="_blank">${item.url ? "學校網站" : "無資料"}</a></p>
    `;

    document.getElementById("school").innerHTML = htmlContent;
  } catch (error) {
    document.getElementById("school").textContent = `錯誤: ${error.message}`;
  }
}

// 讀取時調用
window.onload = fetchAndDisplayData;

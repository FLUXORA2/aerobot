(function () {

  const AEROBOT_URL =
    "https://fluxora2.github.io/aerobot/";

  const button = document.createElement("button");

  button.innerHTML = "💬";

  button.setAttribute(
    "aria-label",
    "Abrir AeroBot"
  );

  button.style.cssText = `
    position:fixed;
    right:20px;
    bottom:20px;
    width:60px;
    height:60px;
    border:none;
    border-radius:50%;
    background:#2563eb;
    color:white;
    font-size:26px;
    cursor:pointer;
    z-index:999999;
    box-shadow:0 8px 25px rgba(0,0,0,.25);
  `;

  document.body.appendChild(button);


  const windowBox = document.createElement("div");

  windowBox.style.cssText = `
    display:none;
    position:fixed;
    right:20px;
    bottom:90px;
    width:380px;
    height:650px;
    max-width:calc(100vw - 40px);
    max-height:calc(100vh - 110px);
    background:white;
    border-radius:18px;
    overflow:hidden;
    z-index:999998;
    box-shadow:0 15px 50px rgba(0,0,0,.3);
  `;


  const iframe = document.createElement("iframe");

  iframe.src = AEROBOT_URL;

  iframe.style.cssText = `
    width:100%;
    height:100%;
    border:none;
  `;

  windowBox.appendChild(iframe);

  document.body.appendChild(windowBox);


  button.addEventListener("click", function () {

    if (windowBox.style.display === "none") {

      windowBox.style.display = "block";
      button.innerHTML = "✕";

    } else {

      windowBox.style.display = "none";
      button.innerHTML = "💬";

    }

  });

})();

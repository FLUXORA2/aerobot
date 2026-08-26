(function () {

  const AEROBOT_URL =
    "https://fluxora2.github.io/aerobot/index.html";


  /* =========================
     BOTÓN DEL WIDGET
  ========================= */

  const button = document.createElement("button");

  button.setAttribute(
    "aria-label",
    "Abrir AeroBot"
  );

  button.style.cssText = `
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background: #2563eb;
    color: white;
    font-size: 26px;
    cursor: pointer;
    z-index: 999999;
    box-shadow: 0 8px 25px rgba(0,0,0,.25);
  `;


  /* ICONO */

  const icon = document.createElement("span");

  icon.textContent = "💬";

  button.appendChild(icon);


  /* =========================
     NOTIFICACIÓN "1"
  ========================= */

  const notification = document.createElement("span");

  notification.textContent = "1";

  notification.style.cssText = `
    position: absolute;
    top: -3px;
    right: -3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #ef4444;
    color: white;
    font-size: 13px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    box-sizing: border-box;
  `;

  button.appendChild(notification);


  document.body.appendChild(button);


  /* =========================
     VENTANA DEL CHATBOT
  ========================= */

  const windowBox = document.createElement("div");

  windowBox.style.cssText = `
    display: none;
    position: fixed;
    right: 20px;
    bottom: 90px;
    width: 380px;
    height: 650px;
    max-width: calc(100vw - 40px);
    max-height: calc(100vh - 110px);
    background: white;
    border-radius: 18px;
    overflow: hidden;
    z-index: 999998;
    box-shadow: 0 15px 50px rgba(0,0,0,.3);
  `;


  /* =========================
     IFRAME
  ========================= */

  const iframe = document.createElement("iframe");

  iframe.src = AEROBOT_URL;

  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
  `;


  windowBox.appendChild(iframe);

  document.body.appendChild(windowBox);


  /* =========================
     ABRIR / CERRAR
  ========================= */

  button.addEventListener("click", function () {

    if (windowBox.style.display === "none") {

      windowBox.style.display = "block";

      icon.textContent = "✕";

      notification.style.display = "none";

    } else {

      windowBox.style.display = "none";

      icon.textContent = "💬";

    }

  });

})();

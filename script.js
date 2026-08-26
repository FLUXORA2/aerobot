/* =====================================================
   AEROBOT
   Captación y cualificación de leads de aerotermia
===================================================== */


/* =====================================================
   CONFIGURACIÓN
===================================================== */

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwwMtlPDA1Qol1K2NaTlIapXNEFwL81bgdZ90LuHwuB6egsQuo4pdJ1rGrtWncujcK6/exec";


/* =====================================================
   DATOS DEL LEAD
===================================================== */

const lead = {
  objetivo: "",
  ubicacion: "",
  vivienda: "",
  metros: "",
  sistema: "",
  plazo: "",
  nombre: "",
  telefono: ""
};


/* =====================================================
   ELEMENTOS
===================================================== */

const chat =
  document.getElementById("chat");

const progress =
  document.getElementById("progress");

let step = 0;


/* =====================================================
   SCROLL
===================================================== */

function scrollChat() {

  chat.scrollTop =
    chat.scrollHeight;

}


/* =====================================================
   MENSAJE DEL BOT
===================================================== */

function addBotMessage(text) {

  const message =
    document.createElement("div");

  message.className =
    "message bot";

  message.textContent =
    text;

  chat.appendChild(message);

  scrollChat();

}


/* =====================================================
   MENSAJE DEL USUARIO
===================================================== */

function addUserMessage(text) {

  const message =
    document.createElement("div");

  message.className =
    "message user";

  message.textContent =
    text;

  chat.appendChild(message);

  scrollChat();

}


/* =====================================================
   PROGRESO
===================================================== */

function updateProgress() {

  const percentage =
    Math.min(
      (step / 7) * 100,
      100
    );

  progress.style.width =
    percentage + "%";

}


/* =====================================================
   BOTONES DE OPCIONES
===================================================== */

function addOptions(options, callback) {

  const container =
    document.createElement("div");

  container.className =
    "options";


  options.forEach(option => {

    const button =
      document.createElement("button");

    button.className =
      "option";

    button.textContent =
      option.label;


    button.addEventListener(
      "click",
      function () {

        container.remove();

        addUserMessage(
          option.label
        );

        callback(
          option.value
        );

      }
    );


    container.appendChild(
      button
    );

  });


  chat.appendChild(
    container
  );

  scrollChat();

}


/* =====================================================
   INPUT DE TEXTO
===================================================== */

function addInput(
  placeholder,
  callback,
  type = "text"
) {

  const wrapper =
    document.createElement("div");

  wrapper.className =
    "input-area";


  const input =
    document.createElement("input");

  input.type =
    type;

  input.placeholder =
    placeholder;


  const button =
    document.createElement("button");

  button.className =
    "send-button";

  button.textContent =
    "Continuar";


  function submit() {

    const value =
      input.value.trim();


    if (!value) {

      input.focus();

      return;

    }


    wrapper.remove();

    addUserMessage(
      value
    );

    callback(value);

  }


  button.addEventListener(
    "click",
    submit
  );


  input.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {

        submit();

      }

    }
  );


  wrapper.appendChild(
    input
  );

  wrapper.appendChild(
    button
  );


  chat.appendChild(
    wrapper
  );


  input.focus();

  scrollChat();

}


/* =====================================================
   SIGUIENTE PASO
===================================================== */

function nextStep() {

  step++;

  updateProgress();


  switch (step) {


    /* =================================================
       OBJETIVO
    ================================================= */

    case 1:

      addBotMessage(
        "Para empezar, ¿qué estás buscando?"
      );


      addOptions([

        {
          label:
            "🏠 Instalar aerotermia desde cero",

          value:
            "Instalar desde cero"
        },

        {
          label:
            "♨️ Sustituir mi sistema actual",

          value:
            "Sustituir sistema actual"
        },

        {
          label:
            "💡 Quiero informarme primero",

          value:
            "Informarme"
        }

      ], function (value) {

        lead.objetivo =
          value;

        nextStep();

      });

      break;


    /* =================================================
       UBICACIÓN
    ================================================= */

    case 2:

      addBotMessage(
        "Perfecto. ¿En qué localidad se encuentra la vivienda?"
      );


      addInput(
        "Ej. Pozuelo de Alarcón",
        function (value) {

          lead.ubicacion =
            value;

          nextStep();

        }
      );

      break;


    /* =================================================
       VIVIENDA
    ================================================= */

    case 3:

      addBotMessage(
        "¿Qué tipo de vivienda es?"
      );


      addOptions([

        {
          label:
            "🏡 Chalet",

          value:
            "Chalet"
        },

        {
          label:
            "🏘️ Adosado",

          value:
            "Adosado"
        },

        {
          label:
            "🏢 Piso",

          value:
            "Piso"
        },

        {
          label:
            "🏠 Otro tipo",

          value:
            "Otro"
        }

      ], function (value) {

        lead.vivienda =
          value;

        nextStep();

      });

      break;


    /* =================================================
       SUPERFICIE
    ================================================= */

    case 4:

      addBotMessage(
        "Aproximadamente, ¿cuántos m² tiene la vivienda?"
      );


      addOptions([

        {
          label:
            "Menos de 80 m²",

          value:
            "<80 m²"
        },

        {
          label:
            "80–120 m²",

          value:
            "80–120 m²"
        },

        {
          label:
            "120–180 m²",

          value:
            "120–180 m²"
        },

        {
          label:
            "180–250 m²",

          value:
            "180–250 m²"
        },

        {
          label:
            "Más de 250 m²",

          value:
            ">250 m²"
        }

      ], function (value) {

        lead.metros =
          value;

        nextStep();

      });

      break;


    /* =================================================
       SISTEMA ACTUAL
    ================================================= */

    case 5:

      addBotMessage(
        "¿Qué sistema de calefacción utilizas actualmente?"
      );


      addOptions([

        {
          label:
            "🔥 Gas",

          value:
            "Gas"
        },

        {
          label:
            "🛢️ Gasóleo",

          value:
            "Gasóleo"
        },

        {
          label:
            "⚡ Eléctrica",

          value:
            "Eléctrica"
        },

        {
          label:
            "❌ No tengo calefacción",

          value:
            "Sin calefacción"
        },

        {
          label:
            "Otro",

          value:
            "Otro"
        }

      ], function (value) {

        lead.sistema =
          value;

        nextStep();

      });

      break;


    /* =================================================
       PLAZO
    ================================================= */

    case 6:

      addBotMessage(
        "¿Cuándo te gustaría realizar la instalación?"
      );


      addOptions([

        {
          label:
            "🚀 Lo antes posible",

          value:
            "Lo antes posible"
        },

        {
          label:
            "📅 En 1–3 meses",

          value:
            "1–3 meses"
        },

        {
          label:
            "📆 En 3–6 meses",

          value:
            "3–6 meses"
        },

        {
          label:
            "🔎 Solo estoy informándome",

          value:
            "Informándome"
        }

      ], function (value) {

        lead.plazo =
          value;

        nextStep();

      });

      break;


    /* =================================================
       CONTACTO
    ================================================= */

    case 7:

      addBotMessage(
        "Ya casi está. ¿Cómo te llamas?"
      );


      addInput(
        "Tu nombre",
        function (value) {

          lead.nombre =
            value;

          askPhone();

        }
      );

      break;

  }

}


/* =====================================================
   TELÉFONO
===================================================== */

function askPhone() {

  addBotMessage(
    `Gracias, ${lead.nombre}. ¿A qué teléfono puede contactarte un especialista?`
  );


  addInput(
    "Ej. 612 345 678",
    function (value) {

      lead.telefono =
        value;

      finish();

    },
    "tel"
  );

}


/* =====================================================
   SCORE INTERNO
===================================================== */

function calculateScore() {

  let score = 0;


  if (
    lead.objetivo === "Instalar desde cero" ||
    lead.objetivo === "Sustituir sistema actual"
  ) {

    score += 3;

  }


  if (
    lead.metros === "120–180 m²" ||
    lead.metros === "180–250 m²" ||
    lead.metros === ">250 m²"
  ) {

    score += 2;

  }


  if (
    lead.plazo === "Lo antes posible" ||
    lead.plazo === "1–3 meses"
  ) {

    score += 3;

  }


  if (
    lead.sistema === "Gas" ||
    lead.sistema === "Gasóleo"
  ) {

    score += 1;

  }


  let prioridad =
    "🔵 Lead informativo";


  if (score >= 7) {

    label: "🔥 Cliente potencial"

  } else if (score >= 4) {

    label: "🟡 Cliente interesado"
  }


  return {
    value: score,
    label: prioridad
  };

}


/* =====================================================
   ENVIAR A GOOGLE SHEETS
===================================================== */

function sendLead(score) {

  if (
    !WEBHOOK_URL ||
    WEBHOOK_URL.includes("TU_WEBHOOK_URL")
  ) {

    console.warn(
      "No has configurado WEBHOOK_URL."
    );

    return;

  }


  fetch(
    WEBHOOK_URL,
    {

      method:
        "POST",

      mode:
        "no-cors",

      headers: {

        "Content-Type":
          "text/plain;charset=utf-8"

      },

      body:
        JSON.stringify({

          nombre:
            lead.nombre,

          telefono:
            lead.telefono,

          ubicacion:
            lead.ubicacion,

          vivienda:
            lead.vivienda,

          metros:
            lead.metros,

          sistema:
            lead.sistema,

          plazo:
            lead.plazo,

          score:
            score.value,

          prioridad:
            score.label

        })

    }
  )
  .then(function () {

    console.log(
      "Lead enviado correctamente."
    );

  })
  .catch(function (error) {

    console.error(
      "Error enviando lead:",
      error
    );

  });

}


/* =====================================================
   RESULTADO FINAL
===================================================== */

function finish() {

  step = 7;

  updateProgress();


  const score =
    calculateScore();


  sendLead(score);


  addBotMessage(
    `¡Perfecto, ${lead.nombre}! Hemos recibido tu solicitud.`
  );


  const result =
    document.createElement("div");

  result.className =
    "result";


  result.innerHTML = `

    <div class="result-icon">
      ✅
    </div>

    <h2>
      Solicitud recibida
    </h2>

    <p>
      Con los datos que nos has dado,
      podemos estudiar si una instalación
      de aerotermia puede encajar en tu vivienda.

      Un especialista revisará tu solicitud
      y contactará contigo.
    </p>


    <div class="lead-summary">

      <div class="summary-row">

        <span class="summary-label">
          📍 Ubicación
        </span>

        <span class="summary-value">
          ${lead.ubicacion}
        </span>

      </div>


      <div class="summary-row">

        <span class="summary-label">
          🏠 Vivienda
        </span>

        <span class="summary-value">
          ${lead.vivienda}
        </span>

      </div>


      <div class="summary-row">

        <span class="summary-label">
          📐 Superficie
        </span>

        <span class="summary-value">
          ${lead.metros}
        </span>

      </div>


      <div class="summary-row">

        <span class="summary-label">
          🔥 Sistema actual
        </span>

        <span class="summary-value">
          ${lead.sistema}
        </span>

      </div>


      <div class="summary-row">

        <span class="summary-label">
          📅 Plazo
        </span>

        <span class="summary-value">
          ${lead.plazo}
        </span>

      </div>

    </div>

  `;


  chat.appendChild(
    result
  );


  scrollChat();


  console.log(
    "NUEVO LEAD:",
    {
      ...lead,
      score:
        score.value,

      prioridad:
        score.label
    }
  );

}


/* =====================================================
   INICIO
===================================================== */

addBotMessage(
  "Hola 👋"
);


const welcome =
  document.createElement("div");


welcome.className =
  "welcome";


welcome.innerHTML = `

  <div class="welcome-title">

    ¿Quieres saber si la aerotermia
    encaja en tu vivienda?

  </div>


  <div class="welcome-text">

    Responde unas preguntas rápidas
    y podremos valorar tu caso
    y solicitar un presupuesto
    sin compromiso.

  </div>

`;


chat.appendChild(
  welcome
);


addOptions([

  {

    label:
      "Quiero solicitar presupuesto →",

    value:
      "presupuesto"

  }

], function () {

  nextStep();

});

import "./style.css";

const section = document.querySelector(".member-list");
const input = document.querySelector("form > input");
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const entries = formData.entries();
  const obj = Object.fromEntries(entries);
  console.log(obj);
  if (input.value) {
    try {
      const json = JSON.stringify(obj);
      const response = await fetch(
        "https://wildcodeschool-db997.firebaseio.com/argonautes.json",
        {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const body = await response.json();
      console.log(body);
      input.value = "";
      fetchArgonaute();
    } catch (e) {
      console.error("e:", e);
    }
  } else {
    alert("empty field");
  }
});

const createArgonaute = (argonautes) => {
  const argonautesDOM = argonautes.map((argonaute) => {
    const argonauteDOM = document.createElement("div");
    argonauteDOM.classList.add("member-item");
    argonauteDOM.innerHTML = ` ${argonaute.name} `;

    return argonauteDOM;
  });

  section.innerHTML = "";
  section.append(...argonautesDOM);
};

const fetchArgonaute = async () => {
  try {
    const response = await fetch(
      "https://wildcodeschool-db997.firebaseio.com/argonautes.json"
    );
    const argonautes = await response.json();
    if (argonautes) {
      const array = Object.values(argonautes);
      createArgonaute(array);
    }
  } catch (e) {
    console.log("e: ", e);
  }
};

fetchArgonaute();

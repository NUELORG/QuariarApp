import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDiVCVKuaI6SfwmMWcrKCCYAmTT_WYvepA",
  authDomain: "tracking-app-8bb20.firebaseapp.com",
  projectId: "tracking-app-8bb20",
  appId: "1:774297816977:web:9b630edb524073568d9430",
};

const createForm = document.getElementById("createFormBox");

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    createForm["createStatusBox"].value == "" ||
    createForm["countryBox"].value == "" ||
    createForm["cityBox"].value == "" ||
    createForm["transportationBox"].value == ""
  ) {
    alert(`Empty Fields Not Allowed`);
  } else {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    var getDate = new Date();
    const status = createForm["createStatusBox"].value;
    const generateId = Math.floor(100000000 + Math.random() * 9000000000);
    const generateIdString = generateId.toString();
    const country = createForm["countryBox"].value;
    const city = createForm["cityBox"].value;
    const transportation = createForm["transportationBox"].value;
    await setDoc(doc(db, "TrackingId", generateIdString), {
      TrackStatus: arrayUnion({
        date: getDate.toString(),
        country: country,
        city: city,
        transport: transportation,
        status: status,
      }),
    });
    alert(`Tracking ID ${generateIdString} Created`);
    createForm.reset();
  }
});

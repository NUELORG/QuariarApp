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

const updateForm = document.getElementById("updateFormBox");
updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    updateForm["updateStatusBox"].value == "" ||
    updateForm["trackingIdBox"].value == "" ||
    updateForm["countryBox"].value == "" ||
    updateForm["cityBox"].value == ""
  ) {
    alert(`Empty Fields Not Allowed`);
  } else {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    var getDate = new Date();
    const trackingId = updateForm["trackingIdBox"].value;
    const status = updateForm["updateStatusBox"].value;
    const country = updateForm["countryBox"].value;
    const city = updateForm["cityBox"].value;
    const docRef = doc(db, "TrackingId", trackingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() == false) {
      alert("Tracking Number Does Not Exist");
    } else {
      console.log(trackingId);
      await updateDoc(doc(db, "TrackingId", trackingId), {
        TrackStatus: arrayUnion({
          date: getDate.toString(),
          country: country,
          city: city,
          status: status,
        }),
      });
      alert(`Tracking ID ${trackingId} Updated`);
      updateForm.reset();
    }
  }
});

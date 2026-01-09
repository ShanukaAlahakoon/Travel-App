import toast from "react-hot-toast";

const getMetaKey = () => {
  const userString = localStorage.getItem("user");
  const email = userString ? JSON.parse(userString).email : "guest";
  return `trip_meta_${email}`;
};

// යූසර්ගේ ඊමේල් එක අනුව සේව් කරන Key එක සාදා ගැනීම
const getTripKey = () => {
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);
      return `trip_plan_${user.email}`;
    } catch (e) {
      return "trip_plan";
    }
  }
  return "trip_plan";
};

// දැනට ප්ලෑන් එකේ තියෙන ප්ලේස් ලිස්ට් එක ලබා ගැනීම
export function getTripPlan() {
  const key = getTripKey();
  const tripString = localStorage.getItem(key);
  return tripString ? JSON.parse(tripString) : [];
}

// ප්ලෑන් එකට අලුත් ප්ලේස් එකක් ඇතුළත් කිරීම
export function addToTripPlan(place) {
  const plan = getTripPlan();
  const key = getTripKey();

  // දැනටමත් මේ ප්ලේස් එක ප්ලෑන් එකේ තියෙනවද බලනවා
  const isExist = plan.find((item) => item._id === place._id);

  if (!isExist) {
    plan.push({
      _id: place._id,
      name: place.name,
      location: place.location,
      image: place.image || place.images[0],
      category: place.category,
    });

    toast.success(`${place.name} added to your Trip Plan!`);
  } else {
    toast.error(`${place.name} is already in your plan.`);
  }

  localStorage.setItem(key, JSON.stringify(plan));
}

// ප්ලෑන් එකෙන් ප්ලේස් එකක් ඉවත් කිරීම
export function removeFromTripPlan(placeId) {
  const plan = getTripPlan();
  const key = getTripKey();

  const updatedPlan = plan.filter((item) => item._id !== placeId);
  localStorage.setItem(key, JSON.stringify(updatedPlan));
  toast.success("Place removed from plan");
}

// මුළු ප්ලෑන් එකම හිස් කිරීම
export function clearTripPlan() {
  const key = getTripKey();
  localStorage.removeItem(key);
}

export function saveTripMetadata(metadata) {
  const key = getMetaKey();
  localStorage.setItem(key, JSON.stringify(metadata));
}

// 2. Local Storage එකෙන් Metadata ලබා ගැනීම
export function getTripMetadata() {
  const key = getMetaKey();
  const metaString = localStorage.getItem(key);
  return metaString
    ? JSON.parse(metaString)
    : { days: 1, vehicle: "Car", peopleCount: 1, startDate: "" };
}

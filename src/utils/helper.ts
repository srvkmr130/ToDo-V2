import { IDecodedObject } from "../type";
import jwt_decode from "jwt-decode";

export function FormatDateToday() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

export function clearLocalStorage() {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("currentTab");
}

export const getDecodedToken = () => {
  var token = localStorage.getItem("token") as string;
  var decoded: IDecodedObject = jwt_decode(token as string);
  return decoded;
};
export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const bgColors = [
  "#6B89E6",
  "#64B3EB",
  "#7676af",
  "#252546",
  "#040450",
  "#676770",
  "#c2c2c7",
  "#295668",
  "#175046",
  "#0606af",
  "#86e7da",
  "#0b6c60",
];

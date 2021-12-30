import React from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { removeUserActionCreator } from "../features/auth";
import { updateTabActionCreator } from "../features/tab";
import { IState } from "../type";
import brandLogo from "../resources/images/brand-logo.png";
import { Tab } from "../enums/enums";
import { clearLocalStorage } from "../utils/helper";

const clientId =
  "375797887434-ib39n7sm15rc8h3mqkri7ne0ndm8abv0.apps.googleusercontent.com";
export default function Header() {
  const auth = useSelector((state: IState) => state.auth);
  const dispatch = useDispatch();
  const onSignoutSuccess = () => {
    clearLocalStorage();
    dispatch(updateTabActionCreator(Tab.DASHBOARD));
    dispatch(
      removeUserActionCreator({
        data: {
          email: "",
          email_verified: false,
          family_name: "",
          given_name: "",
          name: "",
          picture: "",
          sub: "",
        },
        isLoggedIn: false,
      })
    );
  };

  return (
    <div className="fixed top-0 z-10 flex w-full h-12 justify-between bg-gray-200">
      <div>
        <img
          className="w-48 hidden lg:inline "
          alt="brandLogoImage"
          src={brandLogo}
        />
      </div>
      <div className="flex rounded-2xl h-5/6 m-auto">
        <button className="flex items-center justify-center px-4 border-r bg-gray-100">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
        </button>
        <input
          type="text"
          className="px-4 py-2 bg-gray-100"
          placeholder="Search..."
        />
      </div>
      <div>
        <div className="flex">
          <div>
            <img
              className="w-10 absolute top-1 rounded-full"
              alt="userProfile"
              src={auth.data?.picture}
            />
          </div>
          <div className="text-blue-500 m-auto px-14 text-2xl">
            <span className="hidden lg:inline">{`${auth.data?.given_name} ${auth.data?.family_name}`}</span>
            <div></div>
          </div>
          <div className="hidden sm:inline">
            <GoogleLogout
              clientId={clientId}
              buttonText="Log Out"
              className="cursor-pointer"
              onLogoutSuccess={onSignoutSuccess}
            >
              <span className="text-blue-800 cursor-pointer "> Logout </span>
            </GoogleLogout>
          </div>
        </div>
      </div>
    </div>
  );
}

import { AUTH, LOGOUT, REVALIDATE, UPDATE_USER } from "../constants/actionTypes";

const auth = (state = { authData: null, reAuthData: null }, action) => {
  const profiles = JSON.parse(localStorage.getItem("ToDo-App-profiles"));
  const profile = JSON.parse(localStorage.getItem("ToDo-App-profile"));
  switch (action.type) {
    case AUTH:
      const limitProfile = {
        result: {
          email: action?.data?.result?.email,
          name: action?.data?.result?.name,
          _id: action?.data?.result?._id,
        },
        token: action?.data?.token,
      };
      localStorage.setItem("ToDo-App-profile", JSON.stringify(limitProfile));

      if (profiles) {
        const len = Object.keys(profiles).length;
        for (let key in profiles) {
          if (limitProfile?.result?.email === profiles[key]?.result?.email) {
            profiles[key] = limitProfile;
            localStorage.setItem("ToDo-App-profiles", JSON.stringify(profiles));
            return { ...state, authData: action?.data };
          }
        }
        const updatedProfiles = { ...profiles, [len]: limitProfile };
        localStorage.setItem("ToDo-App-profiles", JSON.stringify(updatedProfiles));
      } else {
        const newProfile = { 0: limitProfile };
        localStorage.setItem("ToDo-App-profiles", JSON.stringify(newProfile));
      }
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.removeItem("ToDo-App-profile");

      if (profiles && action?.data?.result?.email) {
        for (let key in profiles) {
          if (action?.data?.result?.email === profiles[key]?.result?.email) {
            delete profiles[key];
            let i = 0;
            let filteredProfiles = {};
            for (let key in profiles) {
              filteredProfiles[i] = profiles[key];
              i += 1;
            }
            localStorage.setItem("ToDo-App-profiles", JSON.stringify(filteredProfiles));
            if (Object.keys(filteredProfiles).length) {
              localStorage.setItem("ToDo-App-profile", JSON.stringify(filteredProfiles[0]));
            } else {
              localStorage.removeItem("ToDo-App-profiles");
            }
            break;
          }
        }
      }
      return { ...state, authData: null };

    case REVALIDATE:
      if (action?.data?.token) {
        profile.token = action?.data?.token;
        localStorage.setItem("ToDo-App-profile", JSON.stringify(profile));
        for (let key in profiles) {
          if (profile?.result?.email === profiles[key]?.result?.email) {
            profiles[key] = profile;
            localStorage.setItem("ToDo-App-profiles", JSON.stringify(profiles));
          }
        }
      }
      return { ...state, reAuthData: action?.data };

    case UPDATE_USER:
      profile.result = action?.data?.result;
      localStorage.setItem("ToDo-App-profile", JSON.stringify(profile));
      for (let key in profiles) {
        if (profile?.result?.email === profiles[key]?.result?.email) {
          profiles[key].result = profile?.result;
          localStorage.setItem("ToDo-App-profiles", JSON.stringify(profiles));
        }
      }
      return { ...state, authData: { result: action?.data } };

    default:
      return state;
  }
};

export default auth;

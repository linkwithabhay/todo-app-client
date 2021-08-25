import React from "react";
import { useParams } from "react-router";

// Components
import NotFound from "../NotFound";
// Setting Components
import Profile from "./Profile";
import Account from "./Account";
import Appearance from "./Appearance";
import Security from "./Security";
import Billing from "./Billing";
import Email from "./Email";

// Switch Case Constants
const profile = "profile";
const account = "account";
const appearance = "appearance";
const security = "security";
const billing = "billing";
const email = "email";

const ActiveSetting = () => {
  const { activeSetting } = useParams();

  switch (activeSetting) {
    case profile:
      return <Profile />;

    case account:
      return <Account />;

    case appearance:
      return <Appearance />;

    case security:
      return <Security />;

    case billing:
      return <Billing />;

    case email:
      return <Email />;

    default:
      return <NotFound from="Settings" />;
  }
};

export default ActiveSetting;

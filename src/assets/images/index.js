// Image 1
import logoImgPath from "./SVGs/logo.svg";
import LogoSVG from "./LogoImg";

// Image 2
import signInUpImgPath from "./SVGs/signinFA.svg";
import SignInUpSVG from "./SignInUpImg";

// Image 3
import signOutImgPath from "./SVGs/signoutFA.svg";
import SignOutSVG from "./SignOutImg";

// Image 4
import pinnedImgPath from "./SVGs/pinnedFA.svg";
import PinnedSVG from "./PinnedImg";

// ===============================================================
// ------------------------ imports ended ------------------------
// ===============================================================

// Image 1
export const LogoImgPath = logoImgPath;
export const LogoImg = (props) => <LogoSVG {...props} />;

// Image 2
export const SignInUpImgPath = signInUpImgPath;
export const SignInUpImg = (props) => <SignInUpSVG {...props} />;

// Image 3
export const SignOutImgPath = signOutImgPath;
export const SignOutImg = (props) => <SignOutSVG {...props} />;

// Image 4
export const PinnedImgPath = pinnedImgPath;
export const PinnedImg = (props) => <PinnedSVG {...props} />;

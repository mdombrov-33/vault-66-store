export type NavLink = {
  href: string;
  label: string;
};

export type NavbarContextType = {
  isRadioEnabled: boolean;
  setIsRadioEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

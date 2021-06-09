export const positionMenuDropdown = (e, menuDropdownRef) => {
  menuDropdownRef.current.style.display = "block";
  menuDropdownRef.current.style.position = "fixed";
  menuDropdownRef.current.style.left =
    e.target.getBoundingClientRect().x + window.scrollX + "px";
  menuDropdownRef.current.style.top =
    e.target.getBoundingClientRect().y +
    window.scrollY +
    e.target.getBoundingClientRect().height +
    10 +
    "px";
  if (window.innerWidth - e.target.getBoundingClientRect().x <= 400) {
    menuDropdownRef.current.style.left =
      e.target.getBoundingClientRect().x +
      window.scrollX +
      e.target.getBoundingClientRect().width -
      menuDropdownRef.current.getBoundingClientRect().width +
      "px";
  }
};

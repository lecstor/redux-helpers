function fnNameToActionName(name: string) {
  return name.replace(/([A-Z])/g, g => `_${g[0]}`).toUpperCase();
}

export default fnNameToActionName;

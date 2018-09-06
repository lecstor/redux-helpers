function fnNameToActionName(name) {
  return name.replace(/([A-Z])/g, g => `_${g[0]}`).toUpperCase();
}

module.exports = fnNameToActionName;
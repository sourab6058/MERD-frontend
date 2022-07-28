function postForm(URL, city, type) {
  let form = document.createElement("form");
  form.style.visibility = "hidden"; // no user interaction is necessary
  form.method = "POST"; // forms by default use GET query strings
  form.action = URL;

  const cityInput = document.createElement("input");
  cityInput.name = "cities";
  cityInput.value = city;
  form.appendChild(cityInput);

  const categoryInput = document.createElement("input");
  categoryInput.name = "categories";
  categoryInput.value = type;
  form.appendChild(categoryInput);

  document.body.appendChild(form); // forms cannot be submitted outside of body
  form.submit();
}
export default postForm;

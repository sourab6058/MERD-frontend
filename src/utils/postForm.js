function postForm(URL, report) {
  let form = document.createElement("form");
  form.style.visibility = "hidden"; // no user interaction is necessary
  form.method = "POST"; // forms by default use GET query strings
  form.action = URL;

  const categoryInput = document.createElement("input");
  categoryInput.name = "categories";
  categoryInput.value = report;
  form.appendChild(categoryInput);

  document.body.appendChild(form); // forms cannot be submitted outside of body
  form.submit();
}
export default postForm;

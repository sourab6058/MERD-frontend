export default function getUserDetail() {
  const details = document.cookie;
  const cookieList = details.split(";");
  const reqdCookie = cookieList.find((cookie) =>
    cookie.includes("user-details")
  );
  let detailStr;
  if (reqdCookie) {
    detailStr = reqdCookie.split("=")[1];
  }
  try {
    const usrData = detailStr.split("$$");

    const username = usrData[0]
      .split(",")
      [usrData[0].split(",").length - 1].trim();

    let cities = [];
    let categories = [];

    for (const data of usrData) {
      cities.push(data.split(",")[0].trim());
      categories.push(data.split(",")[1].trim());
    }

    cities = [...new Set(cities)];
    categories = [...new Set(categories)];

    const data = {
      username,
      cities,
      categories,
    };

    return data;
  } catch (err) {
    console.log(err);
    return {
      username: false,
      cities: [],
      categories: [],
      err,
    };
  }
}

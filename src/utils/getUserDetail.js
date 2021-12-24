export default function getUserDetail(detailStr) {
  console.log(detailStr);
  try {
    const usrData = detailStr
      .split("$$")
      .slice(0, detailStr.split("$$").length - 1);
    const signedinOn = new Date(
      detailStr.split("$$")[detailStr.split("$$").length - 1]
    );
    // if (signedinOn.setHours(24).getTime() > new Date().getTime()) {
    //   localStorage.removeItem("user-details");
    // }

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

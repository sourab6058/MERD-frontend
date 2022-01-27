export default function getZones(city, zones) {
  const requiredZone = zones.find((zone) => zone.includes(city));
  return requiredZone.replace(">", "/");
}

export const sortZones = (zones) => {
    const sortedZones = { ...zones };

    if (sortedZones) {
        sortedZones[4][1].forEach(city => {
            city.zone.sort((a, b) => parseInt(a.zone) > parseInt(b.zone) ? 1 : -1)
        })
    }
    return sortedZones;
}

export const adressFromCoords = async (coord) => {
  const result = await convertCoordToAdress(coord);

  return result;
};

const convertCoordToAdress = async (coordObj) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${coordObj.lat}&lon=${coordObj.lng}`
  );

  const data = await response.text();
  return pasrseAdressXML(data);
};

function pasrseAdressXML(data) {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(data, 'text/xml');

  const adress = {
    city: xmlDoc.getElementsByTagName('city')[0]?.textContent,
    street: xmlDoc.getElementsByTagName('road')[0]?.textContent,
    houseNumber: xmlDoc.getElementsByTagName('house_number')[0]?.textContent,
  };
  return adress;
}

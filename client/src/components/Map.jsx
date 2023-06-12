import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useSelector } from 'react-redux';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

import { shops } from '../data/config';
import { adressFromCoords } from '../utils/mapFeatures';

import { shopMapMarker, userMapMarker } from '../assets/index';

const center = [50.4483, 30.5253];

const Map = ({ adress, setAdress }) => {
  const { product } = useSelector((state) => state.products);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [searchBox, setSearchBox] = useState(false);

  //GET COORDINATES FROM CLICK ON MAP
  const GetCoordinatesOnMapClick = () => {
    const map = useMapEvents({
      click(event) {
        //console.log(event.latlng);
        setClickedCoordinates(event.latlng);
      },
    });

    return clickedCoordinates === null ? null : (
      <Marker position={clickedCoordinates} icon={UserMapMarker}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  //SET ADRESS FROM CLICK LOCATION
  useEffect(() => {
    async function getAdress() {
      if (clickedCoordinates) {
        const adrsObj = await adressFromCoords(clickedCoordinates);
        if (
          adrsObj.city === undefined ||
          adrsObj.street === undefined ||
          adrsObj.houseNumber === undefined
        ) {
          setAdress('');
        } else {
          setAdress(`${adrsObj.street}, ${adrsObj.houseNumber}, ${adrsObj.city}`);
        }
      } else {
        setAdress('');
      }
    }
    getAdress();
  }, [clickedCoordinates]);

  //SEARCH ON MAP AND SET ADRESS FROM SEARCH FIELD
  const SearchOnMap = () => {
    const map = useMap();

    if (!map) return;

    useEffect(() => {
      if (!searchBox) {
        map.addControl(
          new GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            style: 'bar',
            notFoundMessage: 'Sorry, that address could not be found.',
            updateMap: false,
          })
        );
        map.on('geosearch/showlocation', (event) => {
          //console.log('Location', event.location.label);
          setAdress(event.location.label);
          //console.log('Coords', event.marker._latlng);
        });
        setSearchBox(true);
      } else {
        return;
      }
    }, []);

    return null;
  };

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom={true}
      className='h-96'
      zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {shops.map((shop) =>
        shop.productType === product ? (
          <Marker key={shop.name} position={shop.position} icon={ShopMapMarker}>
            <Popup>{shop.name}</Popup>
          </Marker>
        ) : (
          ''
        )
      )}

      <GetCoordinatesOnMapClick />
      <ZoomControl position='bottomright' zoomInText='+' zoomOutText='-' />
      <SearchOnMap />
    </MapContainer>
  );
};

export default Map;

// custom markers
export const ShopMapMarker = new L.Icon({
  iconUrl: shopMapMarker,
  iconSize: [40, 50],
});
export const UserMapMarker = new L.Icon({
  iconUrl: userMapMarker,
  iconSize: [40, 50],
});

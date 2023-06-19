import getPlaces from 'services/getPlaces';

const handleSearchPlaces = async (e, searchValue, setCurrentPlaces) => {
  e.preventDefault();
  if (searchValue) {
    try {
      const places = await getPlaces(searchValue, 0.028);
      if (places.lenght !== 0) {
        setCurrentPlaces(places);
      }
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  } else {
    alert('Empty field');
  }
};

export default handleSearchPlaces;
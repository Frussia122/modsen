/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { addSuggetstView, suggestEvent } from 'Utils/Map/addSuggestView';
import addMultiRoute from 'Utils/Map/addMultiRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routeTypes from './routeTypes';
import {
  Wrapper,
  TypeButton,
  Input,
  Button,
  TypesWrapper,
  InputWrapper,
} from './styled';

function RouteControl({ mapRef }) {
  const [routeFrom, setRouteFrom] = useState('');
  const [routeTo, setRouteTo] = useState('');
  const [routeFromSuggest, setRouteFromSuggest] = useState('');
  const [routeToSuggest, setRouteToSuggest] = useState('');
  const [multiRoute, setMultiRoute] = useState();
  const [activeType, setActiveType] = useState(routeTypes[0].type);

  const { ymaps } = window;

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        setRouteFromSuggest(addSuggetstView('routeFrom', 'yandex#map'));
        setRouteToSuggest(addSuggetstView('routeTo', 'yandex#map'));
      });
    }
  }, []);

  const handleRouteChange = (e, type) => {
    if (type === 'from') {
      setRouteFrom(e.target.value);
      suggestEvent(routeFromSuggest, setRouteFrom);
    } else if (type === 'to') {
      setRouteTo(e.target.value);
      suggestEvent(routeToSuggest, setRouteTo);
    }
  };

  const handleRouteClick = () => {
    const newMultiRoute = addMultiRoute(mapRef, routeFrom, routeTo);
    setRouteFrom('');
    setRouteTo('');
    setMultiRoute(newMultiRoute);
  };
  const handleType = (type) => {
    if (multiRoute) {
      setActiveType(type);
      multiRoute.model.setParams({
        routingMode: type,
      });
    }
  };

  return (
    <Wrapper>
      <TypesWrapper>
        {routeTypes.map((type) => (
          <TypeButton
            key={type.id}
            onClick={(e) => handleType(type.type, e)}
            className={type.type === activeType ? 'activeType' : ''}
          >
            <FontAwesomeIcon
              icon={type.icon}
              className={type.type === activeType ? 'active' : ''}
            />
          </TypeButton>
        ))}
      </TypesWrapper>
      <InputWrapper>
        <Input
          value={routeFrom}
          onChange={(e) => handleRouteChange(e, 'from')}
          id="routeFrom"
          placeholder="От куда?"
        />
        <Input
          value={routeTo}
          onChange={(e) => handleRouteChange(e, 'to')}
          id="routeTo"
          placeholder="Куда?"
        />
      </InputWrapper>
      <Button onClick={handleRouteClick}>Проложить маршрут</Button>
    </Wrapper>
  );
}

export default RouteControl;

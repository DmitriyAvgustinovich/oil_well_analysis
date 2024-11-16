import React, { useEffect, useRef } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";

export const OilWellsGraph = () => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!window.ymaps) return;

      const map = new window.ymaps.Map(
        mapRef.current,
        {
          center: [61, 105], // Центр карты на Россию
          zoom: 3, // Начальный масштаб
          controls: ["zoomControl"],
          type: "yandex#map", // Физическая карта без спутниковых снимков
        },
        {
          minZoom: 1,
          maxZoom: 9,
          restrictMapArea: [
            [85, 19], // Верхний левый угол карты
            [40, 179], // Нижний правый угол карты
          ],
        }
      );

      const oilFields = [
        {
          id: 1,
          coords: [60, 80], // Координаты центра месторождения
          name: "Месторождение 1",
          wells: [
            { id: 101, coords: [60.1, 80.1], name: "Скважина 101" },
            { id: 102, coords: [60.2, 80.2], name: "Скважина 102" },
          ],
          boundary: [
            [60.5, 79.5],
            [59.5, 79.5],
            [59.5, 80.5],
            [60.5, 80.5],
            [60.5, 79.5],
          ], // Границы месторождения
        },
        {
          id: 2,
          coords: [65, 100],
          name: "Месторождение 2",
          wells: [
            { id: 201, coords: [65.1, 100.1], name: "Скважина 201" },
            { id: 202, coords: [65.2, 100.2], name: "Скважина 202" },
          ],
          boundary: [
            [65.5, 99.5],
            [64.5, 99.5],
            [64.5, 100.5],
            [65.5, 100.5],
            [65.5, 99.5],
          ],
        },
      ];

      const fieldPlacemarks = new window.ymaps.GeoObjectCollection();
      const wellPlacemarks = new window.ymaps.GeoObjectCollection();
      const fieldBoundaries = new window.ymaps.GeoObjectCollection();

      oilFields.forEach((field) => {
        const fieldPlacemark = new window.ymaps.Placemark(
          field.coords,
          {
            balloonContent: `<strong>${field.name}</strong>`,
            hintContent: `Месторождение: ${field.name}`,
          },
          {
            preset: "islands#circleIcon",
            iconColor: "red",
          }
        );
        fieldPlacemarks.add(fieldPlacemark);

        const fieldBoundary = new window.ymaps.Polyline(field.boundary, {}, {
          strokeColor: "#FF0000",
          strokeWidth: 2,
          visible: false, // Границы скрыты изначально
        });
        fieldBoundaries.add(fieldBoundary);

        field.wells.forEach((well) => {
          const wellPlacemark = new window.ymaps.Placemark(
            well.coords,
            {
              balloonContent: `<strong>${well.name}</strong>`,
              hintContent: `Скважина: ${well.name}`,
            },
            {
              preset: "islands#dotIcon",
              iconColor: "orange",
            }
          );
          wellPlacemarks.add(wellPlacemark);
        });
      });

      map.geoObjects.add(fieldPlacemarks);

      map.events.add("boundschange", (e: any) => {
        const zoom = e.get("newZoom");

        if (zoom >= 6) {
          map.geoObjects.remove(fieldPlacemarks); // Убираем месторождения
          map.geoObjects.add(wellPlacemarks); // Добавляем скважины
          fieldBoundaries.each((boundary: any) => {
            boundary.options.set("visible", true); // Показываем границы
          });
        } else {
          map.geoObjects.add(fieldPlacemarks); // Добавляем месторождения
          map.geoObjects.remove(wellPlacemarks); // Убираем скважины
          fieldBoundaries.each((boundary: any) => {
            boundary.options.set("visible", false); // Скрываем границы
          });
        }
      });

      map.geoObjects.add(fieldBoundaries);
    };

    window.ymaps.ready(initMap);
  }, []);

  return (
    <YMaps>
      <div
        ref={mapRef}
        style={{
          width: "80vw",
          height: "80vh",
        }}
      />
    </YMaps>
  );
};

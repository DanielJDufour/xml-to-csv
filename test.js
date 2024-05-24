import { readFileSync } from "fs";
import test from "flug";

import { convert } from "./index.js";

test("example", ({ eq }) => {
  const xml = readFileSync("./data/iso.xml", "utf-8");
  const config = {
    start: ["gmd:MD_DigitalTransferOptions", "gmd:CI_OnlineResource"],
    columns: [
      { name: "name", path: ["gmd:name", "gco:CharacterString"] },
      { name: "url", path: ["gmd:linkage", "gmd:URL"] }
    ],
    offset: 1,
    limit: 5
  };

  const csv = convert(xml, config);
  eq(
    csv,
    `name,url\r\natlanteil.jpg,http://geomap.arpa.veneto.it/geoserver/wms?layers=geonode%3Aatlanteil&amp;width=616&amp;bbox=10.2822923743907%2C44.418521542726054%2C13.3486486092171%2C47.15260827566466&amp;service=WMS&amp;format=image%2Fjpeg&amp;srs=EPSG%3A4326&amp;request=GetMap&amp;height=550\r\natlanteil.pdf,http://geomap.arpa.veneto.it/geoserver/wms?layers=geonode%3Aatlanteil&amp;width=616&amp;bbox=10.2822923743907%2C44.418521542726054%2C13.3486486092171%2C47.15260827566466&amp;service=WMS&amp;format=application%2Fpdf&amp;srs=EPSG%3A4326&amp;request=GetMap&amp;height=550\r\natlanteil.png,http://geomap.arpa.veneto.it/geoserver/wms?layers=geonode%3Aatlanteil&amp;width=616&amp;bbox=10.2822923743907%2C44.418521542726054%2C13.3486486092171%2C47.15260827566466&amp;service=WMS&amp;format=image%2Fpng&amp;srs=EPSG%3A4326&amp;request=GetMap&amp;height=550\r\natlanteil.kml,http://geomap.arpa.veneto.it/geoserver/wms/kml?layers=geonode%3Aatlanteil&amp;mode=download\r\natlanteil.kml,http://geomap.arpa.veneto.it/geoserver/wms/kml?layers=geonode%3Aatlanteil&amp;mode=refresh`
  );
});

test("more advanced", ({ eq }) => {
  const xml = readFileSync("./data/iso.xml", "utf-8");
  const config = {
    columns: [
      { name: "name", path: ["gmd:name", "gco:CharacterString"] },
      { name: "protocol", path: ["gmd:protocol", "gco:CharacterString"] },
      { name: "url", path: ["gmd:linkage", "gmd:URL"] }
    ],
    limit: 5,
    offset: 2,
    start: ["gmd:MD_DigitalTransferOptions", "gmd:CI_OnlineResource"],
    debug: false
  };
  const csv = convert(xml, config);
  eq(
    csv,
    "name,protocol,url\r\natlanteil.pdf,WWW:DOWNLOAD-1.0-http--download,http://geomap.arpa.veneto.it/geoserver/wms?layers=geonode%3Aatlanteil&amp;width=616&amp;bbox=10.2822923743907%2C44.418521542726054%2C13.3486486092171%2C47.15260827566466&amp;service=WMS&amp;format=application%2Fpdf&amp;srs=EPSG%3A4326&amp;request=GetMap&amp;height=550\r\natlanteil.png,WWW:DOWNLOAD-1.0-http--download,http://geomap.arpa.veneto.it/geoserver/wms?layers=geonode%3Aatlanteil&amp;width=616&amp;bbox=10.2822923743907%2C44.418521542726054%2C13.3486486092171%2C47.15260827566466&amp;service=WMS&amp;format=image%2Fpng&amp;srs=EPSG%3A4326&amp;request=GetMap&amp;height=550\r\natlanteil.kml,WWW:DOWNLOAD-1.0-http--download,http://geomap.arpa.veneto.it/geoserver/wms/kml?layers=geonode%3Aatlanteil&amp;mode=download\r\natlanteil.kml,WWW:DOWNLOAD-1.0-http--download,http://geomap.arpa.veneto.it/geoserver/wms/kml?layers=geonode%3Aatlanteil&amp;mode=refresh\r\natlanteil.tiles,WWW:DOWNLOAD-1.0-http--download,http://geomap.arpa.veneto.it/geoserver/gwc/service/gmaps?layers=geonode:atlanteil&amp;zoom={z}&amp;x={x}&amp;y={y}&amp;format=image/png8"
  );
});

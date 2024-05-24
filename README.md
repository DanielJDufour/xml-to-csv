# @danieljdufour/xml-to-csv
Declaratively Convert XML to CSV

### usage
```js
import { convert } from "@danieljdufour/xml-to-csv";

const xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>...`;
const config = {
  start: ["gmd:MD_DigitalTransferOptions", "gmd:CI_OnlineResource"],
  columns: [
    { name: "name", path: ["gmd:name", "gco:CharacterString"] },
    { name: "url", path: ["gmd:linkage", "gmd:URL"] }
  ]
};

convert(xml, config);
`atlanteil.jpg,http://geomap.arpa.veneto.it/geoserver/wms?layers=geonode%3Aatlanteil&amp;width=616&amp;bbox=10.2822923743907%2C44.418521542726054%2C13.3486486092171%2C47.15260827566466&amp;service=WMS&amp;format=image%2Fjpeg&amp;srs=EPSG%3A4326&amp;request=GetMap&amp;height=550
atlanteil.pdf,http://geomap.arpa.veneto.it/geoserver/wms?layers=geonode%3Aatlanteil&amp;width=616&amp;bbox=10.2822923743907%2C44.418521542726054%2C13.3486486092171%2C47.15260827566466&amp;service=WMS&amp;format=application%2Fpdf&amp;srs=EPSG%3A4326&amp;request=GetMap&amp;height=550
atlanteil.png,http://geomap.arpa.veneto.it/geoserver/wms?layers=geonode%3Aatlanteil&amp;width=616&amp;bbox=10.2822923743907%2C44.418521542726054%2C13.3486486092171%2C47.15260827566466&amp;service=WMS&amp;format=image%2Fpng&amp;srs=EPSG%3A4326&amp;request=GetMap&amp;height=550
atlanteil.kml,http://geomap.arpa.veneto.it/geoserver/wms/kml?layers=geonode%3Aatlanteil&amp;mode=download
atlanteil.kml,http://geomap.arpa.veneto.it/geoserver/wms/kml?layers=geonode%3Aatlanteil&amp;mode=refresh`
```

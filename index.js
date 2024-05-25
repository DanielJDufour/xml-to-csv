import * as Papa from "papaparse";
import findTagsByPath from "xml-utils/find-tags-by-path.js";
import getAttribute from "xml-utils/get-attribute.js";

export function convert(
  xml,
  {
    columns,
    clean = true,
    debug,
    delimiter,
    escapeChar,
    escapeFormulae,
    limit,
    header,
    newline,
    offset = 0,
    skipEmptyLines,
    sort: _sort = true,
    start,
    subdelimiter = "; ",
    quotes,
    quoteChar,
    unique = true
  }
) {
  if (!xml) throw new Error("[@danieljdufour/xml-to-csv] missing xml");
  if (typeof xml !== "string") throw new Error("[@danieljdufour/xml-to-csv] invalid xml");

  if (!Array.isArray(start)) throw new Error("[@danieljdufour/xml-to-csv] missing start");
  const tags = findTagsByPath(xml, start);
  if (debug) console.log("[@danieljdufour/xml-to-csv] tags:", tags.length);

  if (!Array.isArray(columns)) throw new Error("[@danieljdufour/xml-to-csv] missing columns");
  if (debug) console.log("[@danieljdufour/xml-to-csv] columns:", columns);

  const rows = [];

  const imax = offset + (typeof limit === "number" ? Math.min(limit, tags.length) : tags.length);
  for (let i = offset; i < imax; i++) {
    const tag = tags[i];
    const row = {};
    for (let c = 0; c < columns.length; c++) {
      const col = columns[c];
      const foundTags = findTagsByPath(tag.outer, JSON.parse(JSON.stringify(col.path)));
      let values = foundTags.map(it => {
        if (col.attribute) return getAttribute(it.outer, col.attribute);
        return it.inner;
      });

      if (typeof col.clean === "boolean" ? col.clean : clean) {
        values = values.filter(it => it !== null && it !== undefined && it !== "");
      }

      if (typeof col.sort === "boolean" ? col.sort : _sort) {
        values.sort((a, b) => (a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0));
      }

      if (typeof col.unique === "boolean" ? col.unique : unique) {
        values = values.filter(([_, str], i) => values.slice(0, i).filter(([_, substr]) => str === substr).length === 0);
      }

      row[col.name] = values.join(subdelimiter);
    }
    rows.push(row);
  }

  const config = {
    columns: columns.map(function (col) {
      return col.name;
    }),
    delimiter,
    escapeChar,
    escapeFormulae,
    header,
    newline,
    skipEmptyLines,
    quotes,
    quoteChar
  };
  if (debug) console.log("[@danieljdufour/xml-to-csv] config:", config);

  const result = (Papa.default || Papa).unparse(rows, config);

  return result;
}

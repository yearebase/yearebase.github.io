#!/usr/bin/env node

/* Minifies all the HTML, CSS, and JavaScript files in `docs/`, reporting total and per-file reductions in size. */

import { minify } from "minify";
import * as fs from "fs/promises";
import glob from "glob";
import bytes from "bytes";
import { table, getBorderCharacters } from "table";

const logErr = (fp, action, err) => {
  const message = "=> Failed to " + action + " file " + fp;
  if (err) console.error(message, err);
  else console.error(message);
};

const reduction = (oldSize, newSize) => {
  let diff = newSize - oldSize;
  let percent = Math.round(oldSize == 0 ? 0 : Math.abs(diff / oldSize) * 100);
  return [
    (diff < 0 ? '-' : '+') + bytes(Math.abs(diff)),
    percent + '%',
    bytes(oldSize),
    bytes(newSize)
  ];
};

!async function() {
  const stat = await fs.stat("docs/css/util")
    .catch((err) => {});

  if (stat)
    await fs.rm("docs/css/util", { recursive: true })
      .catch((err) => console.error("Failed to delete directory docs/css/util:", err));

  glob("docs/**/*.*", null, async (err, files) => {
    console.error("Files:", files, '\n');
    if (!files) process.exit(1);

    let successful = true;
    let totalOldSize = 0;
    let totalNewSize = 0;

    const lines = [
      ['File path', 'Size diff', 'Diff %', 'Old size', 'New size'],
    ];

    for (const fp of files) {
      if (!fp.match(/\.(html|css|js)$/)) continue;

      const stats = await fs.stat(fp).catch(err => logErr(fp, "get size of", err));
      if (!stats)
        break;

      let oldSize = stats.size;
      totalOldSize += oldSize;

      const text = await minify(fp).catch((err) => logErr(fp, "minify", err));

      if (text !== undefined) {
        let failed = false;

        await fs.writeFile(fp, text).catch(err => {
          failed = true;
          logErr(fp, "write to", err)
        });

        successful &&= !failed;

        if (!failed) {
          const stats = await fs.stat(fp).catch(err => logErr(fp, "get size of", err));
          if (stats) {
            let newSize = stats.size;
            totalNewSize += newSize;
            lines.push([fp, ...reduction(oldSize, newSize)]);
          }
        }
      }
    }

    lines.push(['Total', ...reduction(totalOldSize, totalNewSize)]);
    console.error(
      table(lines, {
        border: getBorderCharacters('void'),
        drawHorizontalLine: (rowIndex, rowCount) => rowIndex == 1 || rowIndex == rowCount - 1,
        columnDefault: { alignment: 'right' },
        columns: [
          { alignment: 'left' },
        ]
      })
    );

    if (!successful)
      process.exit(1);
  });
}();

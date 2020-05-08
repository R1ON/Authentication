const fs = require('fs');

class MinimizeStats {
  constructor(statsFilename) {
    this.statsFilename = statsFilename;
  }

  apply(compiler) {
    compiler.hooks.done.tap('MinimizeStats', () => {
      const statsFile = this.statsFilename;
      const stats = JSON.parse(fs.readFileSync(statsFile));

      const {
        assetsByChunkName,
        namedChunkGroups,
        publicPath,
      } = stats;

      const newStatsFile = {
        publicPath,
        assetsByChunkName,
        namedChunkGroups,
        chunks: stats.chunks.map(({ id, files }) => ({ id, files })),
        modules: stats.modules.map(({ id, name, chunks }) => ({ id, name, chunks })),
      };
      fs.writeFileSync(statsFile, JSON.stringify(newStatsFile));
    });
  }
}

module.exports = MinimizeStats;

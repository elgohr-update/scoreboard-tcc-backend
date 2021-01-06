const createQuery = require('../providers/database');

const tableName = 'Match';

class MatchRepository {
  async create(match) {
    return createQuery(tableName)
      .insert(match)
      .returning('id');
  }

  async findIngameVirtualMatchesByAcademyId(academyId) {
    const pin = '"Match"."pin" is not null as pin';

    return createQuery(tableName)
      .select('id', 'listed', 'brokerTopic', 'player1Name', 'player2Name', createQuery.knexInstance.raw(pin))
      .where('academyId', '=', academyId)
      .whereNull('scoreboardId')
      .andWhere('status', '=', 'INGAME');
  }

  async findListedInGameMatchesByAcademyId(academyId) {
    const pin = '"Match"."pin" is not null as pin';

    const data = await createQuery(tableName)
      .select('Match.id', 'Match.brokerTopic', createQuery.knexInstance.raw(pin),
        'Scoreboard.id as scoreboardId', 'Scoreboard.description as scoreboardDescription', 'Match.player1Name', 'Match.player2Name')
      .leftJoin('Scoreboard', 'Match.scoreboardId', 'Scoreboard.id')
      .where('Match.academyId', '=', academyId)
      .andWhere('status', '=', 'INGAME')
      .andWhere('Match.listed', '=', true);

    return data.map((result) => ({
      id: result.id,
      brokerTopic: result.pin ? null : result.brokerTopic,
      pin: result.pin,
      player1Name: result.player1Name,
      player2Name: result.player2Name,
      scoreboard: result.scoreboardId ? {
        id: result.scoreboardId,
        description: result.scoreboardDescription,
      } : null,
    }));
  }

  async findByRefreshToken(refreshToken) {
    return createQuery(tableName)
      .where('refreshToken', '=', refreshToken)
      .first();
  }

  async updateTokens(id, { publishToken, refreshToken }) {
    return createQuery(tableName)
      .update({ publishToken, refreshToken })
      .where('id', '=', id);
  }

  async findByAcademyIdAndMatchId(academyId, matchId) {
    return createQuery(tableName)
      .where('academyId', '=', academyId)
      .andWhere('matchId', '=', matchId)
      .first();
  }

  async findByMatchIdAndIngame(matchId) {
    const hasPin = '"Match"."pin" is not null as pin';

    const data = await createQuery(tableName)
      .select('id', 'player1Name', 'player2Name', 'brokerTopic')
      .where('matchId', '=', matchId)
      .andWhere('status', '=', 'INGAME')
      .first();

    if (hasPin) {
      delete data.brokerTopic;
    }

    return data;
  }
}

module.exports = MatchRepository;

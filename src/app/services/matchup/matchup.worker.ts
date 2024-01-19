/// <reference lib="webworker" />

import { matchPairs } from '../../helpers/matchPairs';

addEventListener('message', ({ data }) => {
  const matches = matchPairs(data.studentData, data.matchupData);
  postMessage(matches);
});

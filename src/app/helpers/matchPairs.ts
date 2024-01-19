import { Student } from '../services/student/types';
import { Matchup, MatchupDefinition } from '../services/matchup/types';
import { PAIRING_TIMEOUT_SECONDS } from '../globals';

export const matchPairs = (
  students: Student[],
  existingMatches: MatchupDefinition[],
) => {
  const timeout = new Date();
  timeout.setSeconds(timeout.getSeconds() + PAIRING_TIMEOUT_SECONDS);

  const existingPairs = existingMatches.reduce((prev, curr) => {
    return [...prev, ...curr.matchups];
  }, [] as Matchup[]);
  let newPairs: Matchup[] = [];
  let pairsGenerated = false;

  while (new Date() < timeout) {
    let valid = true;
    newPairs = [];

    const shuffledStudents: Student[] = shuffleArray(students);
    const length =
      shuffledStudents.length % 2 == 0
        ? shuffledStudents.length
        : shuffledStudents.length - 1;
    for (let i = 0; i < length; i += 2) {
      const [s1, s2] = [shuffledStudents[i], shuffledStudents[i + 1]];

      const exists = existingPairs.some(
        (x) =>
          (x.student1Id === s1.id && x.student2Id === s2.id) ||
          (x.student1Id === s2.id && x.student2Id === s1.id),
      );
      if (exists) {
        valid = false;
        break;
      }

      const matchup: Matchup = {
        student1: shuffledStudents[i].fullName,
        student2: shuffledStudents[i + 1].fullName,
        student1Id: shuffledStudents[i].id,
        student2Id: shuffledStudents[i + 1].id,
      };
      newPairs.push(matchup);
    }

    if (valid) {
      pairsGenerated = true;
      break;
    }
  }

  return pairsGenerated ? newPairs : [];
};

const shuffleArray = (initialArray: any[]) => {
  const array = [...initialArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

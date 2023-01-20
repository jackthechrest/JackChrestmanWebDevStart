/*
 *   index.ts
 *   Project: First Exercise
 *
 *   Author: Jack Chrestman
 *   Created on: Jan 19, 2023
 */

function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
  const mergedArr: Array<number> = [];
  let firstIndex = 0;
  let secondIndex = 0;
  let smallerArray = 1;
  let smallLength = arr1.length;

  if (arr2.length < arr1.length) {
    smallerArray = 2;
    smallLength = arr2.length;
  }

  for (let i = 0; i < arr1.length + arr2.length; i += 1) {
    if (i < 2 * smallLength) {
      if (i % 2 === 0) {
        mergedArr[i] = arr1[firstIndex];
        firstIndex += 1;
      } else {
        mergedArr[i] = arr2[secondIndex];
        secondIndex += 1;
      }
    } else if (smallerArray === 2) {
      mergedArr[i] = arr1[firstIndex];
      firstIndex += 1;
    } else {
      mergedArr[i] = arr2[secondIndex];
      secondIndex += 1;
    }
  }
  return mergedArr;
}

function checkWord(guessWord: string, actualWord: string): string {
  let wordResult = '';
  for (let i = 0; i < actualWord.length; i += 1) {
    if (guessWord[i] === actualWord[i]) wordResult += 'c';
    else if (actualWord.includes(guessWord[i])) wordResult += 'p';
    else wordResult += 'a';
  }
  return wordResult;
}

type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
};

/*
const array1: Array<number> = [4, 5, 23, 18, 9, -5, 31];
const array2: Array<number> = [18, 74, 88, 3, 7, 44, 108];

const mergedArray: Array<number> = merge(array1, array2);
console.log(mergedArray);
*/
const array1: Array<number> = [4, 5, 23, 18, 9, -5, 31];
const array2: Array<number> = [18, 74, 88, 3];

// const mergedArray: Array<number> = merge(array1, array2);
const mergedArray: Array<number> = merge(array2, array1);
console.log(mergedArray);
console.log('\n');

const attempts = ['rains', 'shout', 'scope', 'spoke'];

for (const word of attempts) {
  const result = checkWord(word, 'spoke');
  console.log(result);
}
console.log('\n');

const candidateArray: Array<Candidate> = [
  { name: 'Edward Underwood', votes: [192, 147, 186, 114, 267], funding: 58182890 },
  { name: 'Rose Olson', votes: [48, 90, 12, 21, 13], funding: 78889263 },
  { name: 'Leonard Willis', votes: [206, 312, 121, 408, 382], funding: 36070689 },
  { name: 'Nathaniel Taylor', votes: [37, 21, 38, 39, 29], funding: 6317921937 },
];

const candidateTotalVotes: Array<number> = [];
let allVotes = 0;

// calculate how many votes each candidate got and the total amount of votes
for (const candidate of candidateArray) {
  let sum = 0;
  for (let i = 0; i < candidate.votes.length; i += 1) sum += candidate.votes[i];
  candidateTotalVotes.push(sum);
  allVotes += sum;
}

// display the number and percent of votes each candidate got
// toFixed() usage found from https://www.w3schools.com/jsref/jsref_tofixed.asp
for (let i = 0; i < candidateArray.length; i += 1) {
  console.log(
    `${candidateArray[i].name} received ${candidateTotalVotes[i]} votes across all precincts (${(
      (candidateTotalVotes[i] / allVotes) *
      100
    ).toFixed(2)}% of all votes).`
  );
}
console.log();

// calculate and display the percentage of votes the candidates got for each precinct
const totalPrecinctVotes: Array<number> = [0, 0, 0, 0, 0];

for (let i = 0; i < candidateArray[0].votes.length; i += 1) {
  for (const candidate of candidateArray) {
    totalPrecinctVotes[i] += candidate.votes[i];
  }
}

for (const candidate of candidateArray) {
  console.log(`${candidate.name}:`);
  for (let i = 0; i < candidate.votes.length; i += 1) {
    console.log(
      `Precinct ${i + 1}: ${((candidate.votes[i] / totalPrecinctVotes[i]) * 100).toFixed(2)}%`
    );
  }
  console.log();
}

// compute and display amount each candidate spent per vote
for (let i = 0; i < candidateArray.length; i += 1) {
  console.log(
    `${candidateArray[i].name} spent $${(
      candidateArray[i].funding / candidateTotalVotes[i]
    ).toFixed(2)} per vote.`
  );
}
console.log();

let winnerFound = false;

// check if any candidate won by getting over half the votes and display if so
for (let i = 0; i < candidateArray.length; i += 1) {
  if (candidateTotalVotes[i] / allVotes > 0.5) {
    winnerFound = true;
    console.log(`${candidateArray[i].name} is the winner!\n`);
  }
}

// if no winner found, find two candidates with highest number of votes for run-off and display
if (!winnerFound) {
  let firstHighest = 0;
  let secondHighest = 0;

  for (let i = 0; i < candidateArray.length; i += 1) {
    if (candidateTotalVotes[i] > candidateTotalVotes[firstHighest]) {
      secondHighest = firstHighest;
      firstHighest = i;
    } else if (candidateTotalVotes[i] > candidateTotalVotes[secondHighest]) secondHighest = i;
  }

  console.log(
    `No candidates received a majority of the votes. `,
    `A run-off will be held between the two candidates with the highest votes:`,
    `${candidateArray[firstHighest].name} and ${candidateArray[secondHighest].name}\n.`
  );
}

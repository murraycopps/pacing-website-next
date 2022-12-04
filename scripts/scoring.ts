function getOtherPlaces(list: number[]) {
    let i = 1;
    let k = 0;
    let otherScores = [];
    while (i < list[list.length - 1] || otherScores.length < 7) {
        if (list[k] == i) {
            k++;
        }
        else {
            otherScores.push(i);
        }

        i++;
    }

    return otherScores;
}

export function getXCScores(list: any) {
    if(list.length === 0) return

    if(list.includes(0)) {
        const otherPlaces = getOtherPlaces(list)
        const myPlaces = getOtherPlaces(otherPlaces)
        console.log(myPlaces)
        const myScore = myPlaces.reduce((a: number, b: number, i: number) => i >= 5? a : a + b, 0)
        const otherScore = otherPlaces.reduce((a: number, b: number, i: number) => i >= 5? a : a + b, 0)
        const out = `Your Score is: ${myScore} \nOther Score is: ${otherScore}`
        return out
    }

    const myScore = list.reduce((a: number, b: number, i: number) => i >= 5? a : a + b, 0);
    const otherPlaces = getOtherPlaces(list)
    const otherScore = otherPlaces.reduce((a: number, b: number, i: number) => i >= 5? a : a + b, 0);
    const out = `Your Score is: ${myScore}\nOther Score is: ${otherScore}`
    return out;
}

export function getTrackScores(list: number[], numEvents: number) {
    if(list.length === 0) return
    let myScore = 5 * list[0] + 3 * list[1] + 1 * list[2];
    let maxScore = 9 * numEvents;
    let otherScore = maxScore - myScore;
    let out = `Your Score is: ${myScore}\nOther Score is: ${otherScore}`
    return out;
}